export type VideoItem = {
  id?: string;
  title: string;
  youTubeId: string;
  tags?: string[];
  description?: string;
};

export type VideosData = {
  hero: { youTubeId: string; title: string; description?: string };
  celebrities: VideoItem[];
  originals: VideoItem[];
  culture: VideoItem[];
};