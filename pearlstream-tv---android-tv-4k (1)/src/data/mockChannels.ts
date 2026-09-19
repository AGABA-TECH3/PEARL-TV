import { Channel, MediaItem, DownloadItem } from '../types';

// Sample reliable royalty-free video URLs for 4K / HD demonstration
export const SAMPLE_VIDEOS = {
  nature4k: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  footballLive: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  ugandaNews: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  techDocumentary: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
  cityNight: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  sportsHighlights: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
};

export const UGANDAN_CHANNELS: Channel[] = [
  {
    id: 'ug-nbs',
    name: 'NBS Television',
    category: 'uganda',
    logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.ugandaNews,
    resolution: '4K UHD 60fps (HEVC)',
    currentProgram: 'NBS Live At 9 - Prime Bulletin',
    currentProgramDesc: 'Comprehensive investigative national and international news coverage from Media Plaza Kampala, with live reports from Jinja, Mbarara, and Gulu.',
    language: 'English & Luganda',
    country: 'Uganda',
    frequency: 'Ch 21 / DTT Kampala',
    isLive: true,
    viewersCount: '1.4M watching',
    epg: [
      { id: 'p1', title: 'Morning Breeze with Simon Kaggwa', startTime: '06:00', endTime: '09:00', description: 'Hard hitting morning political talkshow and newspaper review.', category: 'Current Affairs', language: 'English' },
      { id: 'p2', title: 'NBS Sunset Bulletin', startTime: '18:00', endTime: '19:00', description: 'Early evening breaking stories and regional updates.', category: 'News', language: 'Luganda' },
      { id: 'p3', title: 'NBS Live At 9', startTime: '21:00', endTime: '22:00', description: 'Prime flagship news cast with in-depth analysis.', category: 'News', language: 'English', isLiveNow: true },
      { id: 'p4', title: 'Barometer Debate', startTime: '22:00', endTime: '23:30', description: 'Uganda top political analysts and MPs debate national policies.', category: 'Politics', language: 'Luganda' }
    ]
  },
  {
    id: 'ug-ntv',
    name: 'NTV Uganda',
    category: 'uganda',
    logo: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.cityNight,
    resolution: '1080p60 FHD',
    currentProgram: 'NTV Tonight with Frank Walusimbi',
    currentProgramDesc: 'Uganda premier evening news broadcast presenting unbiased stories from across the nation and East African Community.',
    language: 'English',
    country: 'Uganda',
    frequency: 'Ch 18 / Serena Kampala',
    isLive: true,
    viewersCount: '1.1M watching',
    epg: [
      { id: 'ntv-1', title: 'NTV The Beat', startTime: '17:00', endTime: '18:30', description: 'Ugandan celebrity interviews, Afrobeats & East African music premieres.', category: 'Entertainment', language: 'English' },
      { id: 'ntv-2', title: 'Akawungeezi', startTime: '19:00', endTime: '20:00', description: 'Uganda top Luganda news program with cultural richness.', category: 'News', language: 'Luganda' },
      { id: 'ntv-3', title: 'NTV Tonight', startTime: '21:00', endTime: '22:00', description: 'Comprehensive English night news bulletin.', category: 'News', language: 'English', isLiveNow: true },
      { id: 'ntv-4', title: 'Point Blank & Tuwaye', startTime: '22:00', endTime: '23:00', description: 'Humorous highlights of the week and inspiring life stories.', category: 'Documentary', language: 'Luganda' }
    ]
  },
  {
    id: 'ug-bukedde1',
    name: 'Bukedde TV 1',
    category: 'uganda',
    logo: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.techDocumentary,
    resolution: '1080p60 FHD',
    currentProgram: 'Agataliiko Nfuufu',
    currentProgramDesc: 'Uganda most watched Luganda prime-time bulletin capturing street events, local disputes, heroic deeds, and cultural events.',
    language: 'Luganda',
    country: 'Uganda',
    frequency: 'Ch 24 / Vision Group',
    isLive: true,
    viewersCount: '1.8M watching',
    epg: [
      { id: 'buk-1', title: 'Emikolo n’Embaga', startTime: '16:00', endTime: '17:30', description: 'Traditional introduction ceremonies (Kwanjula) and wedding highlights.', category: 'Culture', language: 'Luganda' },
      { id: 'buk-2', title: 'Omuntu w’Abantu', startTime: '19:30', endTime: '20:30', description: 'Real stories of Ugandan heroes, artisans and innovators.', category: 'Feature', language: 'Luganda' },
      { id: 'buk-3', title: 'Agataliiko Nfuufu', startTime: '21:00', endTime: '22:00', description: 'Sensational and deeply rooted Luganda news cast.', category: 'News', language: 'Luganda', isLiveNow: true },
      { id: 'buk-4', title: 'KinaUganda Movie Special', startTime: '22:00', endTime: '00:00', description: 'Local Ugandan action and drama film translated by famous VJ Junior.', category: 'Drama', language: 'Luganda' }
    ]
  },
  {
    id: 'ug-ubc',
    name: 'UBC TV',
    category: 'uganda',
    logo: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.sportsHighlights,
    resolution: '1080p60 FHD',
    currentProgram: 'Uganda National Parliament Live',
    currentProgramDesc: 'Official parliamentary proceedings, national address by the President, and civic educational affairs.',
    language: 'English & Swahili',
    country: 'Uganda',
    frequency: 'Ch 01 / Nile Avenue',
    isLive: true,
    viewersCount: '780K watching',
    epg: [
      { id: 'ubc-1', title: 'Voice of Agriculture (Kilimo)', startTime: '18:00', endTime: '19:00', description: 'Modern farming innovations in Coffee, Vanilla, and Matooke.', category: 'Agriculture', language: 'Luganda' },
      { id: 'ubc-2', title: 'National Parliament Proceedings', startTime: '20:00', endTime: '22:00', description: 'Direct live stream from Parliament of Uganda.', category: 'State', language: 'English', isLiveNow: true },
      { id: 'ubc-3', title: 'UBC Star News', startTime: '22:00', endTime: '23:00', description: 'National government initiatives and international diplomacy.', category: 'News', language: 'English' }
    ]
  },
  {
    id: 'ug-spark',
    name: 'Spark TV',
    category: 'uganda',
    logo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.footballLive,
    resolution: '1080p60 FHD',
    currentProgram: 'Live Wire Celebrity Scoop',
    currentProgramDesc: 'High-energy entertainment gossip, celebrity red carpets, Ugandan fashion, and music charts.',
    language: 'Luganda & Slang',
    country: 'Uganda',
    frequency: 'Ch 19 / Kampala',
    isLive: true,
    viewersCount: '920K watching',
    epg: [
      { id: 'sp-1', title: 'Koona Ne Miles', startTime: '19:30', endTime: '21:00', description: 'Live acoustic music performances and trending dance challenges.', category: 'Music', language: 'Luganda' },
      { id: 'sp-2', title: 'Live Wire Special', startTime: '21:00', endTime: '22:15', description: 'The biggest entertainment countdown and spicy showbiz news.', category: 'Showbiz', language: 'Luganda', isLiveNow: true }
    ]
  },
  {
    id: 'ug-bbs',
    name: 'BBS Terefayina',
    category: 'uganda',
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.nature4k,
    resolution: '1080p60 FHD',
    currentProgram: 'Ku Mbazzi - Buganda Cultural Heritage',
    currentProgramDesc: 'Bulungi Bwansi, Buganda Kingdom Royal Court at Bulange Mengo, cultural customs, clan histories, and development forums.',
    language: 'Luganda',
    country: 'Uganda (Buganda)',
    frequency: 'Ch 27 / Bulange Mengo',
    isLive: true,
    viewersCount: '850K watching',
    epg: [
      { id: 'bbs-1', title: 'Olutindo Lw’abavubuka', startTime: '18:00', endTime: '19:30', description: 'Youth economic empowerment in agriculture and artisan crafts.', category: 'Education', language: 'Luganda' },
      { id: 'bbs-2', title: 'Ku Mbazzi', startTime: '20:00', endTime: '21:30', description: 'Historic Kingdom archival footages, Masaza Cup preview.', category: 'Culture', language: 'Luganda', isLiveNow: true }
    ]
  },
  {
    id: 'ug-sanyuka',
    name: 'Sanyuka TV',
    category: 'uganda',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.sportsHighlights,
    resolution: '4K UHD 60fps',
    currentProgram: 'StarTimes Uganda Premier League Live',
    currentProgramDesc: 'Exclusive live broadcast of Ugandan football league matches, in-depth pitchside Luganda commentary, and tactical breakdowns.',
    language: 'Luganda & English',
    country: 'Uganda',
    frequency: 'Ch 23 / Naguru',
    isLive: true,
    viewersCount: '1.2M watching',
    epg: [
      { id: 'san-1', title: 'Morning Express', startTime: '07:00', endTime: '10:00', description: 'Kampala morning traffic, local jokes and community updates.', category: 'Lifestyle', language: 'Luganda' },
      { id: 'san-2', title: 'UPL Super Matchday', startTime: '16:00', endTime: '18:30', description: 'Live Ugandan football action with fan interviews.', category: 'Sports', language: 'Luganda', isLiveNow: true }
    ]
  }
];

