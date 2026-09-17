import { type Exhibit } from '../data/exhibits';
import { type Era } from '../data/eras';
import { retroAudio } from '../audio/soundSynthesizer';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ExhibitCardProps {
  exhibit: Exhibit;
  onSelect: (exhibit: Exhibit) => void;
  era: Era;
}

export function ExhibitCard({ exhibit, onSelect, era }: ExhibitCardProps) {
  const handleClick = () => {
    retroAudio.playKeyClick();
    onSelect(exhibit);
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
      className={`p-4 transition-all duration-200 flex flex-col justify-between cursor-pointer text-left select-none ${era.cardClass}`}
    >
      <div>
        {/* Card Header: Year, Category & Interactive Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className={era.cardBadgeClass}>
              {exhibit.year}
            </span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              era.id === 'dawn-1991-1995'
                ? 'bg-stone-300 text-black border border-stone-600'
                : 'bg-black/30 text-current border border-current/20'
            }`}>
              {exhibit.category}
            </span>
          </div>

          {exhibit.interactiveType !== 'none' && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 flex items-center gap-1 ${
              era.id === 'dawn-1991-1995'
                ? 'bg-yellow-300 text-black border border-black font-mono'
                : era.id === 'wildwest-1996-2000'
                ? 'bg-yellow-400 text-black border border-red-500 animate-pulse font-pixel'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full'
            }`}>
              <Sparkles className="w-2.5 h-2.5" />
              <span>INTERACTIVE</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`line-clamp-1 mb-1.5 ${era.cardTitleClass}`}>
          {exhibit.title}
        </h3>

        {/* Summary Description */}
        <p className={`line-clamp-2 leading-relaxed mb-3 ${era.cardSummaryClass}`}>
          {exhibit.summary}
        </p>
      </div>

      {/* Card Footer: Badge & Explore Trigger */}
      <div className={`pt-2.5 flex items-center justify-between text-xs border-t ${
        era.id === 'dawn-1991-1995'
          ? 'border-stone-500'
          : 'border-current/15'
      }`}>
        <span className="text-[11px] opacity-70 truncate max-w-[150px]">
          {exhibit.badge}
        </span>
        <span className={`flex items-center gap-1 ${era.cardExploreClass}`}>
          EXPLORE <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
