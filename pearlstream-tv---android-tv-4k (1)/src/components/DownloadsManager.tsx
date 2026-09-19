import React, { useState } from 'react';
import {
  Download,
  HardDrive,
  Trash2,
  Pause,
  Play,
  CheckCircle2,
  WifiOff,
  Sparkles,
  Film,
  Plus,
  ArrowRight
} from 'lucide-react';
import { DownloadItem, QualityOption, MediaItem } from '../types';
import { CINEMA_4K_ITEMS } from '../data/mockChannels';
import { playTVRemoteSound } from '../services/soundEffects';

interface DownloadsManagerProps {
  downloads: DownloadItem[];
  onPlayDownloadedItem: (item: DownloadItem) => void;
  onDeleteDownload: (id: string) => void;
  onTogglePauseDownload: (id: string) => void;
  onStartNewDownload: (media: MediaItem, quality: QualityOption) => void;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
}

export const DownloadsManager: React.FC<DownloadsManagerProps> = ({
  downloads,
  onPlayDownloadedItem,
  onDeleteDownload,
  onTogglePauseDownload,
  onStartNewDownload,
  isOfflineMode,
  onToggleOfflineMode,
}) => {
  const [selectedQuality, setSelectedQuality] = useState<QualityOption>('4K UHD');
  const [showCatalogModal, setShowCatalogModal] = useState<boolean>(false);

  // Storage Calculations (64 GB Android TV Flash)
  const totalStorageGb = 64;
  const systemStorageGb = 16.5;
  const downloadsStorageGb = Number(
    downloads.reduce((acc, curr) => acc + (curr.status === 'completed' ? curr.sizeGb : (curr.sizeGb * curr.progress) / 100), 0).toFixed(1)
  );
  const freeStorageGb = Number((totalStorageGb - systemStorageGb - downloadsStorageGb).toFixed(1));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header & Offline Mode Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Download className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Offline 4K Downloads Manager
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Save movies, matches, and documentary specials for zero-buffering offline playback on your Android TV.
              </p>
            </div>
          </div>
        </div>

        {/* Offline Simulation Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playTVRemoteSound('select');
              onToggleOfflineMode();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 ${
              isOfflineMode
                ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-900/40 animate-pulse'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <WifiOff className="w-4 h-4" />
            <span>{isOfflineMode ? 'Exit Offline Mode' : 'Simulate Offline Playback'}</span>
          </button>

          <button
            onClick={() => {
              playTVRemoteSound('select');
              setShowCatalogModal(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Download New Title</span>
          </button>
        </div>
      </div>

      {/* Android TV Flash Storage Meter */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <HardDrive className="w-4 h-4 text-amber-400" />
            <span>Android TV Internal High-Speed NVMe Storage</span>
          </div>
          <div className="text-xs font-mono text-slate-400">
            <span className="text-amber-400 font-bold">{freeStorageGb} GB Free</span> of {totalStorageGb} GB
          </div>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
          <div
            className="h-full bg-slate-600 rounded-l-full"
            style={{ width: `${(systemStorageGb / totalStorageGb) * 100}%` }}
            title={`System: ${systemStorageGb} GB`}
          />
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
            style={{ width: `${(downloadsStorageGb / totalStorageGb) * 100}%` }}
            title={`PearlStream Downloads: ${downloadsStorageGb} GB`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mt-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>PearlStream 4K Downloads ({downloadsStorageGb} GB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span>Android TV OS & Apps ({systemStorageGb} GB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700" />
            <span>Available Free Storage ({freeStorageGb} GB)</span>
          </div>
        </div>
      </div>

      {/* Catalog Modal (Add Title to Downloads) */}
      {showCatalogModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="text-lg font-black text-white">Select Content to Download in 4K</h3>
                <p className="text-xs text-slate-400">Choose resolution preset for offline viewing</p>
              </div>
              <button
                onClick={() => setShowCatalogModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {CINEMA_4K_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.thumbnail} alt={item.title} className="w-16 h-12 object-cover rounded-xl" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[10px] text-slate-400">{item.duration} • {item.genre}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        playTVRemoteSound('select');
                        onStartNewDownload(item, '4K UHD');
                        setShowCatalogModal(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                    >
                      Download 4K (~6.8 GB)
                    </button>
                    <button
                      onClick={() => {
                        playTVRemoteSound('select');
                        onStartNewDownload(item, '1080p FHD');
                        setShowCatalogModal(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs"
                    >
                      1080p (~2.4 GB)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Downloads List */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <span>Downloaded Titles & Active Tasks ({downloads.length})</span>
        </h2>

        {downloads.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800">
            <Download className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-300">No Offline Downloads Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Save your favorite Ugandan broadcasts, Premier League matches, or 4K movies to watch even when there is no internet connection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloads.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-4 flex flex-col justify-between shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-24 h-20 rounded-2xl overflow-hidden bg-slate-950 shrink-0 relative">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 font-mono text-[9px] font-bold text-amber-400">
                      {item.quality}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold text-white truncate">{item.title}</h4>
                      {item.status === 'completed' ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Ready
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono font-bold text-amber-400">
                          {item.progress}%
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.duration} • {item.sizeGb} GB • {item.dateDownloaded}
                    </p>

                    {/* Progress Bar (if downloading or paused) */}
                    {item.status !== 'completed' && (
                      <div className="mt-2 space-y-1">
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                          <span>{item.status === 'paused' ? 'Paused' : `${item.downloadSpeedMbps} MB/s`}</span>
                          <span>{((item.sizeGb * item.progress) / 100).toFixed(1)} / {item.sizeGb} GB</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  {item.status === 'completed' ? (
                    <button
                      onClick={() => {
                        playTVRemoteSound('select');
                        onPlayDownloadedItem(item);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Offline 4K</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        playTVRemoteSound('select');
                        onTogglePauseDownload(item.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5"
                    >
                      {item.status === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                      <span>{item.status === 'paused' ? 'Resume' : 'Pause'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      playTVRemoteSound('back');
                      onDeleteDownload(item.id);
                    }}
                    title="Delete download to reclaim storage"
                    className="p-2 rounded-xl bg-slate-800/60 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
