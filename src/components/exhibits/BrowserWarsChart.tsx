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

export function BrowserWarsChart() {
  const [selectedIndex, setSelectedIndex] = useState(2); // default IE6 monopoly
  const current = MARKET_SHARE_DATA[selectedIndex];

  const handleSelectYear = (idx: number) => {
    retroAudio.playKeyClick();
    setSelectedIndex(idx);
  };

  return (
    <div className="w-full bg-[#10101c] p-4 sm:p-6 rounded-xl border border-blue-900/50 text-slate-200 max-w-3xl mx-auto my-4 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>THE 30-YEAR BROWSER WARS ARENA</span>
          </h3>
          <p className="text-xs text-slate-400">
            Select a turning point to witness the rise, monopoly, and downfall of browser giants.
          </p>
        </div>
        <span className="font-mono text-xs px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
          Year: {current.year}
        </span>
      </div>

      {/* Year Selector Pills */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-5">
        {MARKET_SHARE_DATA.map((item, idx) => (
          <button
            key={item.year}
            onClick={() => handleSelectYear(idx)}
            className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-all text-center border ${
              selectedIndex === idx
                ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-lg shadow-blue-500/20 scale-105'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {item.year}
          </button>
        ))}
      </div>

      {/* Market Share Comparison Bar Stack */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>GLOBAL BROWSER MARKET SHARE</span>
          <span className="text-cyan-400 font-bold">{current.label}</span>
        </div>

        {/* Multi-colored segmented bar */}
        <div className="h-7 w-full bg-slate-900 rounded-lg overflow-hidden flex shadow-inner border border-slate-800">
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
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono text-slate-300">
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
      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
        <p className="text-slate-200 mb-1.5 leading-relaxed">{current.description}</p>
        <div className="flex items-start gap-1.5 text-amber-300 font-mono text-[11px]">
          <Zap className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-400" />
          <span>Historical Flashpoint: {current.highlight}</span>
        </div>
      </div>
    </div>
  );
}
