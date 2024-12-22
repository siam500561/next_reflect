export const getDailyPrompts = async () => {
  const response = await fetch("https://api.adviceslip.com/advice", {
    next: { revalidate: 86400 }, // 24 hours in seconds
  });

  const data = await response.json();
  return data.slip.advice;
};

export const getPixabayImages = async (query: string) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABY_API_KEY}&q=${query}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
    );
    const data = await response.json();
    return data.hits[0]?.largeImageURL || null;
  } catch (error) {
    console.error("Error fetching Pixabay images:", error);
    return null;
  }
};
