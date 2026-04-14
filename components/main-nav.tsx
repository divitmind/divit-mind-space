"use client";

import * as React from "react";
import Link from "next/link";
import { Brain, Briefcase, Image as ImageIcon, Megaphone, ChevronDown } from "lucide-react";

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
import { services } from "@/lib/services-data";

const navServices = services.slice(0, 6);

export function MainNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavLink href="/">Home</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/about-us">About Us</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-black/40 hover:text-green font-bold text-[10px] uppercase tracking-[0.2em] transition-all px-4 h-10 data-[state=open]:text-green group">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white rounded-[2.5rem] shadow-2xl border border-black/5">
              {navServices.map((service) => (
                <ListItem
                  key={service.id}
                  title={service.title}
                  href={`/services/${service.slug}`}
                />
              ))}
              <li className="col-span-2 border-t border-black/5 pt-6 mt-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-[10px] font-bold text-green hover:gap-4 transition-all tracking-[0.2em] uppercase w-full justify-center"
                >
                  Explore All Services
                  <ChevronDown className="w-3 h-3 -rotate-90" />
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/awareness-program">Workshops</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/careers">Careers</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/blogs">Blogs</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-black/40 hover:text-green font-bold text-[10px] uppercase tracking-[0.2em] transition-all px-4 h-10 data-[state=open]:text-green group">
            Media
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[300px] gap-2 p-6 bg-white rounded-[2.5rem] shadow-2xl border border-black/5">
              <ListItem title="Mind Gym" href="/mind-gym" icon={<Brain className="h-4 w-4" />}>
                Brain Training
              </ListItem>
              <ListItem title="Gallery" href="/gallery" icon={<ImageIcon className="h-4 w-4" />}>
                Our Moments
              </ListItem>
              <ListItem title="News" href="/news" icon={<Megaphone className="h-4 w-4" />}>
                Announcements
              </ListItem>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/contact-us">Contact</NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <NavigationMenuLink 
            className={cn(
                navigationMenuTriggerStyle(), 
                "bg-transparent text-black/40 hover:text-green font-bold text-[10px] uppercase tracking-[0.2em] transition-all px-4 h-10"
            )} 
            asChild
        >
            <Link href={href}>{children}</Link>
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
