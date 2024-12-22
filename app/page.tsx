import { Suspense } from "react";
import { UserCheck } from "./_components/auth/user-check";
import { FAQ } from "./_components/landing/faq";
import { Features } from "./_components/landing/features";
import { Hero } from "./_components/landing/hero";
import { MoodAnalytics } from "./_components/landing/mood-analytics";
import { Testimonials } from "./_components/landing/testimonials";
import { TextEditor } from "./_components/landing/text-editor";

export default async function Home() {
  return (
    <>
      <Suspense>
        <UserCheck />
      </Suspense>
      <div className="relative container mx-auto px-4 py-16">
        <Hero />
        <Features />
        <div className="mt-24 space-y-24">
          <TextEditor />
          <MoodAnalytics />
          <Testimonials />
          <FAQ />
        </div>
      </div>
      <footer className="flex items-center justify-center px-4 py-8 md:py-16 bg-orange-50 rounded-t-2xl shadow-inner shadow-orange-500/20">
        <p className="text-orange-900 text-sm">
          Build with <span className="animate-pulse">❤️</span> by Siam
        </p>
      </footer>
    </>
  );
}
