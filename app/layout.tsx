import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divit MindSpace | Neurodivergent Care & Education",
  description: "Divit MindSpace operates at the intersection of healthcare and special education, offering diagnostic assessments, customized teaching, and training for adults.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-[#FAF9F5] antialiased`}
      >
        <SiteHeader />
        <SanityLive />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
