import { FAQ } from "./_components/landing/faq";
import { Features } from "./_components/landing/features";
import { Hero } from "./_components/landing/hero";
import { MoodAnalytics } from "./_components/landing/mood-analytics";
import { Testimonials } from "./_components/landing/testimonials";
import { TextEditor } from "./_components/landing/text-editor";

export default function Home() {
  return (
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
  );
}
