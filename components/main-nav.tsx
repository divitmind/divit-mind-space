"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  FileText, 
  Heart, 
  Users, 
  GraduationCap, 
  Activity, 
  MapPin, 
  Stethoscope, 
  BookOpen, 
  Megaphone, 
  Image as ImageIcon,
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services-data";

const navServices = services.slice(0, 6);

const serviceCategories = [
  { id: "assessments", label: "Assessments", href: "/services?category=assessments", icon: FileText },
  { id: "therapy", label: "Therapy", href: "/services?category=therapy", icon: Heart },
  { id: "guidance", label: "Counselling", href: "/services?category=guidance", icon: Users },
  { id: "programs", label: "Programs", href: "/services?category=programs", icon: GraduationCap },
  { id: "physiotherapy", label: "Physiotherapy", href: "/services?category=physiotherapy", icon: Activity },
];

export function MainNav() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="hidden lg:flex items-center gap-1 relative h-20" onMouseLeave={handleMouseLeave}>
      <NavLink href="/" onClick={handleHomeClick} active={pathname === "/"}>Home</NavLink>

      <div className="relative h-full flex items-center">
        <NavTrigger 
          label="Services" 
          active={activeMenu === "services"} 
          onMouseEnter={() => handleMouseEnter("services")}
        />
        <AnimatePresence>
          {activeMenu === "services" && (
            <DropdownContainer onMouseEnter={() => handleMouseEnter("services")} align="left">
              <div className="w-[600px] p-6">
                {/* Category Links */}
                <div className="grid grid-cols-5 gap-3 mb-6">
                  {serviceCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={cat.href}
                      onClick={() => setActiveMenu(null)}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-black/5 hover:border-black/10 hover:bg-black/[0.04] transition-all group"
                    >
                      <cat.icon className="w-5 h-5 text-black/30 group-hover:text-green group-hover:scale-110 transition-all" />
                      <span className="text-[10px] font-bold text-black/50 group-hover:text-green transition-colors tracking-wide">
                        {cat.label}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Individual Services */}
                <ul className="grid gap-4 grid-cols-3 border-t border-black/5 pt-6 list-none">
                  {navServices.map((service) => (
                    <ListItem
                      key={service.id}
                      title={service.title}
                      href={`/services/${service.slug}`}
                      onClick={() => setActiveMenu(null)}
                    />
                  ))}
                </ul>

                <div className="border-t border-black/5 pt-4 mt-4">
                  <Link
                    href="/services"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-2 text-[10px] font-bold text-green hover:gap-4 transition-all tracking-[0.2em] uppercase w-full justify-center"
                  >
                    Explore All Services
                    <ChevronDown className="w-3 h-3 -rotate-90" />
                  </Link>
                </div>
              </div>
            </DropdownContainer>
          )}
        </AnimatePresence>
      </div>

      <NavLink href="/about-us" active={pathname === "/about-us"}>About Us</NavLink>
      <NavLink href="/awareness-program" active={pathname === "/awareness-program"}>Workshops</NavLink>

      <div className="relative h-full flex items-center">
        <NavTrigger 
          label="Explore" 
          active={activeMenu === "explore"} 
          onMouseEnter={() => handleMouseEnter("explore")}
        />
        <AnimatePresence>
          {activeMenu === "explore" && (
            <DropdownContainer onMouseEnter={() => handleMouseEnter("explore")}>
              <ul className="w-[320px] p-6 space-y-2 list-none">
                <ListItem title="Our Specialists" href="/specialists" icon={<Stethoscope className="h-4 w-4" />} onClick={() => setActiveMenu(null)}>
                  Meet the Team
                </ListItem>
                <ListItem title="Conditions We Support" href="/conditions" icon={<Heart className="h-4 w-4" />} onClick={() => setActiveMenu(null)}>
                  Autism, ADHD, LD, Pain & More
                </ListItem>
                <ListItem title="Near Me" href="/near-me" icon={<MapPin className="h-4 w-4" />} onClick={() => setActiveMenu(null)}>
                  Locations Across Bangalore
                </ListItem>
                <ListItem title="Blogs" href="/blogs" icon={<BookOpen className="h-4 w-4" />} onClick={() => setActiveMenu(null)}>
                  Expert Insights
                </ListItem>
                <ListItem title="Mind Gym" href="/mind-gym" icon={<Brain className="h-4 w-4" />} onClick={() => setActiveMenu(null)}>
                  Brain Training
                </ListItem>
              </ul>
            </DropdownContainer>
          )}
        </AnimatePresence>
      </div>

      <div className="relative h-full flex items-center">
        <NavTrigger 
          label="Media" 
          active={activeMenu === "media"} 
          onMouseEnter={() => handleMouseEnter("media")}
        />
        <AnimatePresence>
          {activeMenu === "media" && (
            <DropdownContainer onMouseEnter={() => handleMouseEnter("media")}>
              <ul className="w-[280px] p-6 space-y-2 list-none">
                <ListItem title="News" href="/news" icon={<Megaphone className="h-4 w-4" />} onClick={() => setActiveMenu(null)}>
                  Announcements
                </ListItem>
                <ListItem title="Gallery" href="/gallery" icon={<ImageIcon className="h-4 w-4" />} onClick={() => setActiveMenu(null)}>
                  Our Moments
                </ListItem>
              </ul>
            </DropdownContainer>
          )}
        </AnimatePresence>
      </div>

      <NavLink href="/contact-us" active={pathname === "/contact-us"}>Contact Us</NavLink>
      <NavLink href="/careers" active={pathname === "/careers"}>Careers</NavLink>
    </nav>
  );
}

function NavLink({ href, children, onClick, active }: { href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; active?: boolean }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={cn(
        "px-2 xl:px-4 h-10 flex items-center text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-full hover:text-green",
        active ? "text-green" : "text-black/40"
      )}
    >
      {children}
    </Link>
  );
}

function NavTrigger({ label, active, onMouseEnter }: { label: string; active: boolean; onMouseEnter: () => void }) {
  return (
    <button 
      onMouseEnter={onMouseEnter}
      className={cn(
        "px-2 xl:px-4 h-10 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-full hover:text-green outline-none",
        active ? "text-green" : "text-black/40"
      )}
    >
      {label}
      <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", active && "rotate-180")} />
    </button>
  );
}

function DropdownContainer({ children, onMouseEnter, align = "center" }: { children: React.ReactNode; onMouseEnter: () => void; align?: "center" | "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={onMouseEnter}
      className={cn(
        "absolute top-[calc(100%-10px)] z-50 pt-2",
        align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
      )}
    >
      <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] border border-black/5 overflow-hidden backdrop-blur-xl">
        {children}
      </div>
    </motion.div>
  );
}

function ListItem({ title, href, children, icon, onClick }: { title: string; href: string; children?: React.ReactNode; icon?: React.ReactNode; onClick: () => void }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-start gap-4 select-none rounded-[1.5rem] p-4 leading-none no-underline outline-none transition-all hover:bg-black/[0.04] hover:text-green group border border-transparent hover:border-black/5"
      >
        {icon && (
          <div className="mt-0.5 shrink-0 text-black/20 group-hover:text-green transition-colors">
            {icon}
          </div>
        )}
        <div className="space-y-1.5">
          <div className="text-[13px] font-bold leading-tight group-hover:text-green transition-colors tracking-tight">
            {title}
          </div>
          {children && (
            <p className="line-clamp-1 text-[11px] font-medium leading-relaxed text-black/40 group-hover:text-green/60 tracking-normal">
              {children}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
