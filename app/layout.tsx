import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/header";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reflect - Blog and Share Thoughts",
  description:
    "Reflect is a platform to blog and share your thoughts with the world.",
  keywords: "Reflect, blog, share thoughts, writing, articles, personal blog",
  openGraph: {
    title: "Reflect - Blog and Share Thoughts",
    description:
      "Reflect is a platform to blog and share your thoughts with the world.",
    url: "https://www.reflect.com",
    type: "website",
    images: [
      {
        url: "https://www.reflect.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reflect - Blog and Share Thoughts",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${interFont.className} antialiased scroll-smooth`}>
          <div className="fixed top-0 z-[-2] h-screen w-full">
            <div className="absolute h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute h-full w-full bg-orange-50/50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,140,0,0.13)_0,rgba(255,140,0,0)_50%,rgba(255,140,0,0)_100%)]"></div>
          </div>
          <Header />

          <main className="min-h-dvh">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
