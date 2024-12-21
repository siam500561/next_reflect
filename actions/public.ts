import { unstable_cacheLife } from "next/cache";

export const getDailyPrompts = async () => {
  "use cache";
  unstable_cacheLife("days");
  const response = await fetch("https://api.adviceslip.com/advice", {
    cache: "no-store",
  });

  const data = await response.json();
  return data.slip.advice;
};
