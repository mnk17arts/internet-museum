import { useState } from 'react';
import { retroAudio } from '../../audio/soundSynthesizer';
import { ShieldAlert, Zap } from 'lucide-react';

interface EraMarketShare {
  year: number;
  label: string;
  netscape: number;
  ie: number;
  firefox: number;
  chrome: number;
  others: number;
  description: string;
  highlight: string;
}

const MARKET_SHARE_DATA: EraMarketShare[] = [
  {
    year: 1995,
    label: 'Netscape Dominance',
    netscape: 80,
    ie: 5,
    firefox: 0,
    chrome: 0,
    others: 15,
    description: 'Marc Andreessen’s Netscape Navigator captures 80% of global web traffic.',
    highlight: 'Netscape files the iconic IPO that launches the Dot-Com bubble.',
  },
  {
    year: 1998,
    label: 'The Microsoft Blitzkrieg',
    netscape: 40,
    ie: 55,
    firefox: 0,
    chrome: 0,
    others: 5,
    description: 'Microsoft bundles Internet Explorer 4 into Windows for free, triggering antitrust lawsuits.',
    highlight: 'IE surpasses Netscape for the first time in history.',
  },
  {
    year: 2003,
    label: 'The IE6 Monopoly Reign',
    netscape: 2,
    ie: 95,
    firefox: 0,
    chrome: 0,
    others: 3,
    description: 'Internet Explorer reaches an unprecedented 95% market share. Development stalls for 5 years.',
    highlight: 'Web developers endure a decade of non-standard CSS bugs and proprietary ActiveX controls.',
  },
  {
    year: 2007,
    label: 'Firefox’s Open-Source Rebellion',
    netscape: 0,
    ie: 75,
    firefox: 20,
    chrome: 0,
    others: 5,
    description: 'Mozilla Firefox rises from the ashes of Netscape code with tabbed browsing and extensions.',
    highlight: 'Millions sign up to download Firefox 1.0; tabbed browsing becomes standard.',
  },
  {
    year: 2012,
    label: 'Chrome’s Speed Revolution',
    netscape: 0,
    ie: 32,
    firefox: 23,
    chrome: 35,
    others: 10,
    description: 'Google Chrome’s V8 JavaScript engine and multi-process sandbox overtake Internet Explorer.',
    highlight: 'Chrome officially becomes the #1 browser on Earth.',
  },
  {
    year: 2026,
    label: 'Modern Engine Hegemony & Standards',
    netscape: 0,
    ie: 0,
    firefox: 4,
    chrome: 66,
    others: 30, // Safari + Edge (Chromium) + Arc
    description: 'Chromium powers 75%+ of desktop browsers, while Safari dominates iOS mobile.',
    highlight: 'Edge converts to Chromium; Internet Explorer is officially buried.',
  },
];

interface BrowserWarsChartProps {
  eraId?: string;
}

