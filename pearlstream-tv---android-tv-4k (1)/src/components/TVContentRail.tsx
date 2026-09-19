import React, { useRef } from 'react';
import { Play, Download, Radio, Sparkles, ChevronRight, ChevronLeft, Tv, Volume2 } from 'lucide-react';
import { Channel, MediaItem, QualityOption } from '../types';
import { playTVRemoteSound } from '../services/soundEffects';

interface TVContentRailProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tag?: string;
  items: (Channel | MediaItem)[];
  onSelectItem: (item: Channel | MediaItem) => void;
  onDownloadItem?: (item: MediaItem, quality: QualityOption) => void;
  focusedItemId?: string;
}

export const TVContentRail: React.FC<TVContentRailProps> = ({
  title,
  subtitle,
  icon: Icon,
  tag,
  items,
  onSelectItem,
  onDownloadItem,
  focusedItemId,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    playTVRemoteSound('move');
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full my-6">
      {/* Shelf Header */}
      <div className="flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight">{title}</h3>
              {tag && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {tag}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
          </div>
        </div>

        {/* Scroll Chevrons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Cards Shelf */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-3 px-2 -mx-2"
      >
        {items.map((item) => {
          const isChannel = 'logo' in item;
          const isFocused = focusedItemId === item.id;

          if (isChannel) {
            const ch = item as Channel;
            return (
              <div
                key={ch.id}
                id={`tv-card-${ch.id}`}
                tabIndex={0}
                onClick={() => {
                  playTVRemoteSound('select');
                  onSelectItem(ch);
                }}
                className={`flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden bg-slate-900/90 border transition-all duration-300 cursor-pointer group text-left relative ${
                  isFocused
                    ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-950 scale-105 shadow-2xl z-20'
                    : 'border-slate-800 hover:border-amber-500/60 hover:scale-[1.03]'
                }`}
              >
                {/* Banner / Poster Header */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                  <img
                    src={ch.banner}
                    alt={ch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.75]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-extrabold text-[10px] tracking-wider flex items-center gap-1 animate-pulse">
                      <Radio className="w-2.5 h-2.5" />
                      LIVE
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-400 font-mono text-[10px] font-bold border border-slate-700">
                      {ch.resolution.includes('4K') ? '4K UHD' : '1080p60'}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-slate-300">
                      {ch.viewersCount}
                    </span>
                  </div>

                  {/* Channel Logo Stamp */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden p-0.5 shadow-md">
                      <img src={ch.logo} alt={ch.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white leading-tight drop-shadow">{ch.name}</h4>
                      <p className="text-[10px] text-amber-400 font-medium">{ch.country} • {ch.frequency || 'DTT HD'}</p>
                    </div>
                  </div>
                </div>

                {/* Current Program Details */}
                <div className="p-3.5 bg-slate-900/90">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
                    <span className="text-amber-400 font-mono">NOW AIRING</span>
                    <span className="text-[10px] text-slate-400">{ch.language}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-100 line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {ch.currentProgram}
                  </h5>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {ch.currentProgramDesc}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Tune In 4K
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                      EPG Available
                    </span>
                  </div>
                </div>
              </div>
            );
          } else {
            // Media Item (4K Movie / Sports Replay / Series)
            const m = item as MediaItem;
            return (
              <div
                key={m.id}
                id={`tv-card-${m.id}`}
                tabIndex={0}
                onClick={() => {
                  playTVRemoteSound('select');
                  onSelectItem(m);
                }}
                className={`flex-shrink-0 w-64 md:w-72 rounded-2xl overflow-hidden bg-slate-900/90 border transition-all duration-300 cursor-pointer group text-left relative ${
                  isFocused
                    ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-950 scale-105 shadow-2xl z-20'
                    : 'border-slate-800 hover:border-amber-500/60 hover:scale-[1.03]'
                }`}
              >
                {/* Poster Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={m.thumbnail}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.82]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {m.is4K && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider">
                        4K UHD
                      </span>
                    )}
                    {m.isHDR && (
                      <span className="px-1.5 py-0.5 rounded bg-indigo-500/80 text-white font-bold text-[10px]">
                        HDR10+
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-500/40 text-purple-200 text-[10px] font-bold flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      {m.matchScore}%
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white drop-shadow bg-black/60 px-2 py-0.5 rounded">
                      {m.duration}
                    </span>
                    <span className="text-[11px] font-bold text-amber-400 drop-shadow">
                      {m.rating}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-3.5 bg-slate-900/90">
                  <h4 className="text-sm font-extrabold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {m.genre} • {m.year} • {m.language}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTVRemoteSound('select');
                        onSelectItem(m);
                      }}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Play 4K
                    </button>

                    {onDownloadItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTVRemoteSound('select');
                          onDownloadItem(m, '4K UHD');
                        }}
                        title="Download for offline TV viewing"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
