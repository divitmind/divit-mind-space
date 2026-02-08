
"use client";

import * as React from "react";
import Link from "next/link";
import { Briefcase, Newspaper, Image as ImageIcon, Users, Megaphone, FileText, UserPlus, Award } from "lucide-react";

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

const aboutItems = [
  { title: "About Us", href: "#", description: "Our mission and vision." },
  { title: "Philosophy", href: "#", description: "The core values guiding our care." },
  { title: "Founders & Specialists", href: "#", description: "Meet our dedicated team." },
  { title: "Our Advisors", href: "#", description: "Guided by industry experts." },
];

const serviceItems = [
  { title: "Educational Assessments", href: "#" },
  { title: "Psychometric Assessments", href: "#" },
  { title: "PsychoEducational Assessments", href: "#" },
  { title: "Clinical Assessments", href: "#" },
  { title: "Special Education Sessions", href: "#" },
  { title: "Training & Courses", href: "#" },
];

export function MainNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-[#2F3E33] hover:text-[#2F3E33]/80")} asChild>
            <Link href="#">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-[#2F3E33] hover:text-[#2F3E33]/80">About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#FDFBF7]">
              {aboutItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-[#2F3E33] hover:text-[#2F3E33]/80">Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#FDFBF7]">
              {serviceItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-[#2F3E33] hover:text-[#2F3E33]/80")} asChild>
            <Link href="#">Contact Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-[#2F3E33] hover:text-[#2F3E33]/80")} asChild>
            <Link href="#">Blog</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-[#2F3E33] hover:text-[#2F3E33]/80">More</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-6 p-6 bg-[#FDFBF7]">

              {/* Opportunity Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-[#7C9082]" />
                  <h4 className="text-sm font-semibold text-[#2F3E33] uppercase tracking-wider">Opportunity</h4>
                </div>
                <ListItem title="Internship" href="#" icon={<UserPlus className="h-4 w-4" />}>
                  Join our internship program.
                </ListItem>
                <ListItem title="Vacancies" href="#" icon={<FileText className="h-4 w-4" />}>
                  Explore current job openings.
                </ListItem>
              </div>

              {/* Media Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <Newspaper className="h-4 w-4 text-[#7C9082]" />
                  <h4 className="text-sm font-semibold text-[#2F3E33] uppercase tracking-wider">Media</h4>
                </div>
                <ListItem title="Blogs" href="#" icon={<FileText className="h-4 w-4" />}>
                  Read our latest articles.
                </ListItem>
                <ListItem title="News" href="#" icon={<Megaphone className="h-4 w-4" />}>
                  Latest updates and announcements.
                </ListItem>
                <ListItem title="Gallery" href="#" icon={<ImageIcon className="h-4 w-4" />}>
                  See our events and activities.
                </ListItem>
              </div>

              {/* Bottom Section */}
              <div className="col-span-2 grid grid-cols-2 gap-4 border-t border-[#E8ECE9] pt-4">
                <Link href="#" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="flex items-center gap-2 text-sm font-medium leading-none group-hover:text-[#7C9082] transition-colors">
                    <Award className="h-4 w-4" />
                    Affiliations
                  </div>
                </Link>
                <Link href="#" className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="flex items-center gap-2 text-sm font-medium leading-none group-hover:text-[#7C9082] transition-colors">
                    <Megaphone className="h-4 w-4" />
                    Awareness Program
                  </div>
                </Link>
              </div>

            </div>
          </NavigationMenuContent>
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
            "flex items-start gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-[#2F3E33] focus:bg-slate-100 focus:text-accent-foreground group",
            className
          )}
          {...props}
        >
          {icon && (
            <div className="mt-0.5 shrink-0 text-gray-400 group-hover:text-[#2F3E33] transition-colors">
              {icon}
            </div>
          )}
          <div className="space-y-1.5">
            <div className="text-sm font-medium leading-none group-hover:text-[#2F3E33] transition-colors">
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