export function BrowserWarsChart({ eraId }: BrowserWarsChartProps) {
  const [selectedIndex, setSelectedIndex] = useState(2); // default IE6 monopoly
  const current = MARKET_SHARE_DATA[selectedIndex];

  const handleSelectYear = (idx: number) => {
    retroAudio.playKeyClick();
    setSelectedIndex(idx);
  };

  const isWin95 = eraId === 'dawn-1991-1995' || eraId === 'wildwest-1996-2000';
  const isWeb2 = eraId === 'flash-social-2001-2006';
  const isSkeuo = eraId === 'skeuomorphic-mobile-2007-2014';

  const containerClass = isWin95
    ? 'w-full bg-[#f8f7f0] p-4 sm:p-6 border-2 border-stone-500 text-black max-w-3xl mx-auto my-4 shadow-[2px_2px_0px_#404040]'
    : isWeb2
    ? 'w-full bg-white p-4 sm:p-6 rounded-2xl border-2 border-[#b5d5f5] text-[#1a2a3a] max-w-3xl mx-auto my-4 shadow-sm'
    : isSkeuo
    ? 'w-full bg-gradient-to-b from-[#34363e] to-[#22242a] p-4 sm:p-6 rounded-2xl border border-black/80 text-stone-100 max-w-3xl mx-auto my-4 shadow-xl skeuomorphic-stitch'
    : 'w-full bg-[#10101c] p-4 sm:p-6 rounded-xl border border-blue-900/50 text-slate-200 max-w-3xl mx-auto my-4 shadow-2xl';

  const headerBorderClass = isWin95
    ? 'border-b-2 border-stone-300'
    : isWeb2
    ? 'border-b-2 border-[#d0e2f2]'
    : isSkeuo
    ? 'border-b border-black/60'
    : 'border-b border-slate-800';

  const titleClass = isWin95
    ? 'text-base sm:text-lg font-bold text-[#000080] flex items-center gap-2 font-sans'
    : isWeb2
    ? 'text-base sm:text-lg font-bold text-[#0055b3] flex items-center gap-2 font-fun'
    : isSkeuo
    ? 'text-base sm:text-lg font-bold text-white flex items-center gap-2 text-letterpress-dark'
    : 'text-base sm:text-lg font-bold text-white flex items-center gap-2';

  const subtitleClass = isWin95
    ? 'text-xs text-stone-600 font-sans'
    : isWeb2
    ? 'text-xs text-[#556677] font-sans'
    : isSkeuo
    ? 'text-xs text-stone-300 font-sans'
    : 'text-xs text-slate-400';

  const badgeYearClass = isWin95
    ? 'bg-[#000080] text-white font-mono text-xs px-2.5 py-1'
    : isWeb2
    ? 'web2-glossy-orange text-white rounded-full font-sans text-xs px-3 py-1 shadow'
    : isSkeuo
    ? 'skeuomorphic-glass-btn text-white rounded font-mono text-xs px-2.5 py-1 shadow'
    : 'font-mono text-xs px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40';

  const getYearBtnClass = (idx: number) => {
    const isSelected = selectedIndex === idx;
    if (isWin95) {
      return isSelected
        ? 'bg-[#000080] text-white border-2 border-black font-bold py-1.5 px-2 text-xs font-mono text-center shadow-inner'
        : 'win95-btn text-black py-1.5 px-2 text-xs font-mono text-center';
    }
    if (isWeb2) {
      return isSelected
        ? 'web2-glossy-btn text-white font-bold py-1.5 px-2 rounded-full text-xs font-sans text-center shadow'
        : 'bg-[#f0f6fc] text-[#0066cc] border border-[#c2dcf0] py-1.5 px-2 rounded-full text-xs font-sans text-center hover:bg-[#e0edf8]';
    }
    if (isSkeuo) {
      return isSelected
        ? 'skeuomorphic-glass-btn text-white font-bold py-1.5 px-2 rounded-lg text-xs font-mono text-center shadow-inner'
        : 'bg-[#25272e] text-stone-300 border border-black/60 py-1.5 px-2 rounded-lg text-xs font-mono text-center hover:brightness-125';
    }
    return isSelected
      ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-lg shadow-blue-500/20 scale-105 py-1.5 px-2 rounded-lg text-xs font-mono text-center border'
      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800 py-1.5 px-2 rounded-lg text-xs font-mono text-center border';
  };

  const barBoxClass = isWin95
    ? 'win95-sunken bg-white p-4 border-2 border-t-black border-l-black border-b-white border-r-white mb-4 text-black'
    : isWeb2
    ? 'bg-[#f4f9fd] p-4 rounded-xl border border-[#c2dcf0] mb-4 text-[#1a2a3a]'
    : isSkeuo
    ? 'bg-[#18191e] p-4 rounded-xl border border-black/80 mb-4 shadow-inner text-stone-200'
    : 'bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4';

  const barBgClass = isWin95
    ? 'h-7 w-full bg-stone-200 rounded-none overflow-hidden flex shadow-inner border border-stone-500'
    : isWeb2
    ? 'h-7 w-full bg-stone-100 rounded-full overflow-hidden flex shadow-inner border border-[#b5d5f5]'
    : 'h-7 w-full bg-slate-900 rounded-lg overflow-hidden flex shadow-inner border border-slate-800';

  const legendTextClass = isWin95
    ? 'text-black font-sans'
    : isWeb2
    ? 'text-[#222222] font-sans'
    : isSkeuo
    ? 'text-stone-300 font-sans'
    : 'text-slate-300 font-mono';

  const narrativeBoxClass = isWin95
    ? 'bg-[#ffffeb] text-[#333300] p-3 border-2 border-[#cccc99] text-xs'
    : isWeb2
    ? 'bg-[#fff8ee] text-[#7a4800] p-3 rounded-xl border border-[#ffdda0] text-xs'
    : isSkeuo
    ? 'bg-[#282a32] text-stone-200 p-3 rounded-xl border border-black/60 text-xs shadow-inner'
    : 'bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs';

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className={`flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 ${headerBorderClass}`}>
        <div>
          <h3 className={titleClass}>
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <span>THE 30-YEAR BROWSER WARS ARENA</span>
          </h3>
          <p className={subtitleClass}>
            Select a turning point to witness the rise, monopoly, and downfall of browser giants.
          </p>
        </div>
        <span className={badgeYearClass}>
          Year: {current.year}
        </span>
      </div>

      {/* Year Selector Pills */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-5">
        {MARKET_SHARE_DATA.map((item, idx) => (
          <button
            key={item.year}
            onClick={() => handleSelectYear(idx)}
            className={`transition-all ${getYearBtnClass(idx)}`}
          >
            {item.year}
          </button>
        ))}
      </div>

      {/* Market Share Comparison Bar Stack */}
      <div className={barBoxClass}>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold opacity-80">GLOBAL BROWSER MARKET SHARE</span>
          <span className="font-bold text-blue-600">{current.label}</span>
        </div>

        {/* Multi-colored segmented bar */}
        <div className={barBgClass}>
          {current.netscape > 0 && (
            <div
              style={{ width: `${current.netscape}%` }}
              className="bg-fuchsia-600 flex items-center justify-center text-[11px] font-bold text-white transition-all duration-500"
              title={`Netscape: ${current.netscape}%`}
            >
              {current.netscape > 10 && `Netscape ${current.netscape}%`}
            </div>
          )}
          {current.ie > 0 && (
            <div
              style={{ width: `${current.ie}%` }}
              className="bg-blue-600 flex items-center justify-center text-[11px] font-bold text-white transition-all duration-500"
              title={`Internet Explorer: ${current.ie}%`}
            >
              {current.ie > 10 && `IE ${current.ie}%`}
            </div>
          )}
          {current.firefox > 0 && (
            <div
              style={{ width: `${current.firefox}%` }}
              className="bg-amber-600 flex items-center justify-center text-[11px] font-bold text-white transition-all duration-500"
              title={`Firefox: ${current.firefox}%`}
            >
              {current.firefox > 8 && `Firefox ${current.firefox}%`}
            </div>
          )}
          {current.chrome > 0 && (
            <div
              style={{ width: `${current.chrome}%` }}
              className="bg-emerald-600 flex items-center justify-center text-[11px] font-bold text-white transition-all duration-500"
              title={`Chrome: ${current.chrome}%`}
            >
              {current.chrome > 10 && `Chrome ${current.chrome}%`}
            </div>
          )}
          {current.others > 0 && (
            <div
              style={{ width: `${current.others}%` }}
              className="bg-purple-600 flex items-center justify-center text-[11px] font-bold text-white transition-all duration-500"
              title={`Others / Safari / Edge: ${current.others}%`}
            >
              {current.others > 10 && `Others ${current.others}%`}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className={`flex flex-wrap items-center gap-4 mt-3 text-xs ${legendTextClass}`}>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-fuchsia-600"></span>
            <span>Netscape: {current.netscape}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-600"></span>
            <span>IE: {current.ie}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-600"></span>
            <span>Firefox: {current.firefox}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-600"></span>
            <span>Chrome: {current.chrome}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-600"></span>
            <span>Safari/Other: {current.others}%</span>
          </div>
        </div>
      </div>

      {/* Historical Context Narrative */}
      <div className={narrativeBoxClass}>
        <p className="mb-1.5 leading-relaxed">{current.description}</p>
        <div className="flex items-start gap-1.5 font-bold text-[11px]">
          <Zap className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <span>Historical Flashpoint: {current.highlight}</span>
        </div>
      </div>
    </div>
  );
}
