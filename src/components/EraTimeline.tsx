import { useRef, useEffect } from 'react';
import { ERAS, type Era } from '../data/eras';
import { retroAudio } from '../audio/soundSynthesizer';
import { ChevronLeft, ChevronRight, Gauge, Users, Sparkles } from 'lucide-react';

interface EraTimelineProps {
  selectedEra: Era;
  onSelectEra: (era: Era) => void;
}

export function EraTimeline({ selectedEra, onSelectEra }: EraTimelineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll active era pill into view
  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector(`[data-era-id="${selectedEra.id}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedEra]);

  const handleNext = () => {
    const currentIndex = ERAS.findIndex((e) => e.id === selectedEra.id);
    if (currentIndex < ERAS.length - 1) {
      retroAudio.playKeyClick();
      onSelectEra(ERAS[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = ERAS.findIndex((e) => e.id === selectedEra.id);
    if (currentIndex > 0) {
      retroAudio.playKeyClick();
      onSelectEra(ERAS[currentIndex - 1]);
    }
  };

  const currentIndex = ERAS.findIndex((e) => e.id === selectedEra.id);

  return (
    <div className="w-full relative bg-[#0e0e1a]/90 backdrop-blur-md rounded-2xl border border-slate-800 p-3 sm:p-4 shadow-xl">
      {/* Header Info with Quick Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>CYBERSPACE TIME MACHINE</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                1991 — 2026
              </span>
            </h2>
            <p className="text-xs text-slate-400 hidden sm:block">
              Scrub through 35 years of web archaeology. Select an era to warp the museum.
            </p>
          </div>
        </div>

        {/* Stepper Buttons for Touch & Desktop */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition-colors border border-slate-700"
            aria-label="Previous Era"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs px-2 text-slate-300">
            {currentIndex + 1} / {ERAS.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === ERAS.length - 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition-colors border border-slate-700"
            aria-label="Next Era"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Timeline Strip */}
      <div
        ref={containerRef}
        className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scroll-smooth focus:outline-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') handleNext();
          if (e.key === 'ArrowLeft') handlePrev();
        }}
      >
        {ERAS.map((era) => {
          const isSelected = era.id === selectedEra.id;
          return (
            <button
              key={era.id}
              data-era-id={era.id}
              onClick={() => {
                retroAudio.playKeyClick();
                onSelectEra(era);
              }}
              className={`flex-shrink-0 text-left w-56 sm:w-64 p-3 rounded-xl transition-all duration-200 border flex flex-col justify-between group ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-500 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {/* Year range banner */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-cyan-500 text-black shadow'
                        : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                    }`}
                  >
                    {era.yearRange}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: era.accentHex }}
                  />
                </div>

                <h3 className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {era.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                  {era.subtitle}
                </p>
              </div>

              {/* Badges: Speed & Population */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1" title="Average connection speed">
                  <Gauge className="w-3 h-3 text-cyan-400" />
                  <span className="truncate max-w-[100px]">{era.avgSpeed.split(' ')[0]} {era.avgSpeed.split(' ')[1]}</span>
                </span>
                <span className="flex items-center gap-1" title="Global online population">
                  <Users className="w-3 h-3 text-amber-400" />
                  <span>{era.globalUsers.split(' ')[0]}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
