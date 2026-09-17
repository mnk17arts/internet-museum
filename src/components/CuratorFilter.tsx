import { Search, Shuffle, Filter } from 'lucide-react';
import { retroAudio } from '../audio/soundSynthesizer';
import { type Era } from '../data/eras';

export type CategoryFilter = 'All' | 'Website' | 'Browser' | 'Audio' | 'Culture' | 'Disaster' | 'Tech';

interface CuratorFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: CategoryFilter;
  onCategoryChange: (cat: CategoryFilter) => void;
  onSurpriseMe: () => void;
  totalCount: number;
  filteredCount: number;
  era: Era;
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
  era,
}: CuratorFilterProps) {
  return (
    <div className={`w-full p-3 sm:p-4 transition-all duration-300 ${era.filterContainerClass}`}>
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 opacity-50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search web archaeology (e.g. Netscape, Dial-up, GeoCities, Fail Whale, Flash)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 transition-colors ${era.inputClass}`}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 text-xs"
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
            className={`px-3.5 py-2 flex items-center gap-1.5 whitespace-nowrap transition-transform active:scale-95 ${era.buttonClass}`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>RANDOM TOUR</span>
          </button>

          <span className={`px-3 py-2 text-xs font-mono whitespace-nowrap ${
            era.id === 'dawn-1991-1995'
              ? 'win95-sunken bg-[#e0e0e0] text-black font-bold'
              : 'bg-black/40 border border-current/20 rounded-xl text-current'
          }`}>
            {filteredCount} / {totalCount} EXHIBITS
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className={`flex items-center gap-1.5 overflow-x-auto pt-3 mt-2 scrollbar-none border-t ${
        era.id === 'dawn-1991-1995' ? 'border-[#808080]' : 'border-current/15'
      }`}>
        <span className="text-xs font-mono flex items-center gap-1 mr-1 hidden sm:flex opacity-60">
          <Filter className="w-3 h-3 text-current" /> CATEGORY:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => {
              retroAudio.playKeyClick();
              onCategoryChange(cat.label);
            }}
            className={`px-3 py-1 text-xs whitespace-nowrap flex items-center gap-1.5 transition-all ${
              selectedCategory === cat.label
                ? era.pillActiveClass
                : era.pillInactiveClass
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
