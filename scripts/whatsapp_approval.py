#!/usr/bin/env python3
"""
WhatsApp Approval Workflow for Blog Posts

Sends blog drafts to WhatsApp for approval before publishing.
Only the designated approver can approve/reject posts.

Flow:
1. Blog is saved as draft in Sanity
2. WhatsApp notification sent to approver
3. Approver replies APPROVE or REJECT
4. Bot publishes or discards accordingly
"""

import json
import time
import requests
from datetime import datetime, timezone
from pathlib import Path

# Configuration
APPROVER_PHONE = "919964618444"  # Without + prefix
BRIDGE_URL = "http://localhost:3000"
BRIDGE_TIMEOUT = 10

# Sanity config
SANITY_TOKEN = 'skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB'
SANITY_PROJECT_ID = '3c4uripz'
SANITY_DATASET = 'production'
SANITY_API_VERSION = '2021-06-07'

# Pending approvals storage
PENDING_FILE = Path(__file__).parent.parent / "data" / "pending_approvals.json"


def log(message: str, level: str = "INFO"):
    """Log with timestamp."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] [{level}] {message}")


def check_bridge_health() -> bool:
    """Check if WhatsApp bridge is running and connected."""
    try:
        response = requests.get(f"{BRIDGE_URL}/health", timeout=BRIDGE_TIMEOUT)
        if response.status_code == 200:
            data = response.json()
            return data.get("authenticated", False)
    except Exception as e:
        log(f"Bridge health check failed: {e}", "ERROR")
    return False


def send_whatsapp_message(phone: str, message: str) -> dict:
    """
    Send a WhatsApp message via Hermes bridge.

    Args:
        phone: Phone number without + (e.g., "919964618444")
        message: Message text to send

    Returns:
        dict with success status and message ID
    """
    # Format chat ID for WhatsApp
    chat_id = f"{phone}@s.whatsapp.net"

    try:
        response = requests.post(
            f"{BRIDGE_URL}/send",
            json={
                "chatId": chat_id,
                "message": message
            },
            timeout=30
        )

        if response.status_code == 200:
            data = response.json()
            return {
                "success": True,
                "message_id": data.get("messageId"),
                "chat_id": chat_id
            }
        else:
            return {
                "success": False,
                "error": response.text,
                "status_code": response.status_code
            }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def poll_for_response(chat_id: str, timeout_seconds: int = 300) -> dict:
    """
    Poll for a response from the approver.

    Args:
        chat_id: WhatsApp chat ID to watch
        timeout_seconds: How long to wait for response

    Returns:
        dict with response text or timeout status
    """
    start_time = time.time()
    poll_interval = 2  # seconds

    log(f"Waiting for response (timeout: {timeout_seconds}s)...")

    while time.time() - start_time < timeout_seconds:
        try:
            # Long-poll for messages
            response = requests.get(
                f"{BRIDGE_URL}/messages",
                timeout=poll_interval + 5
            )

            if response.status_code == 200:
                messages = response.json()

                for msg in messages:
                    # Check if message is from our approver
                    msg_chat_id = msg.get("chatId", "")
                    msg_from = msg.get("from", "")

                    if APPROVER_PHONE in msg_chat_id or APPROVER_PHONE in msg_from:
                        text = msg.get("text", "").strip().upper()

                        if text in ["APPROVE", "YES", "OK", "PUBLISH", "Y"]:
                            return {"approved": True, "response": text}
                        elif text in ["REJECT", "NO", "CANCEL", "DELETE", "N"]:
                            return {"approved": False, "response": text}

        except requests.Timeout:
            # Expected for long-polling
            pass
        except Exception as e:
            log(f"Poll error: {e}", "WARN")

        time.sleep(poll_interval)

    return {"timeout": True}


def load_pending_approvals() -> dict:
    """Load pending approvals from file."""
    if PENDING_FILE.exists():
        with open(PENDING_FILE) as f:
            return json.load(f)
    return {"pending": []}


def save_pending_approvals(data: dict):
    """Save pending approvals to file."""
    PENDING_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(PENDING_FILE, 'w') as f:
        json.dump(data, f, indent=2, default=str)


def create_sanity_draft(content: dict, category: str, author_id: str) -> dict:
    """
    Create a blog post as a draft in Sanity.

    Drafts have _id prefixed with "drafts."
    """
    import uuid

    base_url = f'https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}'
    headers = {
        'Authorization': f'Bearer {SANITY_TOKEN}',
        'Content-Type': 'application/json'
    }

    # Generate draft ID
    doc_id = f"drafts.{uuid.uuid4().hex[:12]}"

    post_doc = {
        '_id': doc_id,
        '_type': 'post',
        'title': content['title'],
        'slug': {
            '_type': 'slug',
            'current': content['slug']
        },
        'excerpt': content['excerpt'],
        'author': {
            '_type': 'reference',
            '_ref': author_id
        },
        'categories': [category],
        'readTime': content.get('read_time', 4),
        'featured': False,
        'body': content['body']
    }

    # Add image if provided
    if content.get('mainImage'):
        post_doc['mainImage'] = content['mainImage']

    mutation = {'mutations': [{'createOrReplace': post_doc}]}
    url = f'{base_url}/data/mutate/{SANITY_DATASET}'

    response = requests.post(url, headers=headers, json=mutation)

    if response.status_code == 200:
        return {
            'success': True,
            'draft_id': doc_id,
            'slug': content['slug'],
            'preview_url': f"https://divitmindspace.com/api/preview?slug={content['slug']}"
        }
    else:
        return {
            'success': False,
            'error': response.text
        }


def publish_draft(draft_id: str) -> dict:
    """
    Publish a draft by creating the published version.

    Removes "drafts." prefix and sets publishedAt.
    """
    base_url = f'https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}'
    headers = {
        'Authorization': f'Bearer {SANITY_TOKEN}',
        'Content-Type': 'application/json'
    }

    # Get the draft document
    query = f'*[_id == "{draft_id}"][0]'
    import urllib.parse
    encoded_query = urllib.parse.quote(query)

    response = requests.get(
        f"{base_url}/data/query/{SANITY_DATASET}?query={encoded_query}",
        headers=headers
    )

    if response.status_code != 200:
        return {"success": False, "error": "Could not fetch draft"}

    draft = response.json().get("result")
    if not draft:
        return {"success": False, "error": "Draft not found"}

    # Create published document (remove drafts. prefix)
    published_id = draft_id.replace("drafts.", "")

    # Remove internal fields and update
    published_doc = {k: v for k, v in draft.items() if not k.startswith("_") or k in ["_type"]}
    published_doc["_id"] = published_id
    published_doc["publishedAt"] = datetime.now(timezone.utc).isoformat()

    # Create published and delete draft
    mutations = [
        {"createOrReplace": published_doc},
        {"delete": {"id": draft_id}}
    ]

    response = requests.post(
        f"{base_url}/data/mutate/{SANITY_DATASET}",
        headers=headers,
        json={"mutations": mutations}
    )

    if response.status_code == 200:
        slug = draft.get("slug", {}).get("current", "")
        return {
            "success": True,
            "document_id": published_id,
            "url": f"/blogs/{slug}"
        }
    else:
        return {"success": False, "error": response.text}


def delete_draft(draft_id: str) -> bool:
    """Delete a rejected draft."""
    base_url = f'https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}'
    headers = {
        'Authorization': f'Bearer {SANITY_TOKEN}',
        'Content-Type': 'application/json'
    }

    mutation = {"mutations": [{"delete": {"id": draft_id}}]}

    response = requests.post(
        f"{base_url}/data/mutate/{SANITY_DATASET}",
        headers=headers,
        json=mutation
    )

    return response.status_code == 200


def request_approval(
    title: str,
    category: str,
    excerpt: str,
    draft_id: str,
    preview_url: str = None
) -> dict:
    """
    Send approval request via WhatsApp and wait for response.

    Returns:
        dict with approval status
    """
    # Check bridge health
    if not check_bridge_health():
        return {
            "success": False,
            "error": "WhatsApp bridge not connected. Run 'hermes whatsapp' to connect."
        }

    # Compose message
    message = f"""📝 *New Blog Ready for Review*

