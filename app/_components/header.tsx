"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { FolderOpenIcon, PenBoxIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="container mx-auto">
      <nav className="px-6 md:px-0 py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Reflect"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2">
          <SignedIn>
            <Link href="/dashboard#collections">
              <Button variant="outline">
                <FolderOpenIcon size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignedIn>

          <Link href="/journal/write">
            <Button>
              <PenBoxIcon size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>

          <SignedIn>
            <UserMenu />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Log in</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
