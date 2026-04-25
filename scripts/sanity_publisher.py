#!/usr/bin/env python3
"""
Sanity CMS Publisher for divit-mind-space

This module provides a Python interface for publishing blog posts
directly to the Sanity CMS used by divit-mind-space.

Usage:
    from sanity_publisher import SanityPublisher

    publisher = SanityPublisher()

    result = publisher.publish_post(
        title="Your Post Title",
        excerpt="A brief excerpt...",
        body="Your markdown content...",
        category="clinical",
        author_id="author-ref-id"
    )
"""

import os
import json
import re
import uuid
import requests
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from pathlib import Path

# Try to load from .env file if python-dotenv is available
try:
    from dotenv import load_dotenv
    # Look for .env.local in divit-mind-space root
    env_path = Path(__file__).parent.parent / ".env.local"
    if env_path.exists():
        try:
            load_dotenv(env_path)
        except ValueError:
            # Handle corrupted .env files with null characters
            pass
except ImportError:
    pass


class SanityPublisher:
    """
    A client for publishing blog posts to Sanity CMS.

    Attributes:
        project_id: Sanity project ID
        dataset: Sanity dataset name
        api_version: Sanity API version
        write_token: Sanity write token for authentication
    """

    # Sanity configuration for divit-mind-space
    PROJECT_ID = "3c4uripz"
    DATASET = "production"
    API_VERSION = "2021-06-07"

    # Valid categories matching the Sanity schema
    VALID_CATEGORIES = [
        "parenting",
        "clinical",
        "education",
        "adult",
        "stories",
        "school"
    ]

    def __init__(self, write_token: Optional[str] = None):
        """
        Initialize the Sanity publisher.

        Args:
            write_token: Sanity write token. If not provided, will try to read
                        from SANITY_WRITE_TOKEN environment variable.
        """
        self.project_id = self.PROJECT_ID
        self.dataset = self.DATASET
        self.api_version = self.API_VERSION

        self.write_token = write_token or os.getenv("SANITY_WRITE_TOKEN")

        if not self.write_token:
            raise ValueError(
                "Sanity write token is required. Set SANITY_WRITE_TOKEN "
                "environment variable or pass write_token parameter."
            )

        self.base_url = f"https://{self.project_id}.api.sanity.io/v{self.api_version}"
        self.headers = {
            "Authorization": f"Bearer {self.write_token}",
            "Content-Type": "application/json"
        }

    def _generate_key(self) -> str:
        """Generate a unique key for Sanity blocks."""
        return str(uuid.uuid4())[:12]

    def _slugify(self, text: str) -> str:
        """
        Convert text to a URL-friendly slug.

        Args:
            text: The text to slugify

        Returns:
            A lowercase, hyphenated slug
        """
        # Convert to lowercase
        slug = text.lower()
        # Replace spaces and underscores with hyphens
        slug = re.sub(r'[\s_]+', '-', slug)
        # Remove non-alphanumeric characters (except hyphens)
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        # Remove multiple consecutive hyphens
        slug = re.sub(r'-+', '-', slug)
        # Remove leading/trailing hyphens
        slug = slug.strip('-')
        return slug

    def _estimate_read_time(self, content: str) -> int:
        """
        Estimate reading time in minutes.

        Args:
            content: The text content

        Returns:
            Estimated minutes to read (minimum 1)
        """
        words = len(content.split())
        # Average reading speed: 200-250 words per minute
        minutes = max(1, round(words / 225))
        return minutes

    def _markdown_to_portable_text(self, markdown: str) -> List[Dict[str, Any]]:
        """
        Convert markdown text to Sanity PortableText format.

        This is a simplified converter. For complex markdown,
        consider using a dedicated library.

        Args:
            markdown: Markdown formatted text

        Returns:
            List of PortableText blocks
        """
        blocks = []

        # Split by double newlines for paragraphs
        paragraphs = re.split(r'\n\n+', markdown.strip())

        for para in paragraphs:
            para = para.strip()
            if not para:
                continue

            # Check for headers
            header_match = re.match(r'^(#{1,6})\s+(.+)$', para)
            if header_match:
                level = len(header_match.group(1))
                text = header_match.group(2)
                style = f"h{level}" if level <= 4 else "h4"
                blocks.append({
                    "_type": "block",
                    "_key": self._generate_key(),
                    "style": style,
                    "markDefs": [],
                    "children": [
                        {
                            "_type": "span",
                            "_key": self._generate_key(),
                            "text": text,
                            "marks": []
                        }
                    ]
                })
                continue

            # Check for blockquote
            if para.startswith('>'):
                text = re.sub(r'^>\s*', '', para, flags=re.MULTILINE)
                blocks.append({
                    "_type": "block",
                    "_key": self._generate_key(),
                    "style": "blockquote",
                    "markDefs": [],
                    "children": [
                        {
                            "_type": "span",
                            "_key": self._generate_key(),
                            "text": text.strip(),
                            "marks": []
                        }
                    ]
                })
                continue

            # Check for bullet list
            if re.match(r'^[-*]\s', para):
                items = re.split(r'\n[-*]\s', para)
                items[0] = re.sub(r'^[-*]\s', '', items[0])
                for item in items:
                    blocks.append({
                        "_type": "block",
                        "_key": self._generate_key(),
                        "style": "normal",
                        "listItem": "bullet",
                        "level": 1,
                        "markDefs": [],
                        "children": [
                            {
                                "_type": "span",
                                "_key": self._generate_key(),
                                "text": item.strip(),
                                "marks": []
                            }
                        ]
                    })
                continue

            # Check for numbered list
            if re.match(r'^\d+\.\s', para):
                items = re.split(r'\n\d+\.\s', para)
                items[0] = re.sub(r'^\d+\.\s', '', items[0])
                for item in items:
                    blocks.append({
                        "_type": "block",
                        "_key": self._generate_key(),
                        "style": "normal",
                        "listItem": "number",
                        "level": 1,
                        "markDefs": [],
                        "children": [
                            {
                                "_type": "span",
                                "_key": self._generate_key(),
                                "text": item.strip(),
                                "marks": []
                            }
                        ]
                    })
                continue

            # Regular paragraph - process inline formatting
            children = self._process_inline_formatting(para)
            blocks.append({
                "_type": "block",
                "_key": self._generate_key(),
                "style": "normal",
                "markDefs": [],
                "children": children
            })

        return blocks

    def _process_inline_formatting(self, text: str) -> List[Dict[str, Any]]:
        """
        Process inline markdown formatting (bold, italic).

        Args:
            text: Text with potential inline formatting

        Returns:
            List of span objects with marks
        """
        children = []

        # Simple approach: split by bold/italic markers
        # This is a basic implementation - production would need more robust parsing

        # For now, just create a simple span
        # A full implementation would parse **bold**, *italic*, etc.
        children.append({
            "_type": "span",
            "_key": self._generate_key(),
            "text": text,
            "marks": []
        })

        return children

    def upload_image(self, image_path: str) -> Optional[Dict[str, str]]:
        """
        Upload an image to Sanity assets.

        Args:
            image_path: Path to the image file

        Returns:
            Asset reference dict or None if upload fails
        """
        url = f"{self.base_url}/assets/images/{self.dataset}"

        with open(image_path, 'rb') as f:
            files = {'file': f}
            headers = {"Authorization": f"Bearer {self.write_token}"}

            response = requests.post(url, headers=headers, files=files)

            if response.status_code == 200:
                result = response.json()
                return {
                    "_type": "reference",
                    "_ref": result['document']['_id']
                }
            else:
                print(f"Image upload failed: {response.text}")
                return None

    def upload_image_from_url(self, image_url: str, filename: str = "image.jpg") -> Optional[Dict[str, str]]:
        """
        Download an image from URL and upload to Sanity.

        Args:
            image_url: URL of the image to upload
            filename: Filename to use for the upload

        Returns:
            Asset reference dict or None if upload fails
        """
        # Download the image
        response = requests.get(image_url)
        if response.status_code != 200:
            print(f"Failed to download image from {image_url}")
            return None

        url = f"{self.base_url}/assets/images/{self.dataset}"

        files = {'file': (filename, response.content)}
        headers = {"Authorization": f"Bearer {self.write_token}"}

        upload_response = requests.post(url, headers=headers, files=files)

        if upload_response.status_code == 200:
            result = upload_response.json()
            return {
                "_type": "reference",
                "_ref": result['document']['_id']
            }
        else:
            print(f"Image upload failed: {upload_response.text}")
            return None

    def get_authors(self) -> List[Dict[str, Any]]:
        """
        Fetch all authors from Sanity.

        Returns:
            List of author documents
        """
        query = '*[_type == "author"]{_id, name, slug}'
        url = f"{self.base_url}/data/query/{self.dataset}?query={query}"

        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json().get('result', [])
        else:
            print(f"Failed to fetch authors: {response.text}")
            return []

    def create_author(
        self,
        name: str,
        bio: Optional[str] = None,
        email: Optional[str] = None
    ) -> Optional[str]:
        """
        Create a new author in Sanity.

        Args:
            name: Author's display name
            bio: Optional biography text
            email: Optional email address

        Returns:
            Author document ID or None if creation fails
        """
        author_doc = {
            "_type": "author",
            "name": name,
            "slug": {
                "_type": "slug",
                "current": self._slugify(name)
            }
        }

        if bio:
            author_doc["bio"] = [{
                "_type": "block",
                "_key": self._generate_key(),
                "style": "normal",
                "markDefs": [],
                "children": [{
                    "_type": "span",
                    "_key": self._generate_key(),
                    "text": bio,
                    "marks": []
                }]
            }]

        if email:
            author_doc["email"] = email

        mutation = {"mutations": [{"create": author_doc}]}
        url = f"{self.base_url}/data/mutate/{self.dataset}"

        response = requests.post(url, headers=self.headers, json=mutation)

        if response.status_code == 200:
            result = response.json()
            return result['results'][0]['id']
        else:
            print(f"Failed to create author: {response.text}")
            return None

    def publish_post(
        self,
        title: str,
        excerpt: str,
        body: str,
        category: str,
        author_id: str,
        main_image: Optional[Dict[str, Any]] = None,
        featured: bool = False,
        seo_title: Optional[str] = None,
        seo_description: Optional[str] = None,
        publish_date: Optional[datetime] = None,
        slug: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Publish a blog post to Sanity CMS.

        Args:
            title: Post title
            excerpt: Short excerpt (max 200 chars)
            body: Post body content (markdown format)
            category: One of: parenting, clinical, education, adult, stories, school
            author_id: Sanity document ID of the author
            main_image: Optional image asset reference
            featured: Whether to feature this post
            seo_title: Optional SEO title override
            seo_description: Optional SEO description override
            publish_date: Optional publish date (defaults to now)
            slug: Optional custom slug (auto-generated from title if not provided)

        Returns:
            API response with document ID

        Raises:
            ValueError: If category is invalid or excerpt is too long
        """
        # Validate category
        if category not in self.VALID_CATEGORIES:
            raise ValueError(
                f"Invalid category '{category}'. "
                f"Must be one of: {', '.join(self.VALID_CATEGORIES)}"
            )

        # Validate excerpt length
        if len(excerpt) > 200:
            raise ValueError(f"Excerpt must be 200 characters or less (got {len(excerpt)})")

        # Generate slug if not provided
        if not slug:
            slug = self._slugify(title)

        # Set publish date
        if not publish_date:
            publish_date = datetime.now(timezone.utc)

        # Convert body to PortableText
        portable_text_body = self._markdown_to_portable_text(body)

        # Estimate read time
        read_time = self._estimate_read_time(body)

        # Build the post document
        post_doc = {
            "_type": "post",
            "title": title,
            "slug": {
                "_type": "slug",
                "current": slug
            },
            "excerpt": excerpt,
            "author": {
                "_type": "reference",
                "_ref": author_id
            },
            "categories": [category],
            "publishedAt": publish_date.isoformat(),
            "readTime": read_time,
            "featured": featured,
            "body": portable_text_body
        }

        # Add main image if provided
        if main_image:
            post_doc["mainImage"] = {
                "_type": "image",
                "asset": main_image,
                "alt": title  # Default alt text
            }

        # Add SEO settings if provided
        if seo_title or seo_description:
            post_doc["seo"] = {}
            if seo_title:
                post_doc["seo"]["metaTitle"] = seo_title
            if seo_description:
                post_doc["seo"]["metaDescription"] = seo_description

        # Send mutation to Sanity
        mutation = {"mutations": [{"create": post_doc}]}
        url = f"{self.base_url}/data/mutate/{self.dataset}"

        response = requests.post(url, headers=self.headers, json=mutation)

        if response.status_code == 200:
            result = response.json()
            document_id = result['results'][0]['id']
            return {
                "success": True,
                "documentId": document_id,
                "slug": slug,
                "url": f"/blogs/{slug}",
                "transactionId": result.get('transactionId')
            }
        else:
            return {
                "success": False,
                "error": response.text,
                "statusCode": response.status_code
            }

    def update_post(
        self,
        document_id: str,
        updates: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Update an existing blog post.

        Args:
            document_id: Sanity document ID to update
            updates: Dictionary of fields to update

        Returns:
            API response
        """
        # Convert body to PortableText if present
        if 'body' in updates and isinstance(updates['body'], str):
            updates['body'] = self._markdown_to_portable_text(updates['body'])

        mutation = {
            "mutations": [{
                "patch": {
                    "id": document_id,
                    "set": updates
                }
            }]
        }

        url = f"{self.base_url}/data/mutate/{self.dataset}"

        response = requests.post(url, headers=self.headers, json=mutation)

        if response.status_code == 200:
            return {
                "success": True,
                "documentId": document_id,
                "transactionId": response.json().get('transactionId')
            }
        else:
            return {
                "success": False,
                "error": response.text,
                "statusCode": response.status_code
            }

    def delete_post(self, document_id: str) -> Dict[str, Any]:
        """
        Delete a blog post.

        Args:
            document_id: Sanity document ID to delete

        Returns:
            API response
        """
        mutation = {
            "mutations": [{
                "delete": {"id": document_id}
            }]
        }

        url = f"{self.base_url}/data/mutate/{self.dataset}"

        response = requests.post(url, headers=self.headers, json=mutation)

        if response.status_code == 200:
            return {
                "success": True,
                "documentId": document_id
            }
        else:
            return {
                "success": False,
                "error": response.text,
                "statusCode": response.status_code
            }

    def get_post_by_slug(self, slug: str) -> Optional[Dict[str, Any]]:
        """
        Fetch a post by its slug.

        Args:
            slug: The post slug

        Returns:
            Post document or None if not found
        """
        query = f'*[_type == "post" && slug.current == "{slug}"][0]'
        url = f"{self.base_url}/data/query/{self.dataset}?query={query}"

        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json().get('result')
        return None


def main():
    """Example usage of the SanityPublisher."""

    # Initialize publisher
    publisher = SanityPublisher()

    # Example: Get authors
    print("Fetching authors...")
    authors = publisher.get_authors()
    for author in authors:
        print(f"  - {author['name']} (ID: {author['_id']})")

    if not authors:
        print("\nNo authors found. Creating a default author...")
        author_id = publisher.create_author(
            name="divit mind space",
            bio="The divit mind space editorial team.",
            email="hello@divitmindspace.com"
        )
        print(f"Created author with ID: {author_id}")
    else:
        author_id = authors[0]['_id']

    # Example post content
    sample_body = """
## Introduction

Anxiety in teenagers is more common than many parents realize. In fact, recent studies suggest that approximately 1 in 3 adolescents will experience an anxiety disorder at some point during their teenage years.

## Understanding Teen Anxiety

Teenagers face unique pressures that can contribute to anxiety:

- Academic expectations and college preparation
- Social dynamics and peer relationships
- Identity formation and self-image concerns
- Family changes and responsibilities
- Digital world pressures and social media

## Signs to Watch For

While some anxiety is normal, watch for these warning signs:

1. Persistent worry that seems disproportionate to situations
2. Avoidance of social situations or activities they once enjoyed
3. Physical symptoms like headaches, stomachaches, or sleep problems
4. Declining academic performance
5. Irritability or emotional outbursts

## How to Support Your Teen

> "The goal isn't to eliminate anxiety, but to help teens develop healthy coping strategies." - Child Psychology Expert

Here are practical ways to help:

- Create a safe space for open conversation
- Validate their feelings without dismissing concerns
- Model healthy stress management
- Encourage rather than force social engagement
- Know when to seek professional help

## When to Seek Help

If anxiety is significantly impacting your teen's daily life, school performance, or relationships, it may be time to consult a mental health professional.

## Conclusion

Supporting a teen through anxiety requires patience, understanding, and sometimes professional guidance. Remember, with the right support, most teenagers can learn to manage their anxiety effectively.
"""

    # Publish a sample post
    print("\nPublishing sample post...")
    result = publisher.publish_post(
        title="Understanding and Supporting Teen Anxiety: A Parent's Guide",
        excerpt="Learn to recognize signs of anxiety in teenagers and discover practical strategies to support your teen's mental health.",
        body=sample_body,
        category="parenting",
        author_id=author_id,
        featured=False,
        seo_description="A comprehensive guide for parents on recognizing and supporting teenagers dealing with anxiety."
    )

    if result['success']:
        print(f"✓ Post published successfully!")
        print(f"  Document ID: {result['documentId']}")
        print(f"  URL: {result['url']}")
    else:
        print(f"✗ Publishing failed: {result['error']}")


if __name__ == "__main__":
    main()
