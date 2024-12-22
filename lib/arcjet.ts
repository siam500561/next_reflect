import aj, { tokenBucket } from "@arcjet/next";

export const arcjet = aj({
  key: process.env.ARCJET_KEY!,
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 20,
      capacity: 20,
      interval: 3600,
    }),
  ],
});
