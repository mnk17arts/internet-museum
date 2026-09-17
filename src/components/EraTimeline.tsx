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

  const getStepperBtnClass = () => {
    if (selectedEra.id === 'dawn-1991-1995' || selectedEra.id === 'wildwest-1996-2000') {
      return 'win95-btn text-black p-2 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed';
    }
    if (selectedEra.id === 'flash-social-2001-2006') {
      return 'web2-glossy-btn text-white p-2 rounded-lg text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed';
    }
    if (selectedEra.id === 'skeuomorphic-mobile-2007-2014') {
      return 'skeuomorphic-glass-btn text-white p-2 rounded-lg text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed';
    }
    return 'p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition-colors border border-slate-700';
  };

  const getTimelineCardClass = (_eraItem: Era, isSelected: boolean) => {
    if (selectedEra.id === 'dawn-1991-1995') {
      return isSelected
        ? 'win95-sunken bg-white text-black p-3 font-serif scale-[1.01]'
        : 'win95-box bg-[#c0c0c0] text-black p-3 font-serif hover:bg-[#d0d0d0]';
    }
    if (selectedEra.id === 'wildwest-1996-2000') {
      return isSelected
        ? 'bg-[#eef3fb] text-black border-2 border-[#003399] shadow-[2px_2px_0px_#003399] p-3 font-sans scale-[1.01]'
        : 'bg-[#f4f2e6] text-black border-2 border-t-white border-l-white border-b-stone-500 border-r-stone-500 shadow-[1px_1px_0px_#808080] p-3 font-sans hover:bg-white';
    }
    if (selectedEra.id === 'flash-social-2001-2006') {
      return isSelected
        ? 'bg-gradient-to-b from-[#ebf4fc] to-[#d8eaf8] text-[#1a2a3a] border-2 border-[#3895e8] shadow-[0_4px_12px_rgba(0,102,204,0.2)] rounded-xl scale-[1.02] p-3 font-fun'
        : 'bg-white text-[#2a3a4a] border-2 border-[#d0e2f2] rounded-xl hover:border-[#3895e8] hover:shadow-sm shadow-[0_2px_6px_rgba(0,0,0,0.04)] p-3 font-fun';
    }
    if (selectedEra.id === 'skeuomorphic-mobile-2007-2014') {
      return isSelected
        ? 'bg-gradient-to-b from-[#3a3d46] to-[#22242b] text-white border-2 border-[#4d515c] rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] skeuomorphic-stitch scale-[1.02] p-3 font-sans'
        : 'bg-gradient-to-b from-[#2a2c33] to-[#1c1d22] text-stone-300 border border-black/60 rounded-xl hover:border-stone-500 shadow-[0_3px_8px_rgba(0,0,0,0.5)] p-3 font-sans';
    }
    if (selectedEra.id === 'flat-algorithmic-2015-2020') {
      return isSelected
        ? 'bg-[#1e2330] text-white border-2 border-violet-500 rounded-xl shadow-none scale-[1.02] p-3 font-sans'
        : 'bg-[#151822] text-slate-400 border border-slate-800 rounded-xl hover:border-slate-700 hover:text-slate-200 p-3 font-sans';
    }
    return isSelected
      ? 'bg-slate-900/90 text-white border-cyan-500 shadow-lg shadow-cyan-500/10 scale-[1.02] p-3 rounded-xl font-display'
      : 'bg-slate-900/40 text-slate-300 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 p-3 rounded-xl font-display';
  };

  const getYearBadgeClass = (isSelected: boolean) => {
    if (selectedEra.id === 'dawn-1991-1995') {
      return isSelected
        ? 'win95-sunken bg-white text-black font-serif px-2 py-0.5'
        : 'win95-box bg-[#c0c0c0] text-black font-serif px-2 py-0.5';
    }
    if (selectedEra.id === 'wildwest-1996-2000') {
      return isSelected
        ? 'bg-[#003399] text-white font-sans px-2 py-0.5'
        : 'bg-stone-300 text-black font-sans px-2 py-0.5';
    }
    if (selectedEra.id === 'flash-social-2001-2006') {
      return isSelected
        ? 'web2-glossy-orange text-white rounded-full font-sans px-2 py-0.5 shadow'
        : 'web2-glossy-btn text-white rounded-full font-sans px-2 py-0.5';
    }
    if (selectedEra.id === 'skeuomorphic-mobile-2007-2014') {
      return isSelected
        ? 'skeuomorphic-glass-btn text-white rounded font-mono px-2 py-0.5 shadow'
        : 'bg-gradient-to-b from-stone-600 to-stone-800 text-stone-200 border border-stone-500 rounded font-mono px-2 py-0.5';
    }
    if (selectedEra.id === 'flat-algorithmic-2015-2020') {
      return isSelected
        ? 'bg-violet-600 text-white rounded font-mono px-2 py-0.5'
        : 'bg-slate-800 text-slate-300 rounded font-mono px-2 py-0.5';
    }
    return isSelected
      ? 'bg-cyan-500 text-black shadow font-mono px-2 py-0.5 rounded'
      : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700 font-mono px-2 py-0.5 rounded';
  };

  return (
    <div className={`w-full relative p-3 sm:p-4 transition-all duration-300 ${selectedEra.timelineContainerClass}`}>
      {/* Header Info with Quick Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 flex items-center justify-center ${
            selectedEra.id === 'dawn-1991-1995'
              ? 'win95-box bg-[#c0c0c0] text-black font-bold'
              : selectedEra.id === 'wildwest-1996-2000'
              ? 'win95-box bg-[#000080] text-white font-bold'
              : selectedEra.id === 'flash-social-2001-2006'
              ? 'web2-glossy-btn text-white rounded-lg'
              : selectedEra.id === 'skeuomorphic-mobile-2007-2014'
              ? 'skeuomorphic-glass-btn text-white rounded-lg'
              : 'rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
          }`}>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold flex items-center gap-2">
              <span>CYBERSPACE TIME MACHINE</span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                selectedEra.id === 'dawn-1991-1995'
                  ? 'win95-sunken bg-white text-black font-bold'
                  : selectedEra.id === 'wildwest-1996-2000'
                  ? 'bg-[#003399] text-white font-sans font-bold'
                  : selectedEra.id === 'flash-social-2001-2006'
                  ? 'web2-glossy-orange text-white font-bold'
                  : selectedEra.id === 'skeuomorphic-mobile-2007-2014'
                  ? 'bg-stone-800 text-stone-200 border border-black/50 text-letterpress-light'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}>
                1991 — 2026
              </span>
            </h2>
            <p className="text-xs opacity-75 hidden sm:block">
              Scrub through 35 years of web archaeology. Select an era to warp the museum.
            </p>
          </div>
        </div>

        {/* Stepper Buttons for Touch & Desktop */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={getStepperBtnClass()}
            aria-label="Previous Era"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs px-2 opacity-80">
            {currentIndex + 1} / {ERAS.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === ERAS.length - 1}
            className={getStepperBtnClass()}
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
              className={`flex-shrink-0 text-left w-56 sm:w-64 transition-all duration-200 border flex flex-col justify-between group ${getTimelineCardClass(era, isSelected)}`}
            >
              {/* Year range banner */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-xs font-bold ${getYearBadgeClass(isSelected)}`}>
                    {era.yearRange}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: era.accentHex }}
                  />
                </div>

                <h3 className="text-sm font-bold truncate">
                  {era.name}
                </h3>
                <p className="text-[11px] opacity-75 line-clamp-2 mt-0.5 leading-snug">
                  {era.subtitle}
                </p>
              </div>

              {/* Badges: Speed & Population */}
              <div className="mt-3 pt-2 border-t border-current/15 flex items-center justify-between text-[10px] opacity-80 font-mono">
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
