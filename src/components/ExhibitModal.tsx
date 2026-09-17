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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0e0e1a] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#141426] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {exhibit.year}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {currentEra?.name || 'Historical Artifact'}
            </span>
            <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {exhibit.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 transition-colors"
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
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-red-200 border border-slate-700 transition-colors"
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
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Category: {exhibit.category}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {exhibit.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1 leading-relaxed">
              {exhibit.summary}
            </p>
          </div>

          {/* Embedded Interactive Sandbox (if any) */}
          {exhibit.interactiveType === 'geocities' && <GeoCitiesSandbox />}
          {exhibit.interactiveType === 'myspace' && <MySpaceSandbox />}
          {exhibit.interactiveType === 'browser-wars' && <BrowserWarsChart />}
          {exhibit.interactiveType === 'fail-whale' && <FailWhaleExhibit />}

          {exhibit.interactiveType === 'dialup' && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-amber-300 font-mono">ACOUSTIC DEMO: 56K DIAL-UP HANDSHAKE</h4>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  Listen to the procedural modem negotiation across copper telephone cables.
                </p>
              </div>
              <button
                onClick={() => retroAudio.playDialUp()}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono flex items-center gap-1.5 shadow"
              >
                <Play className="w-3.5 h-3.5" /> PLAY 56K HANDSHAKE
              </button>
            </div>
          )}

          {exhibit.interactiveType === 'nudge' && (
            <div className="p-4 rounded-xl bg-fuchsia-950/30 border border-fuchsia-800/60 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-fuchsia-300 font-mono">TACTILE ALERT: MSN MESSENGER NUDGE</h4>
                <p className="text-xs text-fuchsia-200/80 mt-0.5">
                  Blasts the dual vibration buzzer and simulates window shake.
                </p>
              </div>
              <button
                onClick={() => retroAudio.playMsnNudge()}
                className="px-4 py-2 rounded-lg bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold text-xs font-mono flex items-center gap-1.5 shadow"
              >
                <Sparkles className="w-3.5 h-3.5" /> TRIGGER NUDGE BUZZER
              </button>
            </div>
          )}

          {/* Archival Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What It Was */}
            <div className="bg-[#141424] p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-bold mb-2">
                <BookOpen className="w-3.5 h-3.5" /> WHAT IT WAS
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {exhibit.whatItWas}
              </p>
            </div>

            {/* Why It Mattered */}
            <div className="bg-[#141424] p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" /> WHY IT MATTERED
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {exhibit.whyItMattered}
              </p>
            </div>
          </div>

          {/* Archival Quote (if present) */}
          {exhibit.archivalQuote && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
              <Quote className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <blockquote className="text-xs sm:text-sm text-slate-200 italic font-serif leading-relaxed">
                {exhibit.archivalQuote}
              </blockquote>
            </div>
          )}

          {/* Fun Fact / Trivia */}
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/60 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-200/90 leading-relaxed">
              <span className="font-bold font-mono text-emerald-300 mr-1.5">CURATOR'S TRIVIA:</span>
              {exhibit.funFact}
            </div>
          </div>

          {/* Tag Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
            {exhibit.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Bottom Stepper Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#141426] border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> PREV ARTIFACT
          </button>
          <span className="text-[11px] font-mono text-slate-400">
            {currentIndex + 1} of {allExhibits.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === allExhibits.length - 1}
            className="flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            NEXT ARTIFACT <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
