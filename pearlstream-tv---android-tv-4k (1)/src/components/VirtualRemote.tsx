import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Home,
  ArrowLeft,
  Volume2,
  VolumeX,
  Volume1,
  Tv,
  Power,
  Sparkles,
  Layers,
  X
} from 'lucide-react';
import { playTVRemoteSound } from '../services/soundEffects';

interface VirtualRemoteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onSelect: () => void;
  onBack: () => void;
  onHome: () => void;
  onVolumeChange: (delta: number) => void;
  onChannelChange: (delta: number) => void;
}

export const VirtualRemote: React.FC<VirtualRemoteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelect,
  onBack,
  onHome,
  onVolumeChange,
  onChannelChange,
}) => {
  if (!isOpen) return null;

  return (
    <aside
      aria-label="Android TV Remote Simulator"
      className="fixed bottom-6 right-6 z-50 w-64 bg-slate-950/95 backdrop-blur-xl border-2 border-amber-500/50 rounded-[36px] p-5 shadow-2xl shadow-amber-500/10 select-none animate-in slide-in-from-bottom-5 fade-in duration-200"
    >
      {/* Remote Top Branding Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-mono font-bold text-amber-400 tracking-wider">
            ANDROID TV REMOTE
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Minimize Remote"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Power & Quick 4K Row */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={() => {
            playTVRemoteSound('select');
            onHome();
          }}
          title="Power / Home"
          className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors active:scale-95"
        >
          <Power className="w-4 h-4" />
        </button>

        <div className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono font-extrabold text-amber-400">
          4K UHD
        </div>

        <button
          onClick={() => {
            playTVRemoteSound('channel');
            onChannelChange(1);
          }}
          title="Next Channel"
          className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors active:scale-95"
        >
          <Tv className="w-4 h-4" />
        </button>
      </div>

      {/* Circular D-Pad Controller */}
      <div className="relative w-44 h-44 mx-auto rounded-full bg-slate-900 border-2 border-slate-700/80 shadow-inner flex items-center justify-center mb-4">
        {/* Up Button */}
        <button
          onClick={() => {
            playTVRemoteSound('move');
            onNavigate('up');
          }}
          title="Up (ArrowUp)"
          className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-12 flex items-center justify-center text-slate-300 hover:text-amber-400 active:scale-90 transition-all rounded-t-full"
        >
          <ChevronUp className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Down Button */}
        <button
          onClick={() => {
            playTVRemoteSound('move');
            onNavigate('down');
          }}
          title="Down (ArrowDown)"
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 h-12 flex items-center justify-center text-slate-300 hover:text-amber-400 active:scale-90 transition-all rounded-b-full"
        >
          <ChevronDown className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Left Button */}
        <button
          onClick={() => {
            playTVRemoteSound('move');
            onNavigate('left');
          }}
          title="Left (ArrowLeft)"
          className="absolute left-1 top-1/2 -translate-y-1/2 w-12 h-14 flex items-center justify-center text-slate-300 hover:text-amber-400 active:scale-90 transition-all rounded-l-full"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Right Button */}
        <button
          onClick={() => {
            playTVRemoteSound('move');
            onNavigate('right');
          }}
          title="Right (ArrowRight)"
          className="absolute right-1 top-1/2 -translate-y-1/2 w-12 h-14 flex items-center justify-center text-slate-300 hover:text-amber-400 active:scale-90 transition-all rounded-r-full"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Center OK / Select Button */}
        <button
          onClick={() => {
            playTVRemoteSound('select');
            onSelect();
          }}
          title="OK / Select (Enter)"
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-amber-500/30 active:scale-90 transition-all ring-4 ring-slate-900"
        >
          OK
        </button>
      </div>

      {/* Function Buttons: Back, Home */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => {
            playTVRemoteSound('back');
            onBack();
          }}
          className="py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={() => {
            playTVRemoteSound('select');
            onHome();
          }}
          className="py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
      </div>

      {/* Volume & Channel Rockers */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-center">
        {/* Volume */}
        <div className="bg-slate-900/80 rounded-2xl p-2 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono mb-1">VOLUME</div>
          <div className="flex items-center justify-around">
            <button
              onClick={() => {
                playTVRemoteSound('move');
                onVolumeChange(-5);
              }}
              className="p-1 text-slate-300 hover:text-white active:scale-90"
            >
              -
            </button>
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <button
              onClick={() => {
                playTVRemoteSound('move');
                onVolumeChange(5);
              }}
              className="p-1 text-slate-300 hover:text-white active:scale-90"
            >
              +
            </button>
          </div>
        </div>

        {/* Channel */}
        <div className="bg-slate-900/80 rounded-2xl p-2 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono mb-1">CHANNEL</div>
          <div className="flex items-center justify-around">
            <button
              onClick={() => {
                playTVRemoteSound('channel');
                onChannelChange(-1);
              }}
              className="p-1 text-slate-300 hover:text-white active:scale-90 font-bold"
            >
              ▼
            </button>
            <span className="text-[10px] text-amber-400 font-mono font-bold">CH</span>
            <button
              onClick={() => {
                playTVRemoteSound('channel');
                onChannelChange(1);
              }}
              className="p-1 text-slate-300 hover:text-white active:scale-90 font-bold"
            >
              ▲
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-3 text-[10px] text-slate-400 text-center font-mono bg-slate-900/50 py-1.5 rounded-xl border border-slate-800/80">
        ⌨️ Arrow keys • Enter=OK • Esc=Back
      </div>
    </aside>
  );
};
