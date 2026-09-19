import React, { useState } from 'react';
import { Calendar, Clock, Play, Radio, Info, ChevronRight, Check } from 'lucide-react';
import { Channel, ChannelProgram } from '../types';
import { playTVRemoteSound } from '../services/soundEffects';

interface EPGGuideProps {
  channels: Channel[];
  onTuneIn: (channel: Channel) => void;
}

export const EPGGuide: React.FC<EPGGuideProps> = ({ channels, onTuneIn }) => {
  const [filter, setFilter] = useState<'all' | 'uganda' | 'sports'>('all');
  const [selectedProgram, setSelectedProgram] = useState<{ channel: Channel; program: ChannelProgram } | null>(null);

  const filteredChannels = channels.filter((ch) => {
    if (filter === 'uganda') return ch.category === 'uganda';
    if (filter === 'sports') return ch.category === 'sports';
    return true;
  });

  const timeSlots = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-black text-white tracking-tight">Electronic Program Guide (EPG)</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white animate-pulse">
              LIVE BROADCASTS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time broadcast schedules for Ugandan national DTT stations and international 4K sports feeds.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              playTVRemoteSound('select');
              setFilter('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Channels ({channels.length})
          </button>
          <button
            onClick={() => {
              playTVRemoteSound('select');
              setFilter('uganda');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'uganda' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Uganda Local TV
          </button>
          <button
            onClick={() => {
              playTVRemoteSound('select');
              setFilter('sports');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'sports' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sports Feeds
          </button>
        </div>
      </div>

      {/* Program Details Modal / Drawer if selected */}
      {selectedProgram && (
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#12192B] border border-amber-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
              <img src={selectedProgram.channel.logo} alt={selectedProgram.channel.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{selectedProgram.channel.name}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-300">
                  {selectedProgram.program.startTime} - {selectedProgram.program.endTime} EAT
                </span>
                {selectedProgram.program.isLiveNow && (
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold animate-pulse">
                    AIRING NOW
                  </span>
                )}
              </div>
              <h3 className="text-lg font-extrabold text-white mt-0.5">{selectedProgram.program.title}</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">{selectedProgram.program.description}</p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                <span className="bg-slate-800 px-2 py-0.5 rounded">Category: {selectedProgram.program.category}</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded">Language: {selectedProgram.program.language}</span>
                <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono">Stream: {selectedProgram.channel.resolution}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playTVRemoteSound('select');
                onTuneIn(selectedProgram.channel);
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Broadcast in 4K</span>
            </button>
            <button
              onClick={() => setSelectedProgram(null)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Grid Container */}
      <div className="bg-slate-900/60 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Timeline Header */}
        <div className="grid grid-cols-12 bg-slate-950/80 border-b border-slate-800 px-4 py-3 sticky top-0 z-10 text-xs font-mono font-bold text-slate-400">
          <div className="col-span-3 md:col-span-2 text-slate-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>CHANNEL (UG / 4K)</span>
          </div>
          <div className="col-span-9 md:col-span-10 grid grid-cols-7 text-center">
            {timeSlots.map((time) => (
              <div key={time} className="border-l border-slate-800/80 px-1">
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* Channels Rows */}
        <div className="divide-y divide-slate-800/80">
          {filteredChannels.map((channel) => (
            <div key={channel.id} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-slate-800/40 transition-colors">
              {/* Channel Info Column */}
              <div className="col-span-3 md:col-span-2 pr-3 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden p-0.5 shrink-0">
                  <img src={channel.logo} alt={channel.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-extrabold text-white truncate">{channel.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <span className="text-amber-400 font-mono font-semibold">{channel.resolution.includes('4K') ? '4K' : 'HD'}</span>
                    <span>•</span>
                    <span className="truncate">{channel.country}</span>
                  </div>
                </div>
              </div>

              {/* Programs Timeline Rail */}
              <div className="col-span-9 md:col-span-10 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {channel.epg.map((prog) => {
                  const isSelected = selectedProgram?.program.id === prog.id;

                  return (
                    <button
                      key={prog.id}
                      onClick={() => {
                        playTVRemoteSound('select');
                        setSelectedProgram({ channel, program: prog });
                      }}
                      className={`shrink-0 text-left p-2.5 rounded-xl border transition-all text-xs min-w-[190px] max-w-[260px] ${
                        prog.isLiveNow
                          ? 'bg-rose-950/40 border-rose-500/50 hover:border-rose-400 ring-1 ring-rose-500/30'
                          : isSelected
                          ? 'bg-amber-950/40 border-amber-500 text-white ring-1 ring-amber-500'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>{prog.startTime} - {prog.endTime}</span>
                        {prog.isLiveNow && (
                          <span className="text-rose-400 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                            LIVE
                          </span>
                        )}
                      </div>
                      <div className="font-extrabold text-white truncate text-xs">{prog.title}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{prog.language} • {prog.category}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