*Title:* {title}
*Category:* {category}
*Excerpt:* {excerpt[:100]}...

Reply:
✅ *APPROVE* - Publish now
❌ *REJECT* - Discard draft"""

    if preview_url:
        message += f"\n\n🔗 Preview: {preview_url}"

    # Send notification
    log(f"Sending approval request for: {title}")
    send_result = send_whatsapp_message(APPROVER_PHONE, message)

    if not send_result["success"]:
        return {
            "success": False,
            "error": f"Failed to send WhatsApp: {send_result.get('error')}"
        }

    log("Approval request sent. Waiting for response...")

    # Store pending approval
    pending = load_pending_approvals()
    pending["pending"].append({
        "draft_id": draft_id,
        "title": title,
        "category": category,
        "requested_at": datetime.now(timezone.utc).isoformat(),
        "message_id": send_result.get("message_id")
    })
    save_pending_approvals(pending)

    # Poll for response (5 minute timeout)
    response = poll_for_response(
        chat_id=f"{APPROVER_PHONE}@s.whatsapp.net",
        timeout_seconds=300
    )

    # Remove from pending
    pending["pending"] = [p for p in pending["pending"] if p["draft_id"] != draft_id]
    save_pending_approvals(pending)

    if response.get("timeout"):
        log("Approval request timed out", "WARN")
        return {
            "success": False,
            "error": "Approval timed out (5 minutes). Draft saved for later.",
            "timeout": True,
            "draft_id": draft_id
        }

    if response.get("approved"):
        log(f"Approved! Response: {response.get('response')}")

        # Publish the draft
        publish_result = publish_draft(draft_id)

        if publish_result["success"]:
            # Send confirmation
            send_whatsapp_message(
                APPROVER_PHONE,
                f"✅ *Published!*\n\n{title}\n\n🔗 https://divitmindspace.com{publish_result['url']}"
            )
            return {
                "success": True,
                "approved": True,
                "published_url": publish_result["url"]
            }
        else:
            return {
                "success": False,
                "error": f"Publish failed: {publish_result.get('error')}"
            }
    else:
        log(f"Rejected. Response: {response.get('response')}")

        # Delete the draft
        delete_draft(draft_id)

        # Send confirmation
        send_whatsapp_message(
            APPROVER_PHONE,
            f"❌ *Rejected and discarded*\n\n{title}"
        )

        return {
            "success": True,
            "approved": False,
            "rejected": True
        }


def check_pending_approvals():
    """Check for any pending approvals that need attention."""
    pending = load_pending_approvals()

    if not pending["pending"]:
        print("No pending approvals.")
        return

    print(f"\n{'='*50}")
    print("PENDING APPROVALS")
    print('='*50)

    for item in pending["pending"]:
        print(f"\nTitle: {item['title']}")
        print(f"Category: {item['category']}")
        print(f"Draft ID: {item['draft_id']}")
        print(f"Requested: {item['requested_at']}")

    print('='*50)


# Test function
def test_whatsapp_connection():
    """Test WhatsApp bridge connection."""
    print("Testing WhatsApp bridge connection...")

    if check_bridge_health():
        print("SUCCESS: Bridge is connected and authenticated!")

        # Send test message
        result = send_whatsapp_message(
            APPROVER_PHONE,
            "🤖 *Divit Blog Bot Test*\n\nWhatsApp approval system is working!\n\nReply with any message to confirm receipt."
        )

        if result["success"]:
            print(f"Test message sent! Message ID: {result.get('message_id')}")
        else:
            print(f"Failed to send: {result.get('error')}")
    else:
        print("FAILED: Bridge not connected.")
        print("Run 'hermes whatsapp' to connect.")


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        if sys.argv[1] == "test":
            test_whatsapp_connection()
        elif sys.argv[1] == "pending":
            check_pending_approvals()
    else:
        print("Usage:")
        print("  python whatsapp_approval.py test     - Test WhatsApp connection")
        print("  python whatsapp_approval.py pending  - Check pending approvals")
