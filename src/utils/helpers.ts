import { type Bar } from "../types";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const generateShuffledBars = (size: number, maxHeight = 300): Bar[] => {
  const step = Math.floor(maxHeight / size);
  const values = Array.from({ length: size }, (_, i) => step * (i + 1));
  
  // Fisher-Yates Shuffle
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  
  return values.map((v, index) => ({
    id: index, // Wichtig für flüssige Animationen
    value: v,
    color: "bg-blue-500",
  }));
};