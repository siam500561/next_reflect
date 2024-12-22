"use server";

import { checkUser } from "@/lib/checkUser";
import { collectionSchema, CollectionSchemaType } from "@/lib/form-schema";
import { db } from "@/lib/prisma";
import { checkRateLimit, RateLimitError } from "@/lib/rate-limit";
import { Collection, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/**
 * Server action to create a new collection
 * Handles validation, rate limiting, and database operations for collection creation
 *
 * @param {CollectionSchemaType} data - The validated collection data from the form schema
 * @returns {Promise<Collection>} The created collection
 * @throws {Error} Various error types with user-friendly messages
 */
export const createCollection = async (
  data: CollectionSchemaType
): Promise<Collection> => {
  try {
    // Step 1: Validate input data using Zod schema
    const validatedData = collectionSchema.parse(data);

    // Step 2: Get authenticated user
    const user = (await checkUser()) as User;

    // Step 3: Check rate limiting to prevent abuse
    await checkRateLimit(
      user,
      "You're creating collections too quickly. Please wait a moment before trying again."
    );

    // Step 4: Create collection in database
    const collection = await db.collection
      .create({
        data: {
          name: validatedData.name,
          description: validatedData.description,
          userId: user.id,
        },
      })
      .catch(() => {
        throw new Error("Failed to create collection. Please try again");
      });

    // Step 5: Revalidate the dashboard page to show new collection
    revalidatePath("/dashboard");

    return collection;
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

export const getCollections = async () => {
  const user = (await checkUser()) as User;

  const collections = await db.collection.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return collections;
};
