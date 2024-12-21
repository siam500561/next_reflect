"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const faqs = [
  {
    q: "Is my journal data secure?",
    a: "Yes! We use enterprise-grade encryption and security measures to ensure your entries remain private and secure.",
  },
  {
    q: "Can I organize my journal entries?",
    a: "Yes! Use folders, collections, and tags to keep your entries structured. You can also filter by date, mood, or collection.",
  },
  {
    q: "How does the mood tracking work?",
    a: "Each entry can be tagged with a mood, and our analytics tool creates visual representations of your emotional journey over time.",
  },
  {
    q: "Is there a mobile app?",
    a: "Our platform is fully responsive and works beautifully on all devices. A dedicated mobile app is coming soon!",
  },
];

export function FAQ() {
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
          Frequently Asked Questions
        </motion.h2>
        <motion.p className="text-orange-700" variants={fadeInUp}>
          Everything you need to know about our journaling platform
        </motion.p>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              custom={index}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-orange-900 text-base hover:text-orange-700 transition-all duration-200">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-orange-800">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </motion.section>
  );
}
