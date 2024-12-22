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
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
