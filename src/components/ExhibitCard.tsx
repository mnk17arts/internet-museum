import { type Exhibit } from '../data/exhibits';
import { retroAudio } from '../audio/soundSynthesizer';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ExhibitCardProps {
  exhibit: Exhibit;
  onSelect: (exhibit: Exhibit) => void;
  accentColor?: string;
}

export function ExhibitCard({ exhibit, onSelect, accentColor = '#06b6d4' }: ExhibitCardProps) {
  const handleClick = () => {
    retroAudio.playKeyClick();
    onSelect(exhibit);
  };

  const getCategoryBadgeClass = (cat: Exhibit['category']) => {
    switch (cat) {
      case 'Website':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800';
      case 'Browser':
        return 'bg-blue-950/60 text-blue-300 border-blue-800';
      case 'Audio':
        return 'bg-amber-950/60 text-amber-300 border-amber-800';
      case 'Culture':
        return 'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-800';
      case 'Disaster':
        return 'bg-rose-950/60 text-rose-300 border-rose-800';
      case 'Tech':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      className="group relative bg-[#0e0e1a]/80 backdrop-blur-sm rounded-xl border border-slate-800/90 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 text-left overflow-hidden"
    >
      {/* Accent Top Border Line on Hover */}
      <div
        className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: accentColor }}
      />

      <div>
        {/* Card Header: Year, Category & Interactive Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-700">
              {exhibit.year}
            </span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${getCategoryBadgeClass(exhibit.category)}`}>
              {exhibit.category}
            </span>
          </div>

          {exhibit.interactiveType !== 'none' && (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>INTERACTIVE</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
          {exhibit.title}
        </h3>

        {/* Summary Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {exhibit.summary}
        </p>
      </div>

      {/* Card Footer: Badge & Explore Trigger */}
      <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500 font-mono truncate max-w-[150px]">
          {exhibit.badge}
        </span>
        <span className="text-cyan-400 font-mono text-[11px] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          EXPLORE <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
