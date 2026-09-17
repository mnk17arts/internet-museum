import { useEffect, useState } from 'react';
import { type Exhibit } from '../data/exhibits';
import { ERAS } from '../data/eras';
import { retroAudio } from '../audio/soundSynthesizer';
import { GeoCitiesSandbox } from './exhibits/GeoCitiesSandbox';
import { MySpaceSandbox } from './exhibits/MySpaceSandbox';
import { BrowserWarsChart } from './exhibits/BrowserWarsChart';
import { FailWhaleExhibit } from './exhibits/FailWhaleExhibit';
import { X, Share2, Check, Sparkles, BookOpen, Quote, Lightbulb, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface ExhibitModalProps {
  exhibit: Exhibit | null;
  onClose: () => void;
  onSelectExhibit: (ex: Exhibit) => void;
  allExhibits: Exhibit[];
}

export function ExhibitModal({ exhibit, onClose, onSelectExhibit, allExhibits }: ExhibitModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!exhibit) return null;

  const currentEra = ERAS.find((e) => e.id === exhibit.eraId);
  const currentIndex = allExhibits.findIndex((e) => e.id === exhibit.id);

  const handleShare = () => {
    retroAudio.playKeyClick();
    const url = new URL(window.location.href);
    url.searchParams.set('exhibit', exhibit.id);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    if (currentIndex < allExhibits.length - 1) {
      retroAudio.playKeyClick();
      onSelectExhibit(allExhibits[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      retroAudio.playKeyClick();
      onSelectExhibit(allExhibits[currentIndex - 1]);
    }
  };

  const eraId = exhibit.eraId;
  const isDawn = eraId === 'dawn-1991-1995';
  const isWildWest = eraId === 'wildwest-1996-2000';
  const isWeb2 = eraId === 'flash-social-2001-2006';
  const isSkeuo = eraId === 'skeuomorphic-mobile-2007-2014';
  const isFlat = eraId === 'flat-algorithmic-2015-2020';

  // 1. Modal Dialog Container
  const dialogClass = isDawn
    ? 'relative w-full max-w-4xl bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-black border-r-black shadow-[6px_6px_0px_#000000] font-serif rounded-none flex flex-col my-auto max-h-[90vh]'
    : isWildWest
    ? 'relative w-full max-w-4xl bg-[#ece9d8] text-black border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] shadow-[6px_6px_0px_#202020] font-sans rounded-none flex flex-col my-auto max-h-[90vh]'
    : isWeb2
    ? 'relative w-full max-w-4xl bg-[#ffffff] text-[#1a2a3a] border-2 border-[#3895e8] rounded-2xl shadow-[0_20px_50px_rgba(0,102,204,0.3)] font-fun flex flex-col my-auto max-h-[90vh] overflow-hidden'
    : isSkeuo
    ? 'relative w-full max-w-4xl era-skeuomorphic-root bg-[#24262d] text-stone-100 border-2 border-[#454954] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] skeuomorphic-stitch font-sans flex flex-col my-auto max-h-[90vh] overflow-hidden'
    : isFlat
    ? 'relative w-full max-w-4xl bg-[#161a24] text-slate-100 border border-slate-800 rounded-2xl shadow-2xl font-sans flex flex-col my-auto max-h-[90vh] overflow-hidden'
    : 'relative w-full max-w-4xl bg-[#080914]/95 backdrop-blur-2xl text-slate-100 border border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] font-display flex flex-col my-auto max-h-[90vh] overflow-hidden';

  // 2. Titlebar Header
  const headerClass = isDawn
    ? 'flex items-center justify-between px-3 py-2 bg-[#000080] text-white border-b-2 border-[#808080]'
    : isWildWest
    ? 'flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#000080] via-[#000099] to-[#1084d0] text-white border-b-2 border-white'
    : isWeb2
    ? 'flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#2a68b2] to-[#1a4a82] text-white border-b-2 border-[#123661]'
    : isSkeuo
    ? 'flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#4a4d56] to-[#2c2e35] text-stone-100 border-b-2 border-black/80 shadow-md'
    : isFlat
    ? 'flex items-center justify-between px-4 py-3 bg-[#12151f] text-slate-100 border-b border-slate-800'
    : 'flex items-center justify-between px-4 py-3 bg-slate-900/60 backdrop-blur-xl border-b border-cyan-500/30';

  const headerYearBadge = isDawn
    ? 'win95-sunken bg-white text-black font-serif px-2 py-0.5 text-xs font-bold'
    : isWildWest
    ? 'bg-white text-[#000080] font-sans font-bold px-2 py-0.5 text-xs border border-stone-600'
    : isWeb2
    ? 'web2-glossy-orange text-white rounded-full font-sans text-xs px-2.5 py-0.5 shadow'
    : isSkeuo
    ? 'skeuomorphic-glass-btn text-white rounded font-mono text-xs px-2.5 py-0.5 shadow'
    : isFlat
    ? 'bg-violet-600 text-white rounded font-mono text-xs px-2.5 py-0.5'
    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full font-mono text-xs px-2.5 py-0.5';

  const closeBtnClass = isDawn || isWildWest
    ? 'win95-btn text-black font-bold w-6 h-6 flex items-center justify-center p-0'
    : isWeb2
    ? 'bg-gradient-to-b from-[#ff5555] to-[#cc2222] text-white rounded-full p-1.5 border border-white/60 hover:brightness-110 shadow'
    : isSkeuo
    ? 'bg-gradient-to-b from-[#444] to-[#222] text-stone-300 rounded-lg p-1.5 border border-black/80 hover:brightness-125 shadow-inner'
    : isFlat
    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg p-1.5'
    : 'bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-red-200 border border-slate-700 rounded-lg p-1.5';

  const shareBtnClass = isDawn || isWildWest
    ? 'win95-btn text-black text-xs px-2.5 py-1 flex items-center gap-1 font-bold'
    : isWeb2
    ? 'web2-glossy-btn text-white rounded-full text-xs font-bold px-3 py-1 shadow flex items-center gap-1'
    : isSkeuo
    ? 'skeuomorphic-glass-btn text-white rounded-lg text-xs font-bold px-3 py-1 shadow flex items-center gap-1'
    : isFlat
    ? 'bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-medium px-3 py-1 flex items-center gap-1'
    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-mono px-2.5 py-1 flex items-center gap-1';

  // 3. Body Typography & Container
  const titleClass = isDawn
    ? 'text-xl sm:text-2xl font-bold text-[#000080] font-serif tracking-normal'
    : isWildWest
    ? 'text-xl sm:text-2xl font-bold text-[#0000ee] font-sans hover:underline tracking-tight'
    : isWeb2
    ? 'text-xl sm:text-2xl font-bold text-[#0055b3] font-fun tracking-tight'
    : isSkeuo
    ? 'text-xl sm:text-2xl font-bold text-white font-sans tracking-tight text-letterpress-dark'
    : isFlat
    ? 'text-xl sm:text-2xl font-bold text-slate-100 font-sans tracking-tight'
    : 'text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 font-display tracking-tight';

  const summaryClass = isDawn
    ? 'text-sm sm:text-base text-stone-900 font-serif mt-1 leading-relaxed'
    : isWildWest
    ? 'text-sm sm:text-base text-stone-800 font-sans mt-1 leading-relaxed'
    : isWeb2
    ? 'text-sm sm:text-base text-[#334455] font-sans mt-1 leading-relaxed'
    : isSkeuo
    ? 'text-sm sm:text-base text-stone-300 font-sans mt-1 leading-relaxed'
    : isFlat
    ? 'text-sm sm:text-base text-slate-400 font-sans mt-1 leading-relaxed'
    : 'text-sm sm:text-base text-slate-300 font-sans mt-1 leading-relaxed';

  const categoryBadgeClass = isDawn
    ? 'win95-sunken bg-white text-black font-mono text-xs px-2 py-0.5 font-bold'
    : isWildWest
    ? 'bg-[#003399] text-white font-sans text-xs px-2.5 py-0.5 font-bold shadow-[1px_1px_0px_#000]'
    : isWeb2
    ? 'web2-glossy-btn text-white rounded-full font-sans text-xs px-2.5 py-0.5 shadow'
    : isSkeuo
    ? 'bg-gradient-to-b from-stone-600 to-stone-800 text-stone-200 border border-black/50 rounded font-mono text-xs px-2.5 py-0.5 shadow-inner'
    : isFlat
    ? 'bg-slate-800 text-slate-300 rounded font-mono text-xs px-2.5 py-0.5'
    : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 rounded-full font-mono text-xs px-2.5 py-0.5';

  // 4. Sub-cards (What it was / Why it mattered)
  const cardBoxClass = isDawn
    ? 'win95-sunken bg-white text-black border-2 border-t-black border-l-black border-b-white border-r-white p-4 font-serif'
    : isWildWest
    ? 'bg-white text-black border-2 border-t-stone-600 border-l-stone-600 border-b-white border-r-white p-4 shadow-[1px_1px_0px_#808080]'
    : isWeb2
    ? 'bg-[#f0f6fc] text-[#1a2a3a] border-2 border-[#c2dcf0] rounded-xl p-4 shadow-sm'
    : isSkeuo
    ? 'bg-gradient-to-b from-[#fffef7] to-[#f4f1e6] text-[#2c2b28] border-2 border-[#c4beaa] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_#ffffff]'
    : isFlat
    ? 'bg-[#1a1e2b] text-slate-200 border border-slate-800 rounded-xl p-4'
    : 'bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4';

  const cardHeaderClass = isDawn
    ? 'text-[#000080] font-bold font-serif text-xs mb-2 flex items-center gap-1.5'
    : isWildWest
    ? 'text-[#003399] font-bold font-sans text-xs mb-2 flex items-center gap-1.5'
    : isWeb2
    ? 'text-[#0066cc] font-bold font-fun text-xs mb-2 flex items-center gap-1.5'
    : isSkeuo
    ? 'text-[#1f2024] font-bold font-sans text-xs mb-2 flex items-center gap-1.5 text-letterpress-light'
    : isFlat
    ? 'text-violet-400 font-medium font-sans text-xs mb-2 flex items-center gap-1.5'
    : 'text-cyan-400 font-bold font-mono text-xs mb-2 flex items-center gap-1.5';

  const cardTextClass = isDawn
    ? 'text-stone-800 font-serif text-xs leading-relaxed'
    : isWildWest
    ? 'text-stone-700 font-sans text-xs leading-relaxed'
    : isWeb2
    ? 'text-[#445566] font-sans text-xs leading-relaxed'
    : isSkeuo
    ? 'text-[#55524b] font-sans text-xs leading-relaxed'
    : isFlat
    ? 'text-slate-400 font-sans text-xs leading-relaxed'
    : 'text-slate-300 font-sans text-xs leading-relaxed';

  // 5. Quote Box
  const quoteBoxClass = isDawn
    ? 'win95-box bg-[#d4d0c8] text-black border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] p-3 text-xs italic font-serif flex items-start gap-2.5'
    : isWildWest
    ? 'bg-[#ffffeb] text-[#333300] border-2 border-[#cccc99] p-3 text-xs italic font-serif flex items-start gap-2.5'
    : isWeb2
    ? 'bg-[#fff8ee] text-[#7a4800] border-2 border-[#ffdda0] rounded-xl p-3 text-xs italic font-serif flex items-start gap-2.5'
    : isSkeuo
    ? 'bg-[#2c2e36] text-stone-200 border border-black/60 rounded-xl p-3 text-xs italic font-serif flex items-start gap-2.5 shadow-inner'
    : isFlat
    ? 'bg-[#191d29] text-slate-300 border border-slate-800 rounded-xl p-3 text-xs italic font-serif flex items-start gap-2.5'
    : 'bg-slate-900/60 border border-slate-800 rounded-2xl p-3 text-xs italic font-serif flex items-start gap-2.5';

  // 6. Trivia Box
  const triviaBoxClass = isDawn
    ? 'win95-box bg-[#e0ded8] text-black border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] p-3 text-xs flex items-start gap-2.5'
    : isWildWest
    ? 'bg-[#eef3fb] text-black border-2 border-[#003399] p-3 text-xs flex items-start gap-2.5'
    : isWeb2
    ? 'bg-[#eef8f0] text-[#185e2b] border-2 border-[#b0e2bf] rounded-xl p-3 text-xs flex items-start gap-2.5'
    : isSkeuo
    ? 'bg-[#1c2e24] text-emerald-200 border border-emerald-800/80 rounded-xl p-3 text-xs flex items-start gap-2.5 shadow-inner'
    : isFlat
    ? 'bg-[#12231c] text-emerald-300 border border-emerald-900 rounded-xl p-3 text-xs flex items-start gap-2.5'
    : 'bg-emerald-950/30 border border-emerald-900/60 rounded-2xl p-3 text-xs flex items-start gap-2.5';

  // 7. Tag Badges
  const tagBadgeClass = isDawn
    ? 'win95-sunken bg-white text-black font-mono text-[11px] px-2 py-0.5'
    : isWildWest
    ? 'bg-white text-[#000080] border border-stone-400 font-sans text-[11px] px-2 py-0.5 shadow-[1px_1px_0px_#888]'
    : isWeb2
    ? 'bg-white text-[#0066cc] border border-[#b5d5f5] rounded-full font-sans text-[11px] px-2.5 py-0.5 shadow-sm'
    : isSkeuo
    ? 'bg-gradient-to-b from-[#3a3d46] to-[#25272e] text-stone-300 border border-black/60 rounded font-sans text-[11px] px-2 py-0.5 shadow-inner'
    : isFlat
    ? 'bg-[#12151f] text-slate-400 border border-slate-800 rounded font-sans text-[11px] px-2 py-0.5'
    : 'bg-slate-900 text-slate-400 border border-slate-800 rounded-full font-mono text-[11px] px-2.5 py-0.5';

  // 8. Footer Bar & Steppers
  const footerClass = isDawn
    ? 'flex items-center justify-between px-4 py-2.5 bg-[#c0c0c0] text-black border-t-2 border-t-[#808080] border-b-white'
    : isWildWest
    ? 'flex items-center justify-between px-4 py-2.5 bg-[#dcd8c4] text-black border-t-2 border-stone-500'
    : isWeb2
    ? 'flex items-center justify-between px-4 py-3 bg-[#ebf4fc] text-[#1a2a3a] border-t border-[#c2dcf0]'
    : isSkeuo
    ? 'flex items-center justify-between px-4 py-3 bg-[#1a1b20] text-stone-400 border-t-2 border-black/80'
    : isFlat
    ? 'flex items-center justify-between px-4 py-3 bg-[#12151f] text-slate-400 border-t border-slate-800'
    : 'flex items-center justify-between px-4 py-3 bg-slate-950/80 backdrop-blur-xl text-slate-400 border-t border-cyan-500/20';

  const navBtnClass = isDawn || isWildWest
    ? 'win95-btn text-black font-sans text-xs px-3 py-1.5 font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1'
    : isWeb2
    ? 'web2-glossy-btn text-white rounded-full text-xs font-bold px-4 py-1.5 shadow disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1'
    : isSkeuo
    ? 'skeuomorphic-glass-btn text-white rounded-lg text-xs font-bold px-4 py-1.5 shadow disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1'
    : isFlat
    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium px-4 py-1.5 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1'
    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono px-4 py-1.5 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className={dialogClass}>
        {/* Modal Top Header Bar */}
        <div className={headerClass}>
          <div className="flex items-center gap-2">
            <span className={headerYearBadge}>
              {exhibit.year}
            </span>
            <span className="text-xs font-bold opacity-80">
              {currentEra?.name || 'Historical Artifact'}
            </span>
            <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded opacity-75 font-mono">
              {exhibit.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className={shareBtnClass}
              title="Copy link to this exhibit"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'COPIED!' : 'SHARE'}</span>
            </button>
            <button
              onClick={() => {
                retroAudio.playKeyClick();
                onClose();
              }}
              className={closeBtnClass}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Title & Summary */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={categoryBadgeClass}>
                Category: {exhibit.category}
              </span>
            </div>
            <h1 className={titleClass}>
              {exhibit.title}
            </h1>
            <p className={summaryClass}>
              {exhibit.summary}
            </p>
          </div>

          {/* Embedded Interactive Sandbox (if any) */}
          {exhibit.interactiveType === 'geocities' && <GeoCitiesSandbox />}
          {exhibit.interactiveType === 'myspace' && <MySpaceSandbox />}
          {exhibit.interactiveType === 'browser-wars' && <BrowserWarsChart eraId={exhibit.eraId} />}
          {exhibit.interactiveType === 'fail-whale' && <FailWhaleExhibit />}

          {exhibit.interactiveType === 'dialup' && (
            <div className={`p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 ${
              isDawn || isWildWest
                ? 'bg-[#eef3fb] text-black border-2 border-[#003399]'
                : isWeb2
                ? 'bg-gradient-to-b from-[#ebf4fc] to-[#d8eaf8] text-[#1c3d5a] border-2 border-[#a8cfee]'
                : 'bg-amber-950/30 border border-amber-800/60 text-amber-200'
            }`}>
              <div>
                <h4 className="text-sm font-bold font-mono">ACOUSTIC DEMO: 56K DIAL-UP HANDSHAKE</h4>
                <p className="text-xs opacity-80 mt-0.5">
                  Listen to the procedural modem negotiation across copper telephone cables.
                </p>
              </div>
              <button
                onClick={() => retroAudio.playDialUp()}
                className={
                  isDawn || isWildWest
                    ? 'win95-btn text-black font-bold text-xs px-4 py-2 flex items-center gap-1.5'
                    : isWeb2
                    ? 'web2-glossy-orange text-white font-bold text-xs rounded-full px-4 py-2 flex items-center gap-1.5 shadow'
                    : isSkeuo
                    ? 'skeuomorphic-glass-btn text-white font-bold text-xs rounded-lg px-4 py-2 flex items-center gap-1.5 shadow'
                    : 'px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono flex items-center gap-1.5 shadow'
                }
              >
                <Play className="w-3.5 h-3.5" /> PLAY 56K HANDSHAKE
              </button>
            </div>
          )}

          {exhibit.interactiveType === 'nudge' && (
            <div className={`p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 ${
              isDawn || isWildWest
                ? 'bg-[#fbeefb] text-black border-2 border-[#990099]'
                : isWeb2
                ? 'bg-gradient-to-b from-[#fcebf8] to-[#f8d8f0] text-[#5a1c4d] border-2 border-[#eea8df]'
                : 'bg-fuchsia-950/30 border border-fuchsia-800/60 text-fuchsia-200'
            }`}>
              <div>
                <h4 className="text-sm font-bold font-mono">TACTILE ALERT: MSN MESSENGER NUDGE</h4>
                <p className="text-xs opacity-80 mt-0.5">
                  Blasts the dual vibration buzzer and simulates window shake.
                </p>
              </div>
              <button
                onClick={() => retroAudio.playMsnNudge()}
                className={
                  isDawn || isWildWest
                    ? 'win95-btn text-black font-bold text-xs px-4 py-2 flex items-center gap-1.5'
                    : isWeb2
                    ? 'web2-glossy-btn text-white font-bold text-xs rounded-full px-4 py-2 flex items-center gap-1.5 shadow'
                    : isSkeuo
                    ? 'skeuomorphic-glass-btn text-white font-bold text-xs rounded-lg px-4 py-2 flex items-center gap-1.5 shadow'
                    : 'px-4 py-2 rounded-lg bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold text-xs font-mono flex items-center gap-1.5 shadow'
                }
              >
                <Sparkles className="w-3.5 h-3.5" /> TRIGGER NUDGE BUZZER
              </button>
            </div>
          )}

          {/* Archival Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What It Was */}
            <div className={cardBoxClass}>
              <div className={cardHeaderClass}>
                <BookOpen className="w-3.5 h-3.5" /> WHAT IT WAS
              </div>
              <p className={cardTextClass}>
                {exhibit.whatItWas}
              </p>
            </div>

            {/* Why It Mattered */}
            <div className={cardBoxClass}>
              <div className={cardHeaderClass}>
                <Sparkles className="w-3.5 h-3.5" /> WHY IT MATTERED
              </div>
              <p className={cardTextClass}>
                {exhibit.whyItMattered}
              </p>
            </div>
          </div>

          {/* Archival Quote (if present) */}
          {exhibit.archivalQuote && (
            <div className={quoteBoxClass}>
              <Quote className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-80" />
              <blockquote className="leading-relaxed">
                {exhibit.archivalQuote}
              </blockquote>
            </div>
          )}

          {/* Fun Fact / Trivia */}
          <div className={triviaBoxClass}>
            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-80" />
            <div className="leading-relaxed">
              <span className="font-bold mr-1.5">CURATOR'S TRIVIA:</span>
              {exhibit.funFact}
            </div>
          </div>

          {/* Tag Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-current/15">
            {exhibit.tags.map((tag) => (
              <span
                key={tag}
                className={tagBadgeClass}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Bottom Stepper Bar */}
        <div className={footerClass}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={navBtnClass}
          >
            <ChevronLeft className="w-4 h-4" /> PREV ARTIFACT
          </button>
          <span className="text-[11px] font-mono opacity-80">
            {currentIndex + 1} of {allExhibits.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === allExhibits.length - 1}
            className={navBtnClass}
          >
            NEXT ARTIFACT <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
