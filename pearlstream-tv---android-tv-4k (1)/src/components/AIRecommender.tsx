import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  RotateCw,
  Sliders,
  ThumbsUp,
  BrainCircuit,
  Film,
  Trophy,
  Tv,
  Check
} from 'lucide-react';
import { RecommendationItem, MediaItem, Channel } from '../types';
import { FEATURED_HERO, UGANDAN_CHANNELS, CINEMA_4K_ITEMS } from '../data/mockChannels';
import { playTVRemoteSound } from '../services/soundEffects';

interface AIRecommenderProps {
  onSelectItem: (item: MediaItem | Channel) => void;
}

export const AIRecommender: React.FC<AIRecommenderProps> = ({ onSelectItem }) => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<string>('Thrilling Live Sports & Luganda Drama');
  const [selectedLang, setSelectedLang] = useState<string>('Luganda & English');
  const [favoriteTeam, setFavoriteTeam] = useState<string>('Arsenal & KCCA FC');
  const [recommendationSource, setRecommendationSource] = useState<string>('gemini');

  const moods = [
    'Thrilling Live Sports & Luganda Drama',
    'Uganda Prime Investigative News & Politics',
    '4K Cinematic Cinema & Wildlife Expeditions',
    'Afrobeats Music & Youth Entertainment',
  ];

  const fetchRecommendations = async () => {
    setLoading(true);
    playTVRemoteSound('move');
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          watchHistory: [
            'Arsenal vs Man City 4K',
            'NBS Live At 9',
            'Queen of Katwe 4K',
            'Bukedde Agataliiko Nfuufu',
            'Cheptegei 10,000m World Record',
          ],
          favoriteCategories: ['sports', 'uganda', 'movies'],
          userMood: selectedMood,
          language: selectedLang,
          favoriteTeam,
        }),
      });
      const data = await response.json();
      if (data.recommendations && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
        setRecommendationSource(data.source || 'gemini');
      }
    } catch (err) {
      console.warn('Recommendation API fallback', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleLaunchItem = (rec: RecommendationItem) => {
    playTVRemoteSound('select');
    // Match recommendation to real mock channel or movie
    if (rec.title.toLowerCase().includes('arsenal') || rec.category === 'sports') {
      onSelectItem(FEATURED_HERO);
    } else if (rec.title.toLowerCase().includes('nbs') || rec.title.toLowerCase().includes('bukedde') || rec.category === 'uganda') {
      const ch = UGANDAN_CHANNELS.find((c) => c.name.toLowerCase().includes('nbs')) || UGANDAN_CHANNELS[0];
      onSelectItem(ch);
    } else {
      onSelectItem(CINEMA_4K_ITEMS[0]);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold shadow-lg shadow-purple-900/30">
              <BrainCircuit className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Personalized AI Recommendation Engine
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  Gemini 3.8 Flash Powered
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic predictive content ranking based on your viewing history, sports club allegiance, and preferred Ugandan dialect.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={fetchRecommendations}
          disabled={loading}
          className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-purple-900/40 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Analyzing Watch History...' : 'Re-compute My Feed'}</span>
        </button>
      </div>

      {/* Interactive Profile Preferences Bar */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
          <Sliders className="w-4 h-4" />
          <span>Tune Your Personal Android TV Taste Profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mood / Vibe */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">Current Viewing Mood</label>
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-amber-400 outline-none"
            >
              {moods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Language Preference */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">Preferred Audio / Commentary</label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-amber-400 outline-none"
            >
              <option value="Luganda & English">Luganda & English (Dual Audio)</option>
              <option value="Luganda Only">Luganda Local Priority (NBS / Bukedde)</option>
              <option value="English International">English World Broadcast</option>
              <option value="Swahili Regional">Swahili East African Regional</option>
            </select>
          </div>

          {/* Favorite Team / Club */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">Favorite Team / Club</label>
            <select
              value={favoriteTeam}
              onChange={(e) => setFavoriteTeam(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-amber-400 outline-none"
            >
              <option value="Arsenal & KCCA FC">Arsenal FC & KCCA FC (Kampala)</option>
              <option value="Manchester United & Vipers SC">Man United & Vipers SC</option>
              <option value="Chelsea & SC Villa">Chelsea FC & SC Villa</option>
              <option value="Real Madrid & Express FC">Real Madrid & Express FC</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>Tailored For You Right Now</span>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {recommendations.length} Matches Found
            </span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Algorithm: {recommendationSource.toUpperCase()} Neural</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((rec, idx) => (
            <div
              key={rec.id || idx}
              onClick={() => handleLaunchItem(rec)}
              className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/70 rounded-3xl p-5 cursor-pointer transition-all hover:scale-[1.02] shadow-xl group text-left relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Match percentage badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    {rec.matchScore}% Match
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {rec.badge}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white group-hover:text-purple-300 transition-colors leading-tight">
                  {rec.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80 leading-relaxed font-normal">
                  <span className="text-purple-400 font-bold block mb-1">Why Recommended:</span>
                  "{rec.reason}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{rec.duration}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLaunchItem(rec);
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 group-hover:bg-purple-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-purple-900/30 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Stream 4K</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
