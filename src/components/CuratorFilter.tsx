import { Search, Shuffle, Filter } from 'lucide-react';
import { retroAudio } from '../audio/soundSynthesizer';

export type CategoryFilter = 'All' | 'Website' | 'Browser' | 'Audio' | 'Culture' | 'Disaster' | 'Tech';

interface CuratorFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: CategoryFilter;
  onCategoryChange: (cat: CategoryFilter) => void;
  onSurpriseMe: () => void;
  totalCount: number;
  filteredCount: number;
}

const CATEGORIES: { label: CategoryFilter; icon: string }[] = [
  { label: 'All', icon: '🌐' },
  { label: 'Website', icon: '📄' },
  { label: 'Browser', icon: '🧭' },
  { label: 'Audio', icon: '🔊' },
  { label: 'Culture', icon: '👾' },
  { label: 'Disaster', icon: '💥' },
  { label: 'Tech', icon: '⚡' },
];

export function CuratorFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onSurpriseMe,
  totalCount,
  filteredCount,
}: CuratorFilterProps) {
  return (
    <div className="w-full bg-[#0d0d18]/90 backdrop-blur-md rounded-2xl border border-slate-800/80 p-3 sm:p-4 shadow-xl">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search web archaeology (e.g. Netscape, Dial-up, GeoCities, Fail Whale, Flash)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#141424] border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Surprise Me & Counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              retroAudio.playKeyClick();
              onSurpriseMe();
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all active:scale-95 whitespace-nowrap"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>RANDOM TOUR</span>
          </button>

          <span className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs whitespace-nowrap">
            {filteredCount} / {totalCount} EXHIBITS
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-3 mt-2 border-t border-slate-800/80 scrollbar-none">
        <span className="text-xs text-slate-500 font-mono flex items-center gap-1 mr-1 hidden sm:flex">
          <Filter className="w-3 h-3 text-cyan-400" /> CATEGORY:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => {
              retroAudio.playKeyClick();
              onCategoryChange(cat.label);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap flex items-center gap-1.5 border ${
              selectedCategory === cat.label
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
