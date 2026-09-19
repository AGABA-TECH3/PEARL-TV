export type QualityOption = '4K UHD' | '1440p QHD' | '1080p FHD' | '720p HD' | 'Auto';

export type NavTabId = 'home' | 'sports' | 'uganda' | 'cinema' | 'epg' | 'downloads' | 'personalized';

export type CameraAngle = 'Main Broadcast' | 'Tactical Overhead' | 'Player Cam (Star Cam)' | 'Endline & Drone';

export type ContentCategory = 'sports' | 'uganda' | 'movies' | 'series' | 'news' | 'documentary';

export interface ChannelProgram {
  id: string;
  title: string;
  startTime: string; // e.g. "20:00"
  endTime: string;   // e.g. "21:00"
  description: string;
  category: string;
  language: string;
  isLiveNow?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  category: 'uganda' | 'sports' | 'news' | 'entertainment';
  logo: string;
  banner: string;
  streamUrl: string;
  resolution: string; // e.g., "4K UHD 60fps" or "1080p60"
  currentProgram: string;
  currentProgramDesc: string;
  language: string; // e.g., "Luganda & English"
  country: string; // e.g., "Uganda"
  frequency?: string;
  epg: ChannelProgram[];
  isLive: boolean;
  viewersCount: string;
}

export interface MediaItem {
  id: string;
  title: string;
  subtitle?: string;
  category: ContentCategory;
  description: string;
  thumbnail: string;
  backdrop: string;
  videoUrl: string;
  duration: string;
  rating: string;
  year: number;
  matchScore: number;
  is4K: boolean;
  isHDR: boolean;
  isDolbyAtmos: boolean;
  isLive?: boolean;
  language: string;
  tags: string[];
  genre: string;
  sportsData?: {
    league: string;
    teams: { home: string; away: string; homeScore?: number; awayScore?: number };
    timeOrStatus: string;
    venue: string;
    availableAngles: CameraAngle[];
    audioTracks: { id: string; label: string; lang: string }[];
  };
}

export interface DownloadItem {
  id: string;
  mediaId: string;
  title: string;
  thumbnail: string;
  quality: QualityOption;
  sizeGb: number;
  progress: number; // 0 - 100
  status: 'downloading' | 'completed' | 'paused' | 'failed';
  downloadSpeedMbps: number;
  category: ContentCategory;
  duration: string;
  dateDownloaded: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  category: ContentCategory;
  matchScore: number;
  reason: string;
  badge: string;
  duration: string;
  rating: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  favoriteTeam: string;
  favoriteChannels: string[];
  preferredLanguage: string;
  offlineDownloadsCount: number;
}
