"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Image as ImageIcon, Megaphone, ChevronDown, FileText, Heart, Users, GraduationCap, BookOpen } from "lucide-react";

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

const serviceCategories = [
  { id: "assessments", label: "Assessments", href: "/services?category=assessments", icon: FileText },
  { id: "therapy", label: "Therapy", href: "/services?category=therapy", icon: Heart },
  { id: "guidance", label: "Guidance", href: "/services?category=guidance", icon: Users },
  { id: "programs", label: "Programs", href: "/services?category=programs", icon: GraduationCap },
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
    <NavigationMenu className="hidden md:flex">
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
              {/* Category Links */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {serviceCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-black/5 hover:border-green/20 hover:bg-green/5 transition-all group"
                  >
                    <cat.icon className="w-5 h-5 text-black/30 group-hover:text-green transition-colors" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/50 group-hover:text-green transition-colors">
                      {cat.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Individual Services */}
              <ul className="grid gap-2 md:grid-cols-2 border-t border-black/5 pt-4">
                {navServices.map((service) => (
                  <ListItem
                    key={service.id}
                    title={service.title}
                    href={`/services/${service.slug}`}
                  />
                ))}
              </ul>

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
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[300px] gap-2 p-6 bg-white rounded-[2.5rem] shadow-2xl border border-black/5">
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
          <NavLink href="/contact-us">Contact</NavLink>
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
