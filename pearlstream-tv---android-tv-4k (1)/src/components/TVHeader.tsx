import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Volume2, VolumeX, Tv, HardDrive, Sparkles, User, ShieldCheck } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playTVRemoteSound } from '../services/soundEffects';

interface TVHeaderProps {
  activeTab: string;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  showRemote: boolean;
  onToggleRemote: () => void;
  downloadCount: number;
}

export const TVHeader: React.FC<TVHeaderProps> = ({
  activeTab,
  isOfflineMode,
  onToggleOfflineMode,
  showRemote,
  onToggleRemote,
  downloadCount,
}) => {
  const [time, setTime] = useState<string>('');
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playTVRemoteSound('select');
  };

  return (
    <header className="w-full bg-[#0B0F1D]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Platform Identity */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl tracking-tighter">
            <Tv className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                PEARLSTREAM
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded uppercase tracking-wider">
                4K TV
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Kampala Live • Android TV OS 14
            </p>
          </div>
        </div>

        {/* Uganda Flag Accent Tag */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
          <div className="flex flex-col w-4 h-3 rounded-sm overflow-hidden border border-slate-700">
            <span className="bg-black h-1/6" />
            <span className="bg-yellow-400 h-1/6" />
            <span className="bg-red-600 h-1/6" />
            <span className="bg-black h-1/6" />
            <span className="bg-yellow-400 h-1/6" />
            <span className="bg-red-600 h-1/6" />
          </div>
          <span className="font-semibold text-slate-200">Uganda Channels</span>
          <span className="text-amber-400 text-[10px] font-mono bg-amber-400/10 px-1 rounded">10 Local Streams</span>
        </div>
      </div>

      {/* Center Status Banner (Offline Mode notification if active) */}
      {isOfflineMode && (
        <div className="hidden md:flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-300 px-4 py-1 rounded-full text-xs font-semibold animate-pulse">
          <WifiOff className="w-3.5 h-3.5" />
          OFFLINE MODE ACTIVE • Playing Local 4K Storage
        </div>
      )}

      {/* Right Controls & TV Status */}
      <div className="flex items-center gap-3">
        {/* Offline Mode Switcher */}
        <button
          onClick={() => {
            playTVRemoteSound('select');
            onToggleOfflineMode();
          }}
          title="Toggle Offline Storage Playback Mode"
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all border ${
            isOfflineMode
              ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-900/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700/80'
          }`}
        >
          {isOfflineMode ? (
            <>
              <WifiOff className="w-3.5 h-3.5 text-white" />
              <span>Offline Mode (ON)</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Online (540 Mbps)</span>
            </>
          )}
        </button>

        {/* Remote Simulator Toggle */}
        <button
          onClick={() => {
            playTVRemoteSound('select');
            onToggleRemote();
          }}
          title="Toggle On-Screen Android TV Remote Simulator"
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
            showRemote
              ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700/80'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">TV Remote</span>
        </button>

        {/* Audio click feedback toggle */}
        <button
          onClick={handleToggleSound}
          title={soundOn ? 'Remote Click Sounds: Enabled' : 'Remote Click Sounds: Muted'}
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors"
        >
          {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* Clock & Kampala EAT Time */}
        <div className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg text-right">
          <div className="font-mono text-xs font-bold text-slate-100 tracking-wider">{time || '19:45:00'}</div>
          <div className="text-[10px] text-slate-400">Kampala EAT</div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-1 ring-slate-700">
            KB
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">Kato Brian</div>
            <div className="text-[10px] text-amber-400 flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> 4K Ultra VIP
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