export const SPORTS_CHANNELS: Channel[] = [
  {
    id: 'sp-premier4k',
    name: 'SuperSport Premier League 4K',
    category: 'sports',
    logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.footballLive,
    resolution: '4K UHD 60fps HDR10+',
    currentProgram: 'Premier League: Arsenal vs Manchester City',
    currentProgramDesc: 'Live 4K Ultra HD coverage from Emirates Stadium. Super Sunday title-decider featuring multi-camera feeds and dual Luganda/English audio.',
    language: 'English, Luganda & Swahili',
    country: 'United Kingdom / Global',
    isLive: true,
    viewersCount: '3.6M watching',
    epg: [
      { id: 'epl-1', title: 'Super Sunday Pre-Match Studio', startTime: '17:00', endTime: '18:25', description: 'Tactical analysis with Thierry Henry and Roy Keane.', category: 'Sports', language: 'English' },
      { id: 'epl-2', title: 'Arsenal vs Manchester City', startTime: '18:30', endTime: '20:30', description: 'Live clash of the titans with 4K 60fps HDR stream.', category: 'Sports', language: 'English & Luganda', isLiveNow: true },
      { id: 'epl-3', title: 'Post Match Verdict & Highlights', startTime: '20:30', endTime: '21:30', description: 'Manager press conferences and VAR reviews.', category: 'Sports', language: 'English' }
    ]
  },
  {
    id: 'sp-ucl4k',
    name: 'SuperSport Champions League 4K',
    category: 'sports',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.nature4k,
    resolution: '4K UHD 60fps Dolby Vision',
    currentProgram: 'UEFA Champions League: Real Madrid vs Bayern Munich',
    currentProgramDesc: 'Semi-final 2nd leg from Santiago Bernabéu in Dolby Atmos 5.1 spatial audio.',
    language: 'English & Spanish',
    country: 'Europe / Global',
    isLive: true,
    viewersCount: '4.2M watching',
    epg: [
      { id: 'ucl-1', title: 'Champions League Countdown', startTime: '20:00', endTime: '21:45', description: 'Bernabéu atmosphere buildup and tactical formations.', category: 'Sports', language: 'English' },
      { id: 'ucl-2', title: 'Real Madrid vs Bayern Munich', startTime: '22:00', endTime: '00:00', description: 'Thrilling European cup knockout football.', category: 'Sports', language: 'English', isLiveNow: true }
    ]
  },
  {
    id: 'sp-nba4k',
    name: 'NBA TV 4K Court-Side',
    category: 'sports',
    logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.cityNight,
    resolution: '4K UHD 60fps HDR',
    currentProgram: 'NBA Finals: Boston Celtics vs Dallas Mavericks',
    currentProgramDesc: 'Championship Game 5 live from TD Garden, immersive rim microphones and slow-motion replays.',
    language: 'English',
    country: 'USA / Global',
    isLive: true,
    viewersCount: '2.1M watching',
    epg: [
      { id: 'nba-1', title: 'NBA Finals Game 5 Live', startTime: '03:00', endTime: '05:30', description: 'Tatum & Brown vs Doncic & Irving for the Larry O’Brien trophy.', category: 'Sports', language: 'English', isLiveNow: true }
    ]
  },
  {
    id: 'sp-athletics4k',
    name: 'World Athletics & Marathon 4K',
    category: 'sports',
    logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.nature4k,
    resolution: '4K UHD 60fps HDR',
    currentProgram: 'Men’s 10,000m: Joshua Cheptegei & Jacob Kiplimo',
    currentProgramDesc: 'Ugandan Olympic and World Champions battle in an electrifying world record attempt with biometric telemetry and drone cameras.',
    language: 'English & Luganda',
    country: 'Uganda / Global',
    isLive: true,
    viewersCount: '2.8M watching',
    epg: [
      { id: 'ath-1', title: 'Ugandan Running Giants: Cheptegei Story', startTime: '18:00', endTime: '19:00', description: 'Journey from Kapchorwa highland training camps to Olympic gold.', category: 'Documentary', language: 'English' },
      { id: 'ath-2', title: 'Men’s 10,000m Final Live', startTime: '19:15', endTime: '20:00', description: 'Live track race with Uganda cheering from Kampala to Mbale.', category: 'Sports', language: 'English & Luganda', isLiveNow: true }
    ]
  },
  {
    id: 'sp-upl',
    name: 'NBS Sport / UPL Uganda',
    category: 'sports',
    logo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=160&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1489944445391-11dd35574549?w=800&auto=format&fit=crop&q=80',
    streamUrl: SAMPLE_VIDEOS.footballLive,
    resolution: '4K UHD 60fps',
    currentProgram: 'Uganda Premier League: KCCA FC vs Vipers SC',
    currentProgramDesc: 'Kampala City derby live from Lugogo MTN Omondi Stadium. Enthusiastic stadium crowd and legendary Luganda commentary.',
    language: 'Luganda & English',
    country: 'Uganda',
    isLive: true,
    viewersCount: '1.5M watching',
    epg: [
      { id: 'upl-1', title: 'Kasasiro Boys vs The Venoms', startTime: '16:00', endTime: '18:00', description: 'High stakes Uganda Premier League clash.', category: 'Sports', language: 'Luganda', isLiveNow: true }
    ]
  }
];

