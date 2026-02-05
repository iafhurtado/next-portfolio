import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ivan Flores Hurtado | Product Leader & DeFi Builder",
  description:
    "Product Leader driving product portals and DeFi initiatives. Expert in product management, UX design, and building decentralized financial solutions. Hamburg, Germany.",
  openGraph: {
    title: "Ivan Flores Hurtado | Product Leader & DeFi Builder",
    description:
      "Product Leader · DeFi · Stablecoins · Next.js · Strategic product & team leadership.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
