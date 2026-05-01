"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Image as ImageIcon, Megaphone, ChevronDown, FileText, Heart, Users, GraduationCap, BookOpen, Activity, MapPin, Stethoscope } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const serviceCategories = [
  { id: "assessments", label: "Assessments", hub: true,  href: "/services?category=assessments", icon: FileText },
  { id: "therapy",     label: "Therapy",     hub: false, href: "/services?category=therapy",      icon: Heart },
  { id: "guidance",    label: "Counselling", hub: false, href: "/services?category=guidance",     icon: Users },
  { id: "programs",    label: "Programs",    hub: false, href: "/services?category=programs",     icon: GraduationCap },
  { id: "physiotherapy", label: "Physio",   hub: false, href: "/services?category=physiotherapy", icon: Activity },
];

const popularServices = [
  { label: "Speech Therapy",        href: "/services/speech-therapy" },
  { label: "Occupational Therapy",  href: "/services/occupational-therapy" },
  { label: "Behavioral Therapy",    href: "/services/behavioral-therapy" },
  { label: "Cognitive Therapy",     href: "/services/cognitive-therapy" },
  { label: "Group Therapy",         href: "/services/group-therapy-sessions" },
  { label: "Assessments",           href: "/services/psychoeducational-assessments" },
];

export function MainNav() {
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    // viewport={false} disables Radix's shared left-anchored dropdown container
    // and renders each NavigationMenuContent directly below its own trigger.
    // Fixes UX issue where clicking any tab made the menu appear on the left
    // edge of the navbar rather than under the clicked tab.
    <NavigationMenu viewport={false} className="hidden md:flex">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavLink href="/" onClick={handleHomeClick}>Home</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-black/40 hover:text-green font-bold text-[10px] uppercase tracking-[0.2em] transition-all px-4 h-10 data-[state=open]:text-green group">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] p-6 md:w-[500px] lg:w-[600px] bg-white rounded-[2.5rem] shadow-2xl border border-black/5">
              {/* Category Links — all 5 in one row */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {serviceCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-black/5 hover:border-green/20 hover:bg-green/5 transition-all group"
                  >
                    <cat.icon className="w-5 h-5 text-black/30 group-hover:text-green transition-colors" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-black/50 group-hover:text-green transition-colors text-center leading-tight">
                      {cat.label}
                    </span>
                    {cat.hub && (
                      <span className="text-[7px] font-black uppercase tracking-widest text-green/60 bg-green/8 px-1.5 py-0.5 rounded-full border border-green/15 group-hover:bg-green/15 transition-colors">
                        HUB
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Popular Services */}
              <div className="border-t border-black/5 pt-4">
                <h4 className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-black/20">Popular Services</h4>
                <div className="flex flex-wrap gap-2">
                  {popularServices.map((service) => (
                    <Link
                      key={service.label}
                      href={service.href}
                      className="px-4 py-2 rounded-full bg-green/5 border border-green/10 text-[11px] font-bold text-green hover:bg-green/10 transition-colors uppercase tracking-wider"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/5 pt-4 mt-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-[10px] font-bold text-green hover:gap-4 transition-all tracking-[0.2em] uppercase w-full justify-center"
                >
                  Explore All Services
                  <ChevronDown className="w-3 h-3 -rotate-90" />
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/about-us">About Us</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/awareness-program">Workshops</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-black/40 hover:text-green font-bold text-[10px] uppercase tracking-[0.2em] transition-all px-4 h-10 data-[state=open]:text-green group">
            Explore
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[320px] gap-2 p-6 bg-white rounded-[2.5rem] shadow-2xl border border-black/5">
              <ListItem title="Our Specialists" href="/specialists" icon={<Stethoscope className="h-4 w-4" />}>
                Meet the Team
              </ListItem>
              <ListItem title="Conditions We Support" href="/conditions" icon={<Heart className="h-4 w-4" />}>
                Autism, ADHD, LD, Pain & More
              </ListItem>
              <ListItem title="Near Me" href="/near-me" icon={<MapPin className="h-4 w-4" />}>
                Locations Across Bangalore
              </ListItem>
              <ListItem title="Blogs" href="/blogs" icon={<BookOpen className="h-4 w-4" />}>
                Expert Insights
              </ListItem>
              <ListItem title="Mind Gym" href="/mind-gym" icon={<Brain className="h-4 w-4" />}>
                Brain Training
              </ListItem>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-black/40 hover:text-green font-bold text-[10px] uppercase tracking-[0.2em] transition-all px-4 h-10 data-[state=open]:text-green group">
            Media
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[300px] gap-2 p-6 bg-white rounded-[2.5rem] shadow-2xl border border-black/5">
              <ListItem title="News" href="/news" icon={<Megaphone className="h-4 w-4" />}>
                Announcements
              </ListItem>
              <ListItem title="Gallery" href="/gallery" icon={<ImageIcon className="h-4 w-4" />}>
                Our Moments
              </ListItem>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/contact-us">Contact Us</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/careers">Careers</NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
    return (
        <NavigationMenuLink
            className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-black/40 hover:text-green font-bold text-[10px] uppercase tracking-[0.2em] transition-all px-4 h-10"
            )}
            asChild
        >
            <Link href={href} onClick={onClick}>{children}</Link>
        </NavigationMenuLink>
    );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-start gap-4 select-none rounded-[1.5rem] p-4 leading-none no-underline outline-none transition-all hover:bg-green/5 hover:text-green group border border-transparent hover:border-green/10",
            className
          )}
          {...props}
        >
          {icon && (
            <div className="mt-0.5 shrink-0 text-black/20 group-hover:text-green transition-colors">
              {icon}
            </div>
          )}
          <div className="space-y-1.5">
            <div className="text-xs font-bold leading-none group-hover:text-green transition-colors tracking-[0.1em] uppercase">
              {title}
            </div>
            {children && (
              <p className="line-clamp-1 text-[10px] font-medium leading-relaxed text-black/40 group-hover:text-green/60 uppercase tracking-widest">
                {children}
              </p>
            )}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
