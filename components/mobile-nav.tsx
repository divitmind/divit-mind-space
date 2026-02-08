
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
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
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-lg font-medium hover:text-[#7C9082] transition-colors"
            >
              Home
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="about" className="border-none">
                <AccordionTrigger className="px-4 py-2 text-lg font-medium hover:text-[#7C9082] hover:no-underline">
                  About
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 pl-4 text-base text-gray-600">
                  <MobileLink href="#" setOpen={setOpen}>About Us</MobileLink>
                  <MobileLink href="#" setOpen={setOpen}>Philosophy</MobileLink>
                  <MobileLink href="#" setOpen={setOpen}>Founders & Specialists</MobileLink>
                  <MobileLink href="#" setOpen={setOpen}>Our Advisors</MobileLink>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="services" className="border-none">
                <AccordionTrigger className="px-4 py-2 text-lg font-medium hover:text-[#7C9082] hover:no-underline">
                  Services
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 pl-4 text-base text-gray-600">
                  <MobileLink href="#" setOpen={setOpen}>Educational Assessments</MobileLink>
                  <MobileLink href="#" setOpen={setOpen}>Psychometric Assessments</MobileLink>
                  <MobileLink href="#" setOpen={setOpen}>PsychoEducational Assessments</MobileLink>
                  <MobileLink href="#" setOpen={setOpen}>Clinical Assessments</MobileLink>
                  <MobileLink href="#" setOpen={setOpen}>Special Education Sessions</MobileLink>
                  <MobileLink href="#" setOpen={setOpen}>Training & Courses</MobileLink>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="more" className="border-none">
                <AccordionTrigger className="px-4 py-2 text-lg font-medium hover:text-[#7C9082] hover:no-underline">
                  More
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 pl-4 text-base text-gray-600">
                  <div className="font-semibold text-[#2F3E33] pt-2">Opportunity</div>
                  <MobileLink href="#" setOpen={setOpen} className="pl-2">Internship</MobileLink>
                  <MobileLink href="#" setOpen={setOpen} className="pl-2">Vacancies</MobileLink>

                  <div className="font-semibold text-[#2F3E33] pt-2">Media</div>
                  <MobileLink href="#" setOpen={setOpen} className="pl-2">Blogs</MobileLink>
                  <MobileLink href="#" setOpen={setOpen} className="pl-2">News</MobileLink>
                  <MobileLink href="#" setOpen={setOpen} className="pl-2">Gallery</MobileLink>

                  <MobileLink href="#" setOpen={setOpen} className="pt-2">Affiliations</MobileLink>
                  <MobileLink href="#" setOpen={setOpen}>Awareness Program</MobileLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-lg font-medium hover:text-[#7C9082] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-lg font-medium hover:text-[#7C9082] transition-colors"
            >
              Blog
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({ href, setOpen, children, className }: { href: string, setOpen: (open: boolean) => void, children: React.ReactNode, className?: string }) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`block py-1 hover:text-[#7C9082] transition-colors ${className}`}
    >
      {children}
    </Link>
  )
}
