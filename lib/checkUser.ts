import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

type CheckUserInput = {
  isForServerAction?: boolean;
};

export const checkUser = async ({
  isForServerAction = true,
}: CheckUserInput = {}) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const dbUser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (isForServerAction) {
    if (!dbUser) {
      throw new Error(
        "Unable to find your user account. Please try signing out and back in"
      );
    }

    return dbUser;
  }

  if (!dbUser) {
    return db.user.create({
      data: {
        clerkId: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });
  }

  return dbUser;
};
