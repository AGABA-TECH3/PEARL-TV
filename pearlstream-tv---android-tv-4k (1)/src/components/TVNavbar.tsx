import React from 'react';
import { Home, Trophy, Tv, Film, Calendar, Download, Sparkles } from 'lucide-react';
import { playTVRemoteSound } from '../services/soundEffects';

export type NavTabId = 'home' | 'sports' | 'uganda' | 'cinema' | 'epg' | 'downloads' | 'personalized';

interface TVNavbarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  downloadCount: number;
  focusedTabIndex?: number;
}

interface TabItem {
  id: NavTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const TABS: TabItem[] = [
  { id: 'home', label: 'Home Launcher', icon: Home },
  { id: 'sports', label: 'Sports & Live Events', icon: Trophy, badge: 'LIVE', badgeColor: 'bg-rose-600 text-white animate-pulse' },
  { id: 'uganda', label: 'Uganda Channels', icon: Tv, badge: 'LOCAL', badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
  { id: 'cinema', label: '4K Cinema', icon: Film, badge: 'UHD', badgeColor: 'bg-indigo-500/20 text-indigo-400' },
  { id: 'epg', label: 'TV Program Guide', icon: Calendar },
  { id: 'downloads', label: 'Offline Downloads', icon: Download },
  { id: 'personalized', label: 'AI Recommended', icon: Sparkles, badge: 'AI', badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
];

export const TVNavbar: React.FC<TVNavbarProps> = ({
  activeTab,
  onSelectTab,
  downloadCount,
  focusedTabIndex,
}) => {
  return (
    <nav className="w-full bg-[#080B15]/95 px-6 py-2 border-b border-slate-800/60 sticky top-[57px] z-30">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {TABS.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isFocused = focusedTabIndex === idx;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => {
                playTVRemoteSound('select');
                onSelectTab(tab.id);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap outline-none ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'bg-slate-900/60 hover:bg-slate-800/90 text-slate-300 hover:text-white border border-slate-800/60'
              } ${isFocused ? 'ring-3 ring-amber-400 ring-offset-2 ring-offset-slate-950 scale-105' : ''}`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{tab.label}</span>

              {tab.id === 'downloads' && downloadCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                  isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500 text-slate-950'
                }`}>
                  {downloadCount}
                </span>
              )}

              {tab.badge && tab.id !== 'downloads' && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider ${tab.badgeColor}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
