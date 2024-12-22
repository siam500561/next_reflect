"use server";

import { checkUser } from "@/lib/checkUser";
import { journalSchema } from "@/lib/form-schema";
import { getMoodById } from "@/lib/mood";
import { db } from "@/lib/prisma";
import { checkRateLimit, RateLimitError } from "@/lib/rate-limit";
import { Entry } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getPixabayImages } from "./public";

/**
 * Type definition for creating a new journal entry
 * @property {string} moodId - The ID of the selected mood
 * @property {string} title - The title of the journal entry
 * @property {string} content - The main content of the journal entry
 * @property {string | null} collectionId - Optional ID of the collection this entry belongs to
 */
type CreateJournalInput = {
  moodId: string;
  title: string;
  content: string;
  collectionId: string | null;
};

/**
 * Server action to create a new journal entry
 * Handles validation, rate limiting, mood image fetching, and database operations
 *
 * @param {CreateJournalInput} input - The input data for creating a journal entry
 * @returns {Promise<Entry>} The created journal entry
 * @throws {Error} Various error types with user-friendly messages
 */
export const createJournal = async (
  input: CreateJournalInput
): Promise<Entry> => {
  try {
    // Step 1: Validate input data using Zod schema
    const validatedData = journalSchema.parse({
      title: input.title,
      content: input.content,
      mood: input.moodId,
      collectionId: input.collectionId,
    });

    // Step 2: Get authenticated user
    const user = await checkUser();

    // Step 3: Check rate limiting to prevent abuse
    await checkRateLimit(
      user,
      "You're creating journals too quickly. Please wait a moment before trying again."
    );

    // Step 4: Validate mood selection
    const mood = getMoodById(validatedData.mood);
    if (!mood) {
      throw new Error(
        "The selected mood is not valid. Please choose a different mood"
      );
    }

    // Step 5: Fetch mood-related image from Pixabay
    let moodImageUrl;
    try {
      moodImageUrl = await getPixabayImages(mood.pixabayQuery);
    } catch (error) {
      throw new Error("Unable to fetch a mood image. Please try again");
    }

    // Step 6: Create journal entry in database
    const entry = await db.entry
      .create({
        data: {
          title: validatedData.title,
          content: validatedData.content,
          userId: user.id,
          mood: mood.id,
          moodScore: mood.score,
          moodImageUrl,
          collectionId: validatedData.collectionId,
        },
      })
      .catch(() => {
        throw new Error("Failed to save your journal entry. Please try again");
      });

    // Step 7: Clean up any existing drafts
    try {
      await db.draft.deleteMany({
        where: {
          userId: user.id,
        },
      });
    } catch {
      // Non-critical error: log but continue if draft cleanup fails
      console.error(
        "Failed to delete drafts, but entry was saved successfully"
      );
    }

    // Step 8: Revalidate the dashboard page to show new entry
    revalidatePath("/dashboard");

    return entry;
  } catch (error) {
    // Handle different types of errors with appropriate messages
    if (error instanceof RateLimitError) {
      throw error; // Pass through rate limit errors with custom messages
    }
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message); // Return first validation error
    }
    if (error instanceof Error) {
      throw error; // Pass through known errors
    }
    throw new Error("Something went wrong. Please try again");
  }
};
