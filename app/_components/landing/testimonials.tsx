"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const testimonials = [
  {
    text: "This journal has become an essential part of my daily routine. The mood tracking feature is incredibly insightful.",
    author: "Sarah K.",
    role: "Daily Writer",
  },
  {
    text: "The daily prompts have helped me overcome writer's block countless times. Absolutely love this platform!",
    author: "Michael R.",
    role: "Creative Writer",
  },
  {
    text: "Clean, intuitive, and secure. Everything I need in a digital journal. The export feature is a game-changer.",
    author: "Emily T.",
    role: "Professional Blogger",
  },
  {
    text: "The mood analytics have helped me understand my emotional patterns. It's like having a therapist in my pocket.",
    author: "David L.",
    role: "Mental Health Advocate",
  },
  {
    text: "I've tried many journaling apps, but this one's attention to privacy and security sets it apart.",
    author: "Rachel M.",
    role: "Privacy Conscious Writer",
  },
];

export function Testimonials() {
  return (
    <motion.section
      className="mt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl font-bold text-orange-900 mb-4"
          variants={fadeInUp}
        >
          What Our Users Say
        </motion.h2>
        <motion.p className="text-orange-700" variants={fadeInUp}>
          Join thousands of satisfied writers who have made journaling a daily
          habit
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div>
                  <Card className="p-4 h-full">
                    <div className="flex flex-col h-full">
                      <motion.div
                        className="mb-2"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Quote className="size-6 text-orange-500 rotate-180" />
                      </motion.div>
                      <blockquote className="flex-grow">
                        <p className="text-orange-800 mb-2 text-sm">
                          {testimonial.text}
                        </p>
                      </blockquote>
                      <footer>
                        <motion.div
                          className="border-t border-orange-100 pt-2 mt-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.2 + index * 0.1,
                          }}
                        >
                          <cite className="not-italic">
                            <div className="font-semibold text-orange-900 text-sm">
                              {testimonial.author}
                            </div>
                            <div className="text-orange-600 text-xs">
                              {testimonial.role}
                            </div>
                          </cite>
                        </motion.div>
                      </footer>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </motion.div>
    </motion.section>
  );
}
