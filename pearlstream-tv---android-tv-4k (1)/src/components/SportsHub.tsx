import React, { useState } from 'react';
import {
  Trophy,
  Radio,
  Play,
  Layers,
  Volume2,
  Activity,
  Flame,
  Clock,
  Sparkles,
  Users,
  Shield,
  ThumbsUp,
  Eye
} from 'lucide-react';
import { Channel, MediaItem, CameraAngle } from '../types';
import { SPORTS_CHANNELS, FEATURED_HERO } from '../data/mockChannels';
import { playTVRemoteSound } from '../services/soundEffects';

interface SportsHubProps {
  onPlaySports: (item: MediaItem | Channel) => void;
}

export const SportsHub: React.FC<SportsHubProps> = ({ onPlaySports }) => {
  const [selectedAngle, setSelectedAngle] = useState<CameraAngle>('Main Broadcast');
  const [selectedAudio, setSelectedAudio] = useState<'lg' | 'en' | 'sw' | 'stadium'>('lg');
  const [fanVotes, setFanVotes] = useState<{ arsenal: number; mancity: number }>({ arsenal: 68420, mancity: 51290 });
  const [hasCheered, setHasCheered] = useState<boolean>(false);

  const handleCheer = (team: 'arsenal' | 'mancity') => {
    playTVRemoteSound('select');
    setFanVotes((prev) => ({
      ...prev,
      [team]: prev[team] + 1,
    }));
    setHasCheered(true);
  };

  const timelineEvents = [
    { min: "64'", team: 'Arsenal', type: 'GOAL', player: 'Bukayo Saka (Curler into top corner)', score: '2 - 1' },
    { min: "52'", team: 'Man City', type: 'SUB', player: 'De Bruyne ON for Alvarez' },
    { min: "41'", team: 'Arsenal', type: 'CARD', player: 'Declan Rice (Tactical foul)' },
    { min: "28'", team: 'Man City', type: 'GOAL', player: 'Erling Haaland (Header from corner)', score: '1 - 1' },
    { min: "14'", team: 'Arsenal', type: 'GOAL', player: 'Gabriel Martinelli (Counter attack)', score: '1 - 0' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Sports Hub Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/20 text-rose-500 border border-rose-500/30 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Sports Live Broadcasting Arena</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-xs font-black animate-pulse flex items-center gap-1">
                  <Radio className="w-3 h-3" />
                  LIVE 4K
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Emirates Stadium 4K 60fps Broadcast • Multi-Angle Dynamic Feeds • Native Luganda Commentary
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 block font-mono">GLOBAL 4K VIEWERS</span>
            <span className="text-sm font-extrabold text-amber-400 font-mono">3,648,190 Active</span>
          </div>
        </div>
      </div>

      {/* Featured Live Match Broadcasting Center */}
      <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0B0F1D] border border-slate-700/80 overflow-hidden shadow-2xl">
        {/* Match Header Bar */}
        <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300">
              PREMIER LEAGUE 4K
            </span>
            <span className="text-slate-400">Emirates Stadium, London • Ref: Michael Oliver</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-slate-900 text-emerald-400 font-bold border border-slate-700">
              4K UHD 60FPS
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 text-purple-400 font-bold border border-slate-700">
              DOLBY ATMOS 5.1
            </span>
          </div>
        </div>

        {/* Big Live Scoreboard Section */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Teams and Score */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between md:justify-around bg-slate-950/60 p-6 rounded-3xl border border-slate-800">
              {/* Home Team */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl bg-red-600/20 border border-red-500/40 p-2 flex items-center justify-center font-black text-red-500 text-2xl shadow-lg">
                  AFC
                </div>
                <h3 className="text-lg md:text-xl font-black text-white">Arsenal</h3>
                <span className="text-xs font-mono text-emerald-400">xG: 1.84</span>
              </div>

              {/* Live Score & Time */}
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-6xl font-black font-mono text-amber-400 tracking-wider">
                  2 - 1
                </div>
                <div className="inline-flex items-center gap-1.5 bg-rose-600/30 border border-rose-500/50 text-rose-300 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  64' (2nd Half)
                </div>
              </div>

              {/* Away Team */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl bg-sky-600/20 border border-sky-500/40 p-2 flex items-center justify-center font-black text-sky-400 text-2xl shadow-lg">
                  MCI
                </div>
                <h3 className="text-lg md:text-xl font-black text-white">Manchester City</h3>
                <span className="text-xs font-mono text-slate-400">xG: 1.21</span>
              </div>
            </div>

            {/* Broadcasting Controls (Camera Angles & Commentary) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Camera Angle Selector */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Multi-Camera Angle Director</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['Main Broadcast', 'Tactical Overhead', 'Player Cam (Star Cam)', 'Endline & Drone'] as CameraAngle[]).map((angle) => (
                    <button
                      key={angle}
                      onClick={() => {
                        playTVRemoteSound('select');
                        setSelectedAngle(angle);
                      }}
                      className={`p-2 rounded-xl text-xs font-bold transition-all text-left truncate ${
                        selectedAngle === angle
                          ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {angle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Luganda / English Dual Audio Selector */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Dual Commentary Audio Feed</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      playTVRemoteSound('select');
                      setSelectedAudio('lg');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-left ${
                      selectedAudio === 'lg'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    🇺🇬 Luganda (Katende/NBS)
                  </button>
                  <button
                    onClick={() => {
                      playTVRemoteSound('select');
                      setSelectedAudio('en');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-left ${
                      selectedAudio === 'en'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    🇬🇧 English (Peter Drury)
                  </button>
                  <button
                    onClick={() => {
                      playTVRemoteSound('select');
                      setSelectedAudio('sw');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-left ${
                      selectedAudio === 'sw'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    🇹🇿 Swahili East Africa
                  </button>
                  <button
                    onClick={() => {
                      playTVRemoteSound('select');
                      setSelectedAudio('stadium');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-left ${
                      selectedAudio === 'stadium'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    🏟️ Stadium Atmos 5.1
                  </button>
                </div>
              </div>
            </div>

            {/* Launch Full 4K Broadcast Player */}
            <button
              onClick={() => {
                playTVRemoteSound('select');
                onPlaySports(FEATURED_HERO);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Launch 4K Live Broadcast Experience ({selectedAngle})</span>
            </button>
          </div>

          {/* Right Live Match Events Timeline & Fan Cheer */}
          <div className="lg:col-span-4 bg-slate-950/70 p-5 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Live Timeline
              </span>
              <span className="text-[10px] text-slate-400">VAR Active</span>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 text-xs">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="font-mono font-bold text-amber-400 text-xs shrink-0 w-8">{evt.min}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
                      <span className={`px-1.5 py-0.2 rounded text-[9px] ${evt.type === 'GOAL' ? 'bg-emerald-600 text-white' : evt.type === 'CARD' ? 'bg-amber-500 text-black' : 'bg-slate-700 text-white'}`}>
                        {evt.type}
                      </span>
                      <span>{evt.team}</span>
                      {evt.score && <span className="text-amber-400 font-mono">({evt.score})</span>}
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5 truncate">{evt.player}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fan Cheer Meter & Poll */}
            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>Uganda Fan Cheer Poll</span>
                <span className="text-amber-400 text-[10px]">{(fanVotes.arsenal + fanVotes.mancity).toLocaleString()} votes</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCheer('arsenal')}
                  className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Arsenal ({Math.round((fanVotes.arsenal / (fanVotes.arsenal + fanVotes.mancity)) * 100)}%)</span>
                </button>
                <button
                  onClick={() => handleCheer('mancity')}
                  className="p-2 rounded-xl bg-sky-950/40 hover:bg-sky-900/60 border border-sky-500/40 text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>City ({Math.round((fanVotes.mancity / (fanVotes.arsenal + fanVotes.mancity)) * 100)}%)</span>
                </button>
              </div>
              {hasCheered && (
                <div className="text-[10px] text-emerald-400 text-center mt-1.5 font-medium">
                  ✓ Your cheer was added to the stadium audio feed!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Other Live Major Sports Channels Rail */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-extrabold text-white">Live Sports Broadcasting Channels (4K 60fps)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPORTS_CHANNELS.map((ch) => (
            <div
              key={ch.id}
              onClick={() => {
                playTVRemoteSound('select');
                onPlaySports(ch);
              }}
              className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] group text-left shadow-lg"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
                    <img src={ch.logo} alt={ch.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {ch.name}
                    </h3>
                    <p className="text-[11px] text-amber-400 font-mono font-semibold">{ch.resolution}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold animate-pulse">
                  LIVE
                </span>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">CURRENT PROGRAM</div>
                <div className="text-xs font-bold text-slate-100 line-clamp-1">{ch.currentProgram}</div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{ch.currentProgramDesc}</p>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">{ch.viewersCount}</span>
                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Watch in 4K
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