export const FEATURED_HERO: MediaItem = {
  id: 'hero-arsenal-mancity',
  title: 'Arsenal vs Manchester City',
  subtitle: 'Premier League Super Sunday • 4K UHD 60fps HDR',
  category: 'sports',
  description: 'The definitive clash of the Premier League season live from the Emirates Stadium. Streamed in pristine 4K 60fps with Dolby Atmos audio and interactive multi-angle camera feeds. Toggle between English and native Luganda broadcast commentary.',
  thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
  backdrop: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&auto=format&fit=crop&q=80',
  videoUrl: SAMPLE_VIDEOS.footballLive,
  duration: 'Live • 64th Min',
  rating: '9.9 Match Rating',
  year: 2026,
  matchScore: 99,
  is4K: true,
  isHDR: true,
  isDolbyAtmos: true,
  isLive: true,
  language: 'Luganda & English',
  tags: ['Live 4K', 'Premier League', 'Multi-Angle', 'Luganda Audio', 'HDR10+'],
  genre: 'Live Sports',
  sportsData: {
    league: 'Barclays Premier League',
    teams: { home: 'Arsenal', away: 'Manchester City', homeScore: 2, awayScore: 1 },
    timeOrStatus: "64' (2nd Half)",
    venue: 'Emirates Stadium, London (60,704 fans)',
    availableAngles: ['Main Broadcast', 'Tactical Overhead', 'Player Cam (Star Cam)', 'Endline & Drone'],
    audioTracks: [
      { id: 'en', label: 'English (Peter Drury & Neville)', lang: 'en' },
      { id: 'lg', label: 'Luganda (Katende & Peace - Uganda Feed)', lang: 'lg' },
      { id: 'sw', label: 'Swahili (East Africa Sports Feed)', lang: 'sw' },
      { id: 'stadium', label: 'Stadium Ambient Atmosphere (Atmos 5.1)', lang: 'ambient' }
    ]
  }
};

export const CINEMA_4K_ITEMS: MediaItem[] = [
  {
    id: 'mov-queen-katwe',
    title: 'Queen of Katwe (4K Remastered)',
    subtitle: 'True Inspirational Drama • 4K HDR',
    category: 'movies',
    description: 'The heartwarming true story of Phiona Mutesi from the slums of Katwe in Kampala, Uganda, who becomes an international chess champion under the mentorship of Robert Katende.',
    thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    videoUrl: SAMPLE_VIDEOS.nature4k,
    duration: '2h 04m',
    rating: '9.6/10',
    year: 2024,
    matchScore: 98,
    is4K: true,
    isHDR: true,
    isDolbyAtmos: true,
    language: 'English & Luganda',
    tags: ['4K UHD', 'Uganda Story', 'Dolby Vision', 'Award Winner'],
    genre: 'Biographical Drama'
  },
  {
    id: 'mov-pearl-wildlife',
    title: 'Rwenzori: Mountains of the Moon 4K',
    subtitle: 'National Geographic Wildlife 4K IMAX',
    category: 'documentary',
    description: 'An expedition through Uganda’s Rwenzori mountain ranges, glacier peaks, mountain gorillas of Bwindi Impenetrable Forest, and the roaring Murchison Falls.',
    thumbnail: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&auto=format&fit=crop&q=80',
    videoUrl: SAMPLE_VIDEOS.techDocumentary,
    duration: '1h 38m',
    rating: '9.8/10',
    year: 2025,
    matchScore: 95,
    is4K: true,
    isHDR: true,
    isDolbyAtmos: true,
    language: 'English & Luganda narration',
    tags: ['4K UHD', 'Uganda Nature', 'Gorilla Trekking', 'HDR10+'],
    genre: 'Documentary'
  },
  {
    id: 'mov-boda-kampala',
    title: 'Boda Boda: Kampala After Dark',
    subtitle: 'Action Thriller • 4K UHD',
    category: 'movies',
    description: 'A neon-lit urban thriller traversing the bustling night streets of Kampala, from Owino Market to Kololo hills, following an undercover driver unraveling an international syndicate.',
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    videoUrl: SAMPLE_VIDEOS.cityNight,
    duration: '1h 52m',
    rating: '9.4/10',
    year: 2026,
    matchScore: 94,
    is4K: true,
    isHDR: true,
    isDolbyAtmos: true,
    language: 'Luganda & English',
    tags: ['Kampala Action', '4K UHD', 'Dolby Atmos'],
    genre: 'Action Thriller'
  },
  {
    id: 'mov-cheptegei-record',
    title: 'Joshua Cheptegei: The Sub-26 Pursuit',
    subtitle: 'Sports Masterclass & Documentary 4K',
    category: 'sports',
    description: 'Inside the altitude training regime in Kapchorwa, Mount Elgon slopes, and the high-tech biomechanics that made Joshua Cheptegei the world record holder in the 5,000m and 10,000m.',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&auto=format&fit=crop&q=80',
    videoUrl: SAMPLE_VIDEOS.sportsHighlights,
    duration: '1h 24m',
    rating: '9.7/10',
    year: 2025,
    matchScore: 97,
    is4K: true,
    isHDR: true,
    isDolbyAtmos: false,
    language: 'English, Luganda & Sabiny',
    tags: ['World Champion', 'Uganda Pride', '4K Sports', 'Athletics'],
    genre: 'Sports Documentary'
  }
];

export const INITIAL_DOWNLOADS: DownloadItem[] = [
  {
    id: 'dl-1',
    mediaId: 'mov-queen-katwe',
    title: 'Queen of Katwe (4K Remastered)',
    thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80',
    quality: '4K UHD',
    sizeGb: 6.8,
    progress: 100,
    status: 'completed',
    downloadSpeedMbps: 0,
    category: 'movies',
    duration: '2h 04m',
    dateDownloaded: 'Downloaded Today'
  },
  {
    id: 'dl-2',
    mediaId: 'mov-pearl-wildlife',
    title: 'Rwenzori: Mountains of the Moon 4K',
    thumbnail: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80',
    quality: '4K UHD',
    sizeGb: 5.2,
    progress: 100,
    status: 'completed',
    downloadSpeedMbps: 0,
    category: 'documentary',
    duration: '1h 38m',
    dateDownloaded: 'Downloaded Yesterday'
  },
  {
    id: 'dl-3',
    mediaId: 'mov-cheptegei-record',
    title: 'Joshua Cheptegei: The Sub-26 Pursuit',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    quality: '1080p FHD',
    sizeGb: 2.4,
    progress: 68,
    status: 'downloading',
    downloadSpeedMbps: 48.5,
    category: 'sports',
    duration: '1h 24m',
    dateDownloaded: 'Downloading...'
  }
];
