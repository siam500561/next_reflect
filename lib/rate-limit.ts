import { request } from "@arcjet/next";
import { User } from "@prisma/client";
import { arcjet } from "./arcjet";

export class RateLimitError extends Error {
  constructor(
    message: string = "Rate limit exceeded. Please try again later."
  ) {
    super(message);
    this.name = "RateLimitError";
  }
}

export async function checkRateLimit(
  user: User,
  customMessage?: string
): Promise<void> {
  try {
    const req = await request();

    const decision = await arcjet.protect(req, {
      userId: user.id,
      requested: 1,
    });

    if (decision.isDenied() && decision.reason.isRateLimit()) {
      throw new RateLimitError(customMessage);
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new Error(`Rate limit check failed: ${error.message}`);
    }

    throw new Error("An unexpected error occurred while checking rate limit");
  }
}
