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
      <NavigationMenuList className="gap-0.5 lg:gap-1">
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-green hover:text-green/80 font-bold text-[13px] tracking-tight transition-colors")} asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-green hover:text-green/80 font-bold text-[13px] tracking-tight transition-colors")} asChild>
            <Link href="/about-us">About Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-green hover:text-green/80 font-bold text-[13px] tracking-tight transition-colors">Services</NavigationMenuTrigger>
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
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-green hover:text-green/80 font-bold text-[13px] tracking-tight transition-colors")} asChild>
            <Link href="/awareness-program">Free Workshops</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-green hover:text-green/80 font-bold text-[13px] tracking-tight transition-colors")} asChild>
            <Link href="/blogs">Blogs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-green hover:text-green/80 font-bold text-[13px] tracking-tight transition-colors">Media</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[320px] gap-2 p-5 bg-white rounded-[2rem] shadow-2xl">
              <ListItem title="Gallery" href="/gallery" icon={<ImageIcon className="h-4 w-4" />}>
                Our events and activities.
              </ListItem>
              <ListItem title="News" href="/news" icon={<Megaphone className="h-4 w-4" />}>
                Latest updates and announcements.
              </ListItem>
              <ListItem title="Careers" href="/careers" icon={<Briefcase className="h-4 w-4" />}>
                Join our expert team.
              </ListItem>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-green hover:text-green/80 font-bold text-[13px] tracking-tight transition-colors")} asChild>
            <Link href="/contact-us">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
    </li>
  );
});
ListItem.displayName = "ListItem";
