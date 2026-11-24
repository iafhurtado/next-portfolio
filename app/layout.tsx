import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Syne } from "next/font/google";
import { ThirdwebProvider } from "thirdweb/react";
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
  title: "Ivan Flores Hurtado | Product Leader & Automation Builder",
  description:
    "Product leader for enterprise logistics platforms who builds and runs multi-agent automation on n8n. Product management, developer empathy and hands-on code. Hamburg, Germany.",
  openGraph: {
    title: "Ivan Flores Hurtado | Product Leader & Automation Builder",
    description:
      "Enterprise product management · n8n and AI agents in production · Logistics · DeFi.",
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
        suppressHydrationWarning
      >
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
