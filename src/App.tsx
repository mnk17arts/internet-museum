import { useState, useMemo } from 'react';
import { ERAS, type Era } from './data/eras';
import { EXHIBITS, type Exhibit } from './data/exhibits';
import { retroAudio } from './audio/soundSynthesizer';
import { BrowserChrome, type BrowserType } from './components/BrowserChrome';
import { EraTimeline } from './components/EraTimeline';
import { Soundboard } from './components/Soundboard';
import { CuratorFilter, type CategoryFilter } from './components/CuratorFilter';
import { ExhibitCard } from './components/ExhibitCard';
import { ExhibitModal } from './components/ExhibitModal';
import { Tv, Globe, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import './App.css';

export function App() {
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const exhibitParam = params.get('exhibit');
    if (exhibitParam) {
      return EXHIBITS.find((e) => e.id === exhibitParam) || null;
    }
    return null;
  });

  const [selectedEra, setSelectedEra] = useState<Era>(() => {
    const params = new URLSearchParams(window.location.search);
    const eraParam = params.get('era');
    if (eraParam) {
      const found = ERAS.find((e) => e.id === eraParam);
      if (found) return found;
    }
    const exhibitParam = params.get('exhibit');
    if (exhibitParam) {
      const foundExhibit = EXHIBITS.find((e) => e.id === exhibitParam);
      if (foundExhibit) {
        const related = ERAS.find((e) => e.id === foundExhibit.eraId);
        if (related) return related;
      }
    }
    return ERAS[1]; // Default to Web 1.0 Wild West (1996-2000)
  });

  const [browserType, setBrowserType] = useState<BrowserType>(() => {
    const params = new URLSearchParams(window.location.search);
    const eraParam = params.get('era');
    if (eraParam) {
      const found = ERAS.find((e) => e.id === eraParam);
      if (found) return found.browserEra;
    }
    return ERAS[1].browserEra;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [isCrtEnabled, setIsCrtEnabled] = useState(false);
  const [isNudging, setIsNudging] = useState(false);
  const [showAllEras, setShowAllEras] = useState(false);
  const [visitorCount, setVisitorCount] = useState(284710);

  // Sync browser frame automatically when era changes (unless manually overridden)
  const handleSelectEra = (era: Era) => {
    setSelectedEra(era);
    setBrowserType(era.browserEra);
    const url = new URL(window.location.href);
    url.searchParams.set('era', era.id);
    window.history.replaceState({}, '', url.toString());
  };

  // Trigger MSN Messenger screen shake
  const handleTriggerNudge = () => {
    setIsNudging(true);
    setTimeout(() => setIsNudging(false), 600);
  };

  // Update URL param when exhibit changes
  const handleSelectExhibit = (ex: Exhibit | null) => {
    setSelectedExhibit(ex);
    const url = new URL(window.location.href);
    if (ex) {
      url.searchParams.set('exhibit', ex.id);
    } else {
      url.searchParams.delete('exhibit');
    }
    window.history.replaceState({}, '', url.toString());
  };

  // Filter exhibits
  const filteredExhibits = useMemo(() => {
    return EXHIBITS.filter((ex) => {
      // Era check (unless showAllEras is active or searching)
      if (!showAllEras && !searchQuery.trim() && ex.eraId !== selectedEra.id) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && ex.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ex.title.toLowerCase().includes(q);
        const matchSummary = ex.summary.toLowerCase().includes(q);
        const matchTags = ex.tags.some((t) => t.toLowerCase().includes(q));
        const matchWhat = ex.whatItWas.toLowerCase().includes(q);
        const matchWhy = ex.whyItMattered.toLowerCase().includes(q);
        return matchTitle || matchSummary || matchTags || matchWhat || matchWhy;
      }

      return true;
    });
  }, [selectedEra, selectedCategory, searchQuery, showAllEras]);

  // Surprise Me / Random Tour
  const handleSurpriseMe = () => {
    const randomEx = EXHIBITS[Math.floor(Math.random() * EXHIBITS.length)];
    handleSelectExhibit(randomEx);
    const relatedEra = ERAS.find((e) => e.id === randomEx.eraId);
    if (relatedEra) {
      setSelectedEra(relatedEra);
      setBrowserType(relatedEra.browserEra);
    }
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#00ffff', '#ff007f', '#ffff00'],
    });
  };

  // URL string for the browser chrome address bar
  const currentChromeUrl = useMemo(() => {
    if (selectedExhibit) {
      return `http://museum.cyber/artifacts/${selectedExhibit.id}.html`;
    }
    return `http://museum.cyber/eras/${selectedEra.id}/gallery.htm`;
  }, [selectedEra, selectedExhibit]);

  return (
    <div
      className={`min-h-screen bg-[#07070f] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black transition-colors ${
        isCrtEnabled ? 'crt-overlay crt-vignette' : ''
      } ${isNudging ? 'animate-nudge' : ''}`}
    >
      {/* Top Notification / Marquee Header Bar */}
      <header className="border-b border-slate-800/80 bg-[#0a0a14]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Series Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-fuchsia-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0d0d18] rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '18s' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-wider text-white font-display">
                  THE INTERNET MUSEUM
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  PROJECT #10
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Digital Archaeology & Culture Time Machine (1991–2026)
              </p>
            </div>
          </div>

          {/* Right Toolbar: Hit Counter, CRT Toggle, Audio Status */}
          <div className="flex items-center gap-2.5 ml-auto text-xs font-mono">
            {/* Odometer Hit Counter */}
            <div
              onClick={() => {
                retroAudio.playKeyClick();
                setVisitorCount((c) => c + 1);
              }}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 cursor-pointer hover:border-cyan-500/40"
              title="Click to advance digital hit counter"
            >
              <span className="text-[10px] text-slate-500">HITS:</span>
              <span className="text-cyan-400 font-pixel tracking-widest text-sm">
                #{String(visitorCount).padStart(7, '0')}
              </span>
            </div>

            {/* CRT Scanline Toggle */}
            <button
              onClick={() => {
                retroAudio.playKeyClick();
                setIsCrtEnabled(!isCrtEnabled);
              }}
              className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                isCrtEnabled
                  ? 'bg-emerald-950/50 text-emerald-300 border-emerald-700'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Toggle retro CRT scanlines and screen curvature"
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CRT: {isCrtEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* GitHub Series Link */}
            <a
              href="https://github.com/mnk17arts"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 text-slate-400 transition-colors"
              title="View Weird Web Projects Series"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6">
        {/* 1. Scrubbable Horizontal Era Timeline */}
        <section aria-label="Cyberspace Timeline">
          <EraTimeline selectedEra={selectedEra} onSelectEra={handleSelectEra} />
        </section>

        {/* 2. Interactive Audio Soundboard */}
        <section aria-label="Audio Soundboard">
          <Soundboard onNudgeTrigger={handleTriggerNudge} />
        </section>

        {/* 3. The Browser Chrome Frame Viewport */}
        <section aria-label="Historical Browser Viewport">
          <BrowserChrome
            browserType={browserType}
            onBrowserChange={setBrowserType}
            urlDisplay={currentChromeUrl}
            eraName={`${selectedEra.name.toUpperCase()} (${selectedEra.yearRange})`}
          >
            {/* Viewport Interior */}
            <div className="p-4 sm:p-6 bg-[#0a0a14] min-h-[500px] flex flex-col justify-between">
              {/* Era Context Banner */}
              <div
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${selectedEra.themeColor} bg-opacity-20 border border-slate-700/60 mb-6 shadow-xl relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-black/40 text-white font-bold border border-white/20">
                      {selectedEra.yearRange}
                    </span>
                    <span className="font-mono text-xs text-white/80">
                      Global Users: <strong className="text-white">{selectedEra.globalUsers}</strong>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight mb-1">
                    {selectedEra.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-3xl mb-3">
                    {selectedEra.vibeDescription}
                  </p>

                  {/* Hallmark Tech Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEra.hallmarkTech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/50 text-white/90 border border-white/15"
                      >
                        ⚡ {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Curator Filter & Search Controls */}
              <div className="mb-6">
                <CuratorFilter
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  onSurpriseMe={handleSurpriseMe}
                  totalCount={EXHIBITS.length}
                  filteredCount={filteredExhibits.length}
                />
              </div>

              {/* View Scope Toggle (Era Focused vs All Eras) */}
              <div className="flex items-center justify-between gap-2 mb-4 px-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono">
                    Showing {filteredExhibits.length} artifacts in {showAllEras || searchQuery ? 'All Eras' : selectedEra.name}
                  </span>
                </div>

                {!searchQuery && (
                  <button
                    onClick={() => {
                      retroAudio.playKeyClick();
                      setShowAllEras(!showAllEras);
                    }}
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    {showAllEras ? 'Focus on Selected Era Only' : 'Explore All Eras at Once'}
                  </button>
                )}
              </div>

              {/* Exhibits Gallery Grid */}
              {filteredExhibits.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredExhibits.map((exhibit) => (
                    <ExhibitCard
                      key={exhibit.id}
                      exhibit={exhibit}
                      onSelect={handleSelectExhibit}
                      accentColor={selectedEra.accentHex}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 font-mono text-xs">
                  <p className="text-sm text-slate-300 font-bold mb-1">No historical artifacts matched your query.</p>
                  <p className="mb-4">Try searching for "Netscape", "Dial-up", "GeoCities", or "Fail Whale".</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 rounded-lg bg-cyan-600 text-black font-bold"
                  >
                    Reset Search Filters
                  </button>
                </div>
              )}
            </div>
          </BrowserChrome>
        </section>
      </main>

      {/* Deep Dive Exhibit Modal */}
      <ExhibitModal
        exhibit={selectedExhibit}
        onClose={() => handleSelectExhibit(null)}
        onSelectExhibit={handleSelectExhibit}
        allExhibits={EXHIBITS}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0a0a14] py-6 text-xs text-slate-500 font-mono text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="text-slate-400">
            THE INTERNET MUSEUM — Curated for <strong>Weird Web Projects</strong> by{' '}
            <a
              href="https://github.com/mnk17arts"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline"
            >
              @mnk17arts
            </a>
            .
          </p>
          <p className="text-[11px] text-slate-500">
            Zero external sound files • 100% Procedural Web Audio API • Preserving open cyberspace history (1991–2026).
          </p>
        </div>
      </footer>
    </div>
  );
}
