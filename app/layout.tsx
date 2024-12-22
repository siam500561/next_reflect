import Providers from "@/providers/providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Header from "./_components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reflect Blog",
  description: "A personal journal and blog application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Header />
          <Providers>{children}</Providers>
          <div className="flex items-center justify-center px-4 py-8 md:py-16 bg-orange-50 rounded-t-2xl shadow-inner shadow-orange-500/20">
            <p className="text-orange-900 text-sm">
              Build with <span className="animate-pulse">❤️</span> by Siam
            </p>
          </div>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
