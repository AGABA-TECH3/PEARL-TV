import React from 'react';
import { Play, Download, Sparkles, Layers, Volume2, ShieldAlert, Radio } from 'lucide-react';
import { MediaItem } from '../types';
import { playTVRemoteSound } from '../services/soundEffects';

interface TVHeroBillboardProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
  onDownload: (item: MediaItem) => void;
  isFocused?: boolean;
}

export const TVHeroBillboard: React.FC<TVHeroBillboardProps> = ({
  item,
  onPlay,
  onDownload,
  isFocused = false,
}) => {
  return (
    <div
      className={`relative w-full h-[460px] md:h-[520px] rounded-3xl overflow-hidden border transition-all duration-300 ${
        isFocused ? 'ring-4 ring-amber-400 ring-offset-4 ring-offset-slate-950 scale-[1.01]' : 'border-slate-800'
      }`}
    >
      {/* Background Backdrop Image */}
      <img
        src={item.backdrop}
        alt={item.title}
        className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
      />

      {/* Atmospheric Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070A12] via-[#070A12]/75 to-transparent w-full md:w-3/4" />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end max-w-3xl z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {item.isLive && (
            <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs tracking-wider flex items-center gap-1.5 animate-pulse shadow-lg shadow-rose-900/50">
              <Radio className="w-3.5 h-3.5" />
              LIVE 4K BROADCAST
            </span>
          )}

          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold tracking-wider">
            4K UHD 60FPS
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
            HDR10+ / DOLBY ATMOS
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400" />
            {item.matchScore}% Match For You
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-2 drop-shadow-md">
          {item.title}
        </h1>
        <p className="text-sm md:text-base font-semibold text-amber-400 mb-3 flex items-center gap-2">
          <span>{item.subtitle}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">{item.genre}</span>
        </p>

        {/* Description */}
        <p className="text-xs md:text-sm text-slate-300 line-clamp-3 mb-6 leading-relaxed max-w-2xl font-normal drop-shadow">
          {item.description}
        </p>

        {/* Live Sports Ticker Badge (if sports) */}
        {item.sportsData && (
          <div className="mb-6 inline-flex items-center gap-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-2xl px-4 py-2 text-xs">
            <div className="font-bold text-white">{item.sportsData.teams.home}</div>
            <div className="font-mono text-base font-black text-amber-400 bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
              {item.sportsData.teams.homeScore} - {item.sportsData.teams.awayScore}
            </div>
            <div className="font-bold text-white">{item.sportsData.teams.away}</div>
            <div className="border-l border-slate-700 pl-3 text-rose-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              {item.sportsData.timeOrStatus}
            </div>
            <div className="border-l border-slate-700 pl-3 text-slate-300 flex items-center gap-1 text-[11px]">
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              Dual Audio: Luganda + English
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              playTVRemoteSound('select');
              onPlay(item);
            }}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-sm flex items-center gap-2.5 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all group"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Watch Live in 4K</span>
          </button>

          <button
            onClick={() => {
              playTVRemoteSound('select');
              onDownload(item);
            }}
            className="px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-bold flex items-center gap-2 hover:border-amber-400 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download 4K Offline</span>
          </button>

          {item.sportsData && (
            <button
              onClick={() => {
                playTVRemoteSound('select');
                onPlay(item);
              }}
              className="px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold flex items-center gap-2 transition-all hover:border-sky-400"
            >
              <Layers className="w-4 h-4 text-sky-400" />
              <span>4-Angle Feed</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
