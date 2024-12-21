import { getDailyPrompts } from "@/actions/public";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function DailyPromptSkeleton() {
  return <Skeleton className="h-2 w-20" />;
}

async function DailyPrompt() {
  const prompt = await getDailyPrompts();
  return <div className="text-orange-900">{prompt}</div>;
}

export function Hero() {
  return (
    <div className="max-w-6xl mx-auto text-center space-y-8">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 tracking-tight text-transparent bg-clip-text">
        Your Space to Reflect. {"\n"} Your Life to Tell.
      </h1>

      <p className="text-lg md:text-xl text-orange-800 mb-8">
        Capture your thoughts, track your moods, and reflect on your journey in
        a beautiful, secure space.
      </p>

      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-orange-50/50 to-transparent pointer-events-none" />
        <div className="bg-white rounded-2xl py-4 mx-auto hover:-translate-y-1 transition-transform">
          <div className="border-b border-orange-100 pb-4 mb-4 flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="size-4 text-orange-600" />
              <span className="text-sm text-orange-600">
                Today&apos;s Entry
              </span>
            </div>

            <div className="flex gap-1">
              <div className="size-2 rounded-full bg-orange-200" />
              <div className="size-2 rounded-full bg-orange-300" />
              <div className="size-2 rounded-full bg-orange-400" />
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4">
            <Suspense fallback={<DailyPromptSkeleton />}>
              <DailyPrompt />
            </Suspense>
            <div className="h-4 bg-orange-100 rounded w-3/4" />
            <div className="h-4 bg-orange-100 rounded w-5/6" />
            <div className="h-4 bg-orange-100 rounded w-2/3" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <Link href="/journal">
          <Button className="px-8 py-6 rounded-full">
            <span>Start Writing</span>
            <ChevronRight className="size-5" />
          </Button>
        </Link>
        <Link href="#features">
          <Button
            className="px-8 py-6 rounded-full border-orange-600 text-orange-600 hover:bg-orange-50/50 hover:text-orange-600"
            variant={"outline"}
          >
            <span>Learn More</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
