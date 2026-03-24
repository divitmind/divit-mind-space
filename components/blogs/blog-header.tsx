"use client";
import { Facebook, Twitter, Linkedin, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BlogHeaderProps {
    category: string;
    title: string;
    author: {
        name: string;
        avatar: string;
    };
    publishedDate: string;
}

export const BlogHeader = ({ category, title, author, publishedDate }: BlogHeaderProps) => {
    const router = useRouter();
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`,
    };

    const handleShare = (platform: keyof typeof shareLinks) => {
        window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
    };

    return (
        <header className="space-y-6">
        <Button variant="outline" size="icon" className="hover:bg-blog-hover h-9 w-9 rounded-full" onClick={() => router.back()}>
            <ArrowLeft />
        </Button>
        <div className="flex items-center space-x-2">
            <Badge variant="default" className="bg-green text-white">{category}</Badge>
        </div>

            <h1 className="text-foreground text-4xl leading-15 font-bold tracking-tight md:text-4xl lg:text-5xl">
                {title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">by {author.name}</p>
                        <p className="text-muted-foreground text-sm">{publishedDate}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <span className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase">
                        Share this
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShare("twitter")}
                        title="Share on Twitter"
                        className="hover:bg-blog-hover h-9 w-9 rounded-full">
                        <Twitter />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShare("facebook")}
                        title="Share on Facebook"
                        className="hover:bg-blog-hover h-9 w-9 rounded-full">
                        <Facebook />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShare("linkedin")}
                        title="Share on LinkedIn"
                        className="hover:bg-blog-hover h-9 w-9 rounded-full">
                        <Linkedin />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShare("whatsapp")}
                        title="Share on WhatsApp"
                        className="hover:bg-blog-hover h-9 w-9 rounded-full">
                        <MessageCircle />
                    </Button>
                </div>
            </div>
        </header>
    );
};