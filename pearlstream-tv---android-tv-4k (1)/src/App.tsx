import React, { useState, useEffect, useCallback } from 'react';
import {
  Trophy,
  Tv,
  Film,
  Sparkles,
  Download,
  Flame,
  Radio,
  Calendar,
  Layers,
  ChevronRight,
  WifiOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Channel, MediaItem, DownloadItem, QualityOption, NavTabId } from './types';
import {
  UGANDAN_CHANNELS,
  SPORTS_CHANNELS,
  CINEMA_4K_ITEMS,
  FEATURED_HERO,
  INITIAL_DOWNLOADS
} from './data/mockChannels';
import { TVHeader } from './components/TVHeader';
import { TVNavbar, TABS } from './components/TVNavbar';
import { TVHeroBillboard } from './components/TVHeroBillboard';
import { TVContentRail } from './components/TVContentRail';
import { VideoPlayer4K } from './components/VideoPlayer4K';
import { EPGGuide } from './components/EPGGuide';
import { SportsHub } from './components/SportsHub';
import { DownloadsManager } from './components/DownloadsManager';
import { AIRecommender } from './components/AIRecommender';
import { VirtualRemote } from './components/VirtualRemote';
import { playTVRemoteSound } from './services/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [activePlayingItem, setActivePlayingItem] = useState<MediaItem | Channel | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [showRemote, setShowRemote] = useState<boolean>(true);
  const [downloads, setDownloads] = useState<DownloadItem[]>(() => {
    try {
      const saved = localStorage.getItem('pearlstream_downloads');
      return saved ? JSON.parse(saved) : INITIAL_DOWNLOADS;
    } catch {
      return INITIAL_DOWNLOADS;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [focusedTabIndex, setFocusedTabIndex] = useState<number>(0);

  // Sync downloads with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pearlstream_downloads', JSON.stringify(downloads));
    } catch (e) {
      console.warn('Failed to save downloads to localStorage', e);
    }
  }, [downloads]);

  // Simulate active background downloads progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads((prev) => {
        let hasChanges = false;
        const updated = prev.map((dl) => {
          if (dl.status === 'downloading' && dl.progress < 100) {
            hasChanges = true;
            const nextProgress = Math.min(100, dl.progress + Math.floor(Math.random() * 4) + 2);
            return {
              ...dl,
              progress: nextProgress,
              status: nextProgress === 100 ? ('completed' as const) : ('downloading' as const),
              downloadSpeedMbps: nextProgress === 100 ? 0 : Number((45 + Math.random() * 15).toFixed(1)),
              dateDownloaded: nextProgress === 100 ? 'Just Now' : dl.dateDownloaded,
            };
          }
          return dl;
        });
        return hasChanges ? updated : prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Start new 4K download
  const handleStartNewDownload = (media: MediaItem, quality: QualityOption) => {
    playTVRemoteSound('select');
    const existing = downloads.find((d) => d.mediaId === media.id);
    if (existing) {
      showToast(`"${media.title}" is already in your offline downloads.`);
      return;
    }

    const sizeGb = quality === '4K UHD' ? 6.8 : quality === '1080p FHD' ? 2.4 : 1.2;
    const newDownload: DownloadItem = {
      id: `dl-${Date.now()}`,
      mediaId: media.id,
      title: media.title,
      thumbnail: media.thumbnail,
      quality,
      sizeGb,
      progress: 0,
      status: 'downloading',
      downloadSpeedMbps: 54.2,
      category: media.category,
      duration: media.duration,
      dateDownloaded: 'Downloading...',
    };

    setDownloads((prev) => [newDownload, ...prev]);
    showToast(`Started ${quality} download for "${media.title}" (${sizeGb} GB)`);
  };

  // Delete download
  const handleDeleteDownload = (id: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id));
    showToast('Download removed from TV storage.');
  };

  // Toggle Pause/Resume
  const handleTogglePauseDownload = (id: string) => {
    setDownloads((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextStatus = d.status === 'downloading' ? 'paused' : 'downloading';
          return {
            ...d,
            status: nextStatus,
            downloadSpeedMbps: nextStatus === 'downloading' ? 48.0 : 0,
          };
        }
        return d;
      })
    );
  };

  // Play a downloaded item
  const handlePlayDownloadedItem = (dl: DownloadItem) => {
    const movie = CINEMA_4K_ITEMS.find((m) => m.id === dl.mediaId) || {
      id: dl.mediaId,
      title: dl.title,
      subtitle: `${dl.quality} Offline Playback`,
      category: dl.category,
      description: 'Playing from Android TV local high-speed flash storage without buffering or internet connection.',
      thumbnail: dl.thumbnail,
      backdrop: dl.thumbnail,
      videoUrl: CINEMA_4K_ITEMS[0].videoUrl,
      duration: dl.duration,
      rating: '9.8/10',
      year: 2026,
      matchScore: 99,
      is4K: dl.quality === '4K UHD',
      isHDR: true,
      isDolbyAtmos: true,
      language: 'English & Luganda',
      tags: ['Offline 4K', 'Local Storage'],
      genre: 'Downloaded Content',
    };
    setActivePlayingItem(movie);
  };

  // Remote D-Pad Navigation handlers
  const handleRemoteNavigate = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (direction === 'left') {
      setFocusedTabIndex((prev) => {
        const next = Math.max(0, prev - 1);
        setActiveTab(TABS[next].id);
        return next;
      });
    } else if (direction === 'right') {
      setFocusedTabIndex((prev) => {
        const next = Math.min(TABS.length - 1, prev + 1);
        setActiveTab(TABS[next].id);
        return next;
      });
    } else if (direction === 'down') {
      window.scrollBy({ top: 280, behavior: 'smooth' });
    } else if (direction === 'up') {
      window.scrollBy({ top: -280, behavior: 'smooth' });
    }
  };

  const handleRemoteSelect = () => {
    if (activeTab === 'home' && !activePlayingItem) {
      setActivePlayingItem(FEATURED_HERO);
    }
  };

  const handleRemoteBack = () => {
    if (activePlayingItem) {
      setActivePlayingItem(null);
    } else if (activeTab !== 'home') {
      setActiveTab('home');
      setFocusedTabIndex(0);
    }
  };

  const handleRemoteHome = () => {
    if (activePlayingItem) setActivePlayingItem(null);
    setActiveTab('home');
    setFocusedTabIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChannelChange = (delta: number) => {
    const allChannels = [...UGANDAN_CHANNELS, ...SPORTS_CHANNELS];
    const currentIndex = allChannels.findIndex((ch) => ch.id === activePlayingItem?.id);
    let nextIndex = currentIndex + delta;
    if (nextIndex < 0) nextIndex = allChannels.length - 1;
    if (nextIndex >= allChannels.length) nextIndex = 0;
    setActivePlayingItem(allChannels[nextIndex]);
    showToast(`Switched channel: ${allChannels[nextIndex].name}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when video player is open (handled by player)
      if (activePlayingItem) return;

      if (e.key === 'ArrowRight') {
        handleRemoteNavigate('right');
      } else if (e.key === 'ArrowLeft') {
        handleRemoteNavigate('left');
      } else if (e.key === 'ArrowDown') {
        handleRemoteNavigate('down');
      } else if (e.key === 'ArrowUp') {
        handleRemoteNavigate('up');
      } else if (e.key === 'Enter') {
        handleRemoteSelect();
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        handleRemoteBack();
      } else if (e.key === 'h' || e.key === 'H') {
        handleRemoteHome();
      } else if (e.key === 'r' || e.key === 'R') {
        setShowRemote((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePlayingItem, activeTab, focusedTabIndex]);

  // Offline items filter: if offline mode is active, only show downloaded items & cached channels
  const activeUgandaChannels = isOfflineMode ? UGANDAN_CHANNELS.slice(0, 3) : UGANDAN_CHANNELS;
  const activeSportsChannels = isOfflineMode ? SPORTS_CHANNELS.slice(0, 2) : SPORTS_CHANNELS;

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-950 px-5 py-2.5 rounded-2xl font-black text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 fill-slate-950 text-amber-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Android TV Top Bar */}
      <TVHeader
        activeTab={activeTab}
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={() => {
          const next = !isOfflineMode;
          setIsOfflineMode(next);
          showToast(next ? 'Offline Mode Activated: Viewing local storage only' : 'Online Mode Restored');
        }}
        showRemote={showRemote}
        onToggleRemote={() => setShowRemote((prev) => !prev)}
        downloadCount={downloads.filter((d) => d.status === 'completed').length}
      />

      {/* Leanback Android TV Navigation Tabs */}
      <TVNavbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          const idx = TABS.findIndex((t) => t.id === tab);
          if (idx !== -1) setFocusedTabIndex(idx);
        }}
        downloadCount={downloads.filter((d) => d.status === 'completed').length}
        focusedTabIndex={focusedTabIndex}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-[1560px] mx-auto px-4 md:px-8 py-6">
        {/* VIEW 1: HOME LAUNCHER */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Featured Hero Billboard */}
            <TVHeroBillboard
              item={FEATURED_HERO}
              onPlay={(item) => setActivePlayingItem(item)}
              onDownload={(item) => handleStartNewDownload(item, '4K UHD')}
            />

            {/* Quick Feature Shortcut Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => {
                  playTVRemoteSound('select');
                  setActiveTab('sports');
                }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/30 hover:border-rose-400 flex items-center justify-between text-left transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Live Sports Hub</h4>
                    <p className="text-[10px] text-slate-400">Premier League & AFCON</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </button>

              <button
                onClick={() => {
                  playTVRemoteSound('select');
                  setActiveTab('uganda');
                }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 hover:border-amber-400 flex items-center justify-between text-left transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Tv className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Uganda Local TV</h4>
                    <p className="text-[10px] text-slate-400">NBS, NTV, Bukedde</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">10 CH</span>
              </button>

              <button
                onClick={() => {
                  playTVRemoteSound('select');
                  setActiveTab('cinema');
                }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 hover:border-indigo-400 flex items-center justify-between text-left transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">4K UHD Cinema</h4>
                    <p className="text-[10px] text-slate-400">HDR10+ & Dolby Atmos</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded">4K</span>
              </button>

              <button
                onClick={() => {
                  playTVRemoteSound('select');
                  setActiveTab('downloads');
                }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 flex items-center justify-between text-left transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Offline Downloads</h4>
                    <p className="text-[10px] text-slate-400">{downloads.length} Saved Titles</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">OFFLINE</span>
              </button>
            </div>

            {/* Shelf 1: Uganda Local Channels */}
            <TVContentRail
              title="Uganda Local Channels (Kampala DTT / Satellite Live)"
              subtitle="Direct digital terrestrial feeds with authentic Luganda & English programming"
              icon={Tv}
              tag="LOCAL FEED"
              items={activeUgandaChannels}
              onSelectItem={(item) => setActivePlayingItem(item)}
            />

            {/* Shelf 2: Major Sports Channels & Live Broadcasting */}
            <TVContentRail
              title="Major Sports Channels & Live Broadcasting (4K 60fps)"
              subtitle="Premier League, UEFA Champions League, NBA Finals, and World Athletics"
              icon={Trophy}
              tag="4K 60FPS"
              items={activeSportsChannels}
              onSelectItem={(item) => setActivePlayingItem(item)}
            />

            {/* Shelf 3: 4K Cinema & East Africa Documentaries */}
            <TVContentRail
              title="4K Ultra HD Cinema & East African Documentaries"
              subtitle="Mastered in 2160p HDR with Dolby Atmos immersive sound and offline download capability"
              icon={Film}
              tag="DOLBY VISION"
              items={CINEMA_4K_ITEMS}
              onSelectItem={(item) => setActivePlayingItem(item)}
              onDownloadItem={(media, q) => handleStartNewDownload(media, q)}
            />
          </div>
        )}

        {/* VIEW 2: SPORTS HUB */}
        {activeTab === 'sports' && (
          <div className="animate-in fade-in duration-300">
            <SportsHub onPlaySports={(item) => setActivePlayingItem(item)} />
          </div>
        )}

        {/* VIEW 3: UGANDA CHANNELS HUB */}
        {activeTab === 'uganda' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                    <Tv className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      Uganda National & Regional Channels
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Direct digital terrestrial & satellite feeds from Media Plaza, Serena, Vision Group, and Mengo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                  100% Free DTT Access
                </span>
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-xs text-amber-300 font-mono">
                  High-Def Luganda & English
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {UGANDAN_CHANNELS.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => {
                    playTVRemoteSound('select');
                    setActivePlayingItem(ch);
                  }}
                  className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/70 rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] shadow-xl group text-left"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img
                      src={ch.banner}
                      alt={ch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.75]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-extrabold text-[10px] tracking-wider flex items-center gap-1 animate-pulse">
                        <Radio className="w-2.5 h-2.5" />
                        LIVE
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-400 font-mono text-[10px] font-bold border border-slate-700">
                        {ch.resolution}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-slate-300">
                        {ch.viewersCount}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden p-0.5 shadow-md">
                        <img src={ch.logo} alt={ch.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-white leading-tight drop-shadow">{ch.name}</h3>
                        <p className="text-[10px] text-amber-400 font-medium">{ch.country} • {ch.frequency}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/90">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
                      <span className="text-amber-400 font-mono">NOW AIRING</span>
                      <span className="text-[10px] text-slate-400">{ch.language}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {ch.currentProgram}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {ch.currentProgramDesc}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Tune In 4K Stream →
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {ch.epg.length} Schedule Items
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: 4K CINEMA CATALOG */}
        {activeTab === 'cinema' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
                    <Film className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      4K Ultra HD Cinema & Series
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Pristine 3840x2160 resolution, HDR10+, Dolby Vision color mastering, and offline download support.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
                  45 Mbps AV1 Bitrate
                </span>
                <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                  Dolby Atmos 5.1
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CINEMA_4K_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    playTVRemoteSound('select');
                    setActivePlayingItem(item);
                  }}
                  className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] shadow-xl group text-left flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.82]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px]">
                        4K UHD
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px]">
                        HDR10+
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-500/40 text-purple-200 text-[10px] font-bold">
                        {item.matchScore}% Match
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white bg-black/60 px-2 py-0.5 rounded text-[11px]">
                        {item.duration}
                      </span>
                      <span className="font-bold text-amber-400">{item.rating}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/90 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-amber-400 font-medium mt-0.5 line-clamp-1">{item.subtitle}</p>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">Play in 4K</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartNewDownload(item, '4K UHD');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Save Offline</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: EPG PROGRAM GUIDE */}
        {activeTab === 'epg' && (
          <div className="animate-in fade-in duration-300">
            <EPGGuide
              channels={[...UGANDAN_CHANNELS, ...SPORTS_CHANNELS]}
              onTuneIn={(ch) => setActivePlayingItem(ch)}
            />
          </div>
        )}

        {/* VIEW 6: OFFLINE DOWNLOADS MANAGER */}
        {activeTab === 'downloads' && (
          <div className="animate-in fade-in duration-300">
            <DownloadsManager
              downloads={downloads}
              onPlayDownloadedItem={handlePlayDownloadedItem}
              onDeleteDownload={handleDeleteDownload}
              onTogglePauseDownload={handleTogglePauseDownload}
              onStartNewDownload={handleStartNewDownload}
              isOfflineMode={isOfflineMode}
              onToggleOfflineMode={() => {
                const next = !isOfflineMode;
                setIsOfflineMode(next);
                showToast(next ? 'Offline Mode Activated' : 'Online Mode Restored');
              }}
            />
          </div>
        )}

        {/* VIEW 7: AI PERSONALIZED RECOMMENDATIONS */}
        {activeTab === 'personalized' && (
          <div className="animate-in fade-in duration-300">
            <AIRecommender onSelectItem={(item) => setActivePlayingItem(item)} />
          </div>
        )}
      </main>

      {/* 4K Video Player Modal (Full Android TV Player Experience) */}
      {activePlayingItem && (
        <VideoPlayer4K
          media={activePlayingItem}
          onClose={() => setActivePlayingItem(null)}
          onDownloadRequest={(media, q) => handleStartNewDownload(media, q)}
          isOfflinePlayback={isOfflineMode}
        />
      )}

      {/* Android TV Virtual Remote Simulator */}
      <VirtualRemote
        isOpen={showRemote}
        onClose={() => setShowRemote(false)}
        onNavigate={handleRemoteNavigate}
        onSelect={handleRemoteSelect}
        onBack={handleRemoteBack}
        onHome={handleRemoteHome}
        onVolumeChange={(delta) => showToast(`Volume: ${delta > 0 ? '+5%' : '-5%'}`)}
        onChannelChange={handleChannelChange}
      />
    </div>
  );
}
