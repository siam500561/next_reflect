import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="flex flex-col items-center text-center space-y-5">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full" />
          <AlertTriangle className="relative w-20 h-20 text-orange-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold sm:text-5xl">Page not found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
