"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ImageIcon, Megaphone, FileText, Heart, Users, GraduationCap, Brain, ChevronRight, BookOpen, Activity, MapPin, Stethoscope } from "lucide-react";
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
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { cn } from "@/lib/utils";

const serviceGroups = [
  { label: "Assessments", href: "/services?category=assessments", icon: FileText },
  { label: "Therapy", href: "/services?category=therapy", icon: Heart },
  { label: "Guidance", href: "/services?category=guidance", icon: Users },
  { label: "Programs", href: "/services?category=programs", icon: GraduationCap },
  { label: "Physiotherapy", href: "/services?category=physiotherapy", icon: Activity },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const handleHomeClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-black/60 hover:bg-green/5 transition-colors h-12 w-12 rounded-full border border-black/5">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] bg-[#FDFBF7] p-0 border-l border-black/5">
        <SheetHeader className="px-6 py-3 border-b border-black/5 bg-white/50 backdrop-blur-xl">
          <div className="flex items-center">
            <div className="relative w-12 h-12">
                <Image src="/divit-mindspace-logo.png" alt="Divit MindSpace Logo" fill className="object-contain" />
            </div>
            <SheetTitle className="sr-only">Divit MindSpace Menu</SheetTitle>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-66px)]">
          <div className="flex flex-col gap-1 p-4 pt-0">
            <div className="space-y-0">
                <MobileNavItem href="/" label="Home" setOpen={setOpen} onCustomClick={handleHomeClick} />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="services" className="border-none">
                <AccordionTrigger className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-green hover:no-underline hover:bg-green/5 rounded-[1.5rem] transition-all duration-500">
                  Services
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 p-4 pt-2">
                  {serviceGroups.map((group) => (
                    <MobileLink
                      key={group.label}
                      href={group.href}
                      setOpen={setOpen}
                      icon={<group.icon className="h-4 w-4" />}
                      className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic"
                    >
                      {group.label}
                    </MobileLink>
                  ))}
                  <Link
                    href="/services"
                    onClick={() => setOpen(false)}
                    className="px-6 py-4 mt-2 font-bold text-[9px] uppercase tracking-[0.3em] text-green bg-green/5 rounded-2xl text-center border border-green/10"
                  >
                    Explore All Services
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-0">
                <MobileNavItem href="/about-us" label="About Us" setOpen={setOpen} />
                <MobileNavItem href="/awareness-program" label="Workshops" setOpen={setOpen} />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="resources" className="border-none">
                <AccordionTrigger className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-green hover:no-underline hover:bg-green/5 rounded-[1.5rem] transition-all duration-500">
                  Explore
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 p-4 pt-2">
                  <MobileLink href="/specialists" setOpen={setOpen} icon={<Stethoscope className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    Our Specialists
                  </MobileLink>
                  <MobileLink href="/conditions" setOpen={setOpen} icon={<Heart className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    Conditions We Support
                  </MobileLink>
                  <MobileLink href="/near-me" setOpen={setOpen} icon={<MapPin className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    Near Me
                  </MobileLink>
                  <MobileLink href="/faq" setOpen={setOpen} icon={<BookOpen className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    All FAQs
                  </MobileLink>
                  <MobileLink href="/glossary" setOpen={setOpen} icon={<BookOpen className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    Glossary
                  </MobileLink>
                  <MobileLink href="/howto" setOpen={setOpen} icon={<BookOpen className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    How-To Guides
                  </MobileLink>
                  <MobileLink href="/blogs" setOpen={setOpen} icon={<BookOpen className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    Blogs
                  </MobileLink>
                  <MobileLink href="/mind-gym" setOpen={setOpen} icon={<Brain className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    Mind Gym
                  </MobileLink>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="media" className="border-none">
                <AccordionTrigger className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-green hover:no-underline hover:bg-green/5 rounded-[1.5rem] transition-all duration-500">
                  Media
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 p-4 pt-2">
                  <MobileLink href="/news" setOpen={setOpen} icon={<Megaphone className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    News
                  </MobileLink>
                  <MobileLink href="/gallery" setOpen={setOpen} icon={<ImageIcon className="h-4 w-4" />} className="px-6 py-4 rounded-2xl bg-white border border-black/5 text-black/60 font-medium italic">
                    Gallery
                  </MobileLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-0">
                <MobileNavItem href="/contact-us" label="Contact" setOpen={setOpen} />
                <MobileNavItem href="/careers" label="Careers" setOpen={setOpen} />
            </div>

            <div className="mt-6 px-2 pb-4">
              <WhatsAppConsultationLink className="w-full dm-pill-button dm-pill-button-primary py-4 shadow-xl shadow-green/20">
                Chat with Us
              </WhatsAppConsultationLink>
              <div className="mt-4 text-center space-y-1">
                <p className="text-[9px] font-bold text-black/20 uppercase tracking-[0.15em] leading-relaxed">
                  Bangalore&apos;s Leading Center for All Ages
                </p>
                <p className="text-[8px] font-bold text-black/15 uppercase tracking-[0.1em] leading-relaxed">
                  Mental Health • Neurodevelopment • Physiotherapy
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MobileNavItem({ href, label, setOpen, onCustomClick }: { href: string; label: string; setOpen: (open: boolean) => void; onCustomClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onCustomClick || (() => setOpen(false))}
            className="group flex items-center justify-between px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-green hover:bg-green/5 rounded-[1.5rem] transition-all duration-500"
        >
            {label}
            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Link>
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
      className={cn("flex items-center justify-between group transition-all active:scale-95", className)}
    >
      <div className="flex items-center gap-4">
        {icon && <span className="text-green/40 group-hover:text-green transition-colors">{icon}</span>}
        {children}
      </div>
      <ChevronRight className="w-3 h-3 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
