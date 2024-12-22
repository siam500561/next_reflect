import { z } from "zod";

export const journalSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be less than 255 characters" }),
  content: z
    .string()
    .trim()
    .min(1, { message: "Content is required" })
    .max(10000, { message: "Content must be less than 10,000 characters" }),
  mood: z.string().trim().min(1, { message: "Mood is required" }),
  collectionId: z.string().trim().nullable().optional().catch(null),
});

export const collectionSchema = z.object({
  name: z
    .string()
    .min(1, "Collection name is required")
    .max(50, "Collection name cannot exceed 50 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

export type JournalSchemaType = z.infer<typeof journalSchema>;
export type CollectionSchemaType = z.infer<typeof collectionSchema>;
