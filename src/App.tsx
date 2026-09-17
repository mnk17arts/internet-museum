import { useState, useMemo } from 'react';
import { ERAS, type Era } from './data/eras';
import { EXHIBITS, type Exhibit } from './data/exhibits';
import { retroAudio } from './audio/soundSynthesizer';
import { BrowserChrome } from './components/BrowserChrome';
import { EraTimeline } from './components/EraTimeline';
import { Soundboard } from './components/Soundboard';
import { CuratorFilter, type CategoryFilter } from './components/CuratorFilter';
import { ExhibitCard } from './components/ExhibitCard';
import { ExhibitModal } from './components/ExhibitModal';
import { Tv, Globe } from 'lucide-react';
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [isCrtEnabled, setIsCrtEnabled] = useState(false);
  const [isNudging, setIsNudging] = useState(false);
  const [showAllEras, setShowAllEras] = useState(false);
  const [visitorCount, setVisitorCount] = useState(284710);

  // Sync browser frame automatically when era changes (unless manually overridden)
  const handleSelectEra = (era: Era) => {
    setSelectedEra(era);
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
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        selectedEra.rootClass
      } ${isCrtEnabled ? 'crt-overlay crt-vignette' : ''} ${isNudging ? 'animate-nudge' : ''}`}
    >
      {/* Top Notification / Marquee Header Bar */}
      <header className={`border-b sticky top-0 z-40 transition-all duration-300 ${selectedEra.headerClass}`}>
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Series Badge */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 flex items-center justify-center ${
              selectedEra.id === 'dawn-1991-1995'
                ? 'win95-box bg-[#c0c0c0] text-black font-bold'
                : selectedEra.id === 'wildwest-1996-2000'
                ? 'bg-black border-2 border-yellow-400 text-yellow-300 rounded shadow-[0_0_10px_rgba(250,204,21,0.5)]'
                : selectedEra.id === 'flash-social-2001-2006'
                ? 'rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30 text-white'
                : selectedEra.id === 'skeuomorphic-mobile-2007-2014'
                ? 'rounded-xl bg-stone-700 border border-stone-500 text-stone-200 shadow-md'
                : selectedEra.id === 'flat-algorithmic-2015-2020'
                ? 'rounded-lg bg-violet-600 text-white'
                : 'rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 text-black'
            }`}>
              <Globe className="w-5 h-5 animate-spin" style={{ animationDuration: '18s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`text-base sm:text-lg font-black tracking-wider ${selectedEra.headerTitleClass}`}>
                  THE INTERNET MUSEUM
                </h1>
              </div>
              <p className="text-[11px] opacity-75 hidden sm:block">
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
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs cursor-pointer ${
                selectedEra.id === 'dawn-1991-1995'
                  ? 'win95-sunken bg-white text-black font-mono'
                  : selectedEra.id === 'wildwest-1996-2000'
                  ? 'bg-black border border-yellow-400 text-yellow-300 font-pixel'
                  : 'rounded-lg bg-black/30 border border-current/20 text-current'
              }`}
              title="Click to advance digital hit counter"
            >
              <span className="text-[10px] opacity-70">HITS:</span>
              <span className="font-pixel tracking-widest text-sm">
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
                  : selectedEra.id === 'dawn-1991-1995'
                  ? 'win95-btn text-black'
                  : 'bg-black/30 text-current border-current/20 hover:bg-black/50'
              }`}
              title="Toggle retro CRT scanlines and screen curvature"
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CRT: {isCrtEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* GitHub Project Link */}
            <a
              href="https://github.com/mnk17arts/internet-museum"
              target="_blank"
              rel="noreferrer"
              className={`p-1.5 rounded-lg border transition-colors flex items-center justify-center ${
                selectedEra.id === 'dawn-1991-1995' || selectedEra.id === 'wildwest-1996-2000'
                  ? 'win95-btn text-black'
                  : selectedEra.id === 'flash-social-2001-2006'
                  ? 'web2-glossy-btn text-white rounded-lg'
                  : selectedEra.id === 'skeuomorphic-mobile-2007-2014'
                  ? 'skeuomorphic-glass-btn text-white rounded-lg'
                  : 'bg-black/30 border-current/20 text-current hover:bg-black/50'
              }`}
              title="View Project on GitHub (mnk17arts/internet-museum)"
              aria-label="GitHub Repository"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
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
          <Soundboard onNudgeTrigger={handleTriggerNudge} era={selectedEra} />
        </section>

        {/* 3. The Browser Chrome Frame Viewport */}
        <section aria-label="Historical Browser Viewport">
          <BrowserChrome
            browserType={selectedEra.browserEra}
            urlDisplay={currentChromeUrl}
          >
            {/* Viewport Interior with Dynamic Era System */}
            <div className={`p-4 sm:p-6 min-h-[500px] flex flex-col justify-between transition-all duration-300 ${selectedEra.containerClass}`}>
              {/* Era Context Banner */}
              <div
                className={`p-4 sm:p-5 mb-6 relative overflow-hidden transition-all duration-300 ${selectedEra.bannerClass}`}
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className={`text-xs px-2.5 py-0.5 font-bold ${
                      selectedEra.id === 'dawn-1991-1995'
                        ? 'win95-box bg-[#c0c0c0] text-black font-mono'
                        : selectedEra.id === 'wildwest-1996-2000'
                        ? 'bg-yellow-400 text-black font-pixel text-xs border border-black'
                        : 'rounded-full bg-black/40 text-white font-mono border border-white/20'
                    }`}>
                      {selectedEra.yearRange}
                    </span>
                    <span className="font-mono text-xs opacity-90">
                      Global Users: <strong>{selectedEra.globalUsers}</strong>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-2xl font-black tracking-tight mb-1">
                    {selectedEra.name}
                  </h2>
                  <p className="text-xs sm:text-sm opacity-90 leading-relaxed max-w-3xl mb-3">
                    {selectedEra.vibeDescription}
                  </p>

                  {/* Hallmark Tech Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEra.hallmarkTech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 text-[11px] font-mono ${
                          selectedEra.id === 'dawn-1991-1995'
                            ? 'win95-sunken bg-white text-black font-serif'
                            : selectedEra.id === 'wildwest-1996-2000'
                            ? 'bg-black text-lime-400 border border-cyan-400 font-pixel'
                            : 'rounded-md bg-black/50 text-white/90 border border-white/15'
                        }`}
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
                  era={selectedEra}
                />
              </div>

              {/* View Scope Toggle (Era Focused vs All Eras) */}
              <div className="flex items-center justify-between gap-2 mb-4 px-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-mono ${selectedEra.id === 'dawn-1991-1995' ? 'text-black font-bold' : 'opacity-70'}`}>
                    Showing {filteredExhibits.length} artifacts in {showAllEras || searchQuery ? 'All Eras' : selectedEra.name}
                  </span>
                </div>

                {!searchQuery && (
                  <button
                    onClick={() => {
                      retroAudio.playKeyClick();
                      setShowAllEras(!showAllEras);
                    }}
                    className={`text-xs font-mono underline cursor-pointer ${
                      selectedEra.id === 'dawn-1991-1995'
                        ? 'text-[#0000ee] font-bold'
                        : selectedEra.id === 'wildwest-1996-2000'
                        ? 'text-yellow-400 font-bold'
                        : 'text-cyan-400'
                    }`}
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
                      era={selectedEra}
                    />
                  ))}
                </div>
              ) : (
                <div className={`p-12 text-center text-xs ${
                  selectedEra.id === 'dawn-1991-1995'
                    ? 'win95-sunken bg-stone-200 text-black font-serif'
                    : selectedEra.id === 'wildwest-1996-2000'
                    ? 'bg-black border-2 border-red-500 text-yellow-300 font-pixel'
                    : 'rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 font-mono'
                }`}>
                  <p className="text-sm font-bold mb-1">No historical artifacts matched your query.</p>
                  <p className="mb-4">Try searching for "Netscape", "Dial-up", "GeoCities", or "Fail Whale".</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className={selectedEra.buttonClass}
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
      <footer className={`py-6 text-xs text-center transition-all duration-300 ${selectedEra.footerClass}`}>
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
