"use client";

import * as React from "react";
import Link from "next/link";
import { Briefcase, Newspaper, Image as ImageIcon, Megaphone, FileText, UserPlus } from "lucide-react";

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
import { client } from "@/sanity/lib/client";
import { POPULAR_SERVICES_QUERY } from "@/sanity/lib/queries";
import type { ServiceNavItem } from "@/sanity/types";

export function MainNav() {
  const [serviceItems, setServiceItems] = React.useState<ServiceNavItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPopularServices() {
      try {
        const services = await client.fetch<ServiceNavItem[]>(POPULAR_SERVICES_QUERY);
        setServiceItems(services || []);
      } catch (error) {
        console.error("Error fetching popular services:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPopularServices();
  }, []);
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1 lg:gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-green hover:text-green/80 font-bold text-sm tracking-tight transition-colors")} asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-green hover:text-green/80 font-bold text-sm tracking-tight transition-colors")} asChild>
            <Link href="/about-us">About Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-green hover:text-green/80 font-bold text-sm tracking-tight transition-colors">Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-5 md:w-[500px] md:grid-cols-2 lg:w-[640px] bg-white rounded-[2rem] shadow-2xl">
              {isLoading ? (
                <li className="col-span-2 p-4 text-center text-green/60">
                  Loading services...
                </li>
              ) : serviceItems.length > 0 ? (
                serviceItems.map((item) => (
                  <ListItem 
                    key={item._id} 
                    title={item.title} 
                    href={`/services/${item.slug.current}`} 
                  />
                ))
              ) : (
                <li className="col-span-2 p-4 text-center text-green/60">
                  No services available
                </li>
              )}
              {/* Link to all services */}
              {!isLoading && serviceItems.length > 0 && (
                <li className="col-span-2 border-t border-[#E8ECE9] pt-4 mt-2">
                  <Link
                    href="/services"
                    className="block text-center py-2 text-sm font-bold text-green hover:text-green-lite transition-colors tracking-tight"
                  >
                    View All Services →
                  </Link>
                </li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-green hover:text-green/80 font-bold text-sm tracking-tight transition-colors")} asChild>
            <Link href="/awareness-program">Awareness</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-green hover:text-green/80 font-bold text-sm tracking-tight transition-colors">Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[640px] grid-cols-2 gap-8 p-8 bg-white rounded-[2rem] shadow-2xl">

              {/* Media & Content */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-[#E8ECE9]/50 flex items-center justify-center">
                    <Newspaper className="h-4 w-4 text-[#7C9082]" />
                  </div>
                  <h4 className="text-xs font-bold text-green uppercase tracking-widest">Media</h4>
                </div>
                <ListItem as="div" title="Blogs" href="/blogs" icon={<FileText className="h-4 w-4" />}>
                  Read our latest articles.
                </ListItem>
                <ListItem as="div" title="News" href="/news" icon={<Megaphone className="h-4 w-4" />}>
                  Latest updates and announcements.
                </ListItem>
                <ListItem as="div" title="Gallery" href="/gallery" icon={<ImageIcon className="h-4 w-4" />}>
                  See our events and activities.
                </ListItem>
              </div>

              {/* Opportunities */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-[#E8ECE9]/50 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-[#7C9082]" />
                  </div>
                  <h4 className="text-xs font-bold text-green uppercase tracking-widest">Careers</h4>
                </div>
                <ListItem as="div" title="Join Our Team" href="/careers" icon={<UserPlus className="h-4 w-4" />}>
                  Explore internship and full-time roles.
                </ListItem>
                <Link href="/awareness-program" className="group block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-cream border border-transparent hover:border-green/10 mt-2">
                  <div className="flex items-center gap-2 text-sm font-bold leading-none text-green tracking-tight transition-colors">
                    <Megaphone className="h-4 w-4 text-[#7C9082]" />
                    Awareness Program
                  </div>
                </Link>
              </div>

            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-green hover:text-green/80 font-bold text-sm tracking-tight transition-colors")} asChild>
            <Link href="/contact-us">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode; as?: "li" | "div" }
>(({ className, title, children, icon, as: Wrapper = "li", ...props }, ref) => {
  return (
    <Wrapper>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-start gap-3 select-none rounded-xl p-3 leading-none no-underline outline-none transition-all hover:bg-cream hover:text-green focus:bg-cream focus:text-green group border border-transparent hover:border-green/5",
            className
          )}
          {...props}
        >
          {icon && (
            <div className="mt-0.5 shrink-0 text-gray-400 group-hover:text-green transition-colors">
              {icon}
            </div>
          )}
          <div className="space-y-1">
            <div className="text-sm font-bold leading-none group-hover:text-green transition-colors tracking-tight">
              {title}
            </div>
            {children && (
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground/80">
                {children}
              </p>
            )}
          </div>
        </a>
      </NavigationMenuLink>
    </Wrapper>
  );
});
ListItem.displayName = "ListItem";
