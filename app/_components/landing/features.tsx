import { Card, CardContent } from "@/components/ui/card";
import { Book, Lock, Sparkles } from "lucide-react";
import React from "react";

const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="mt-20 pt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {features.map((feature) => (
        <Card key={feature.title} className="shadow-lg">
          <CardContent className="p-6">
            <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <div className="size-6 text-orange-600">
                {React.createElement(feature.icon)}
              </div>
            </div>
            <h3 className="text-orange-900 font-medium mb-2">
              {feature.title}
            </h3>
            <p className="text-orange-700">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
