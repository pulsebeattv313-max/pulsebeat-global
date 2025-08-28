import data from "@/data/videos.json";
import type { VideosData, VideoItem } from "./types";

export const videos = data as VideosData;

export const getAllForCategory = (cat: "celebrities"|"originals"|"culture"): VideoItem[] => {
  return videos[cat] || [];
};

export const getVideoById = (id: string): VideoItem | null => {
  const all = [...videos.celebrities, ...videos.originals, ...videos.culture];
  return all.find(v => v.id === id || v.youTubeId === id) || null;
};

export const getHeroId = () => videos.hero.youTubeId;