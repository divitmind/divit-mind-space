"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ImageIcon, Megaphone, Briefcase, FileText, Heart, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
// 4 main service groups for mobile nav
const serviceGroups = [
  { label: "Assessments", href: "/services#assessments", icon: FileText },
  { label: "Therapy", href: "/services#therapy", icon: Heart },
  { label: "Guidance", href: "/services#guidance", icon: Users },
  { label: "Programs", href: "/services#programs", icon: GraduationCap },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-[#2F3E33]">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#FDFBF7] p-0">
        <SheetHeader className="p-4 border-b border-[#E8ECE9]">
          <SheetTitle className="text-left font-bold text-xl text-[#2F3E33]">Divit MindSpace</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="flex flex-col gap-2 p-4">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-lg font-medium hover:text-[#7A9A7D] transition-colors"
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/about-us"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-lg font-medium hover:text-[#7A9A7D] transition-colors"
            >
              About Us
            </Link>

            <Accordion type="single" collapsible className="w-full">
              {/* Services Accordion */}
              <AccordionItem value="services" className="border-none">
                <AccordionTrigger className="px-4 py-2 text-lg font-medium hover:text-[#7A9A7D] hover:no-underline">
                  Services
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 pl-4 text-base text-gray-600">
                  {serviceGroups.map((group) => (
                    <MobileLink
                      key={group.label}
                      href={group.href}
                      setOpen={setOpen}
                      icon={<group.icon className="h-4 w-4" />}
                    >
                      {group.label}
                    </MobileLink>
                  ))}
                  <MobileLink href="/services" setOpen={setOpen} className="pt-2 font-semibold text-[#7A9A7D]">
                    View All Services →
                  </MobileLink>
                </AccordionContent>
              </AccordionItem>

              {/* Media Accordion */}
              <AccordionItem value="media" className="border-none">
                <AccordionTrigger className="px-4 py-2 text-lg font-medium hover:text-[#7A9A7D] hover:no-underline">
                  Media
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 pl-4 text-base text-gray-600">
                  <MobileLink href="/gallery" setOpen={setOpen} icon={<ImageIcon className="h-4 w-4" />}>
                    Gallery
                  </MobileLink>
                  <MobileLink href="/news" setOpen={setOpen} icon={<Megaphone className="h-4 w-4" />}>
                    News
                  </MobileLink>
                  <MobileLink href="/careers" setOpen={setOpen} icon={<Briefcase className="h-4 w-4" />}>
                    Careers
                  </MobileLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Free Workshops */}
            <Link
              href="/awareness-program"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-lg font-medium hover:text-[#7A9A7D] transition-colors"
            >
              Free Workshops
            </Link>

            {/* Blogs */}
            <Link
              href="/blogs"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-lg font-medium hover:text-[#7A9A7D] transition-colors"
            >
              Blogs
            </Link>

            {/* Contact */}
            <Link
              href="/contact-us"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-lg font-medium hover:text-[#7A9A7D] transition-colors"
            >
              Contact
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({
  href,
  setOpen,
  children,
  className,
  icon
}: {
  href: string;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`flex items-center gap-2 py-1 hover:text-[#7A9A7D] transition-colors ${className}`}
    >
      {icon && <span className="text-[#7A9A7D]">{icon}</span>}
      {children}
    </Link>
  );
}
