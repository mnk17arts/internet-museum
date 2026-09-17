import { type ReactNode } from 'react';
import { retroAudio } from '../audio/soundSynthesizer';
import { RotateCw, ArrowLeft, ArrowRight, Home, Lock, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

export type BrowserType = 'mosaic' | 'netscape' | 'ie6' | 'chrome';

interface BrowserChromeProps {
  browserType: BrowserType;
  onBrowserChange: (type: BrowserType) => void;
  urlDisplay?: string;
  eraName?: string;
  children: ReactNode;
}

export function BrowserChrome({
  browserType,
  onBrowserChange,
  urlDisplay = 'http://internet-museum.hypertext/exhibition',
  eraName = 'CYBERSPACE TIME CAPSULE',
  children,
}: BrowserChromeProps) {
  const handleReload = () => {
    retroAudio.playKeyClick();
  };

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border border-slate-700/60 bg-[#0c0c16]">
      {/* Top Browser Selector Switcher Bar (Mobile & Desktop Accessible) */}
      <div className="bg-[#12121e] border-b border-slate-800 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">VIEWPORT CHROME:</span>
          </span>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-900 border border-slate-800">
            <button
              onClick={() => {
                retroAudio.playKeyClick();
                onBrowserChange('mosaic');
              }}
              className={`px-2.5 py-1 rounded text-xs font-pixel tracking-wider transition-colors ${
                browserType === 'mosaic'
                  ? 'bg-amber-600/30 text-amber-300 font-bold border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mosaic '93
            </button>
            <button
              onClick={() => {
                retroAudio.playKeyClick();
                onBrowserChange('netscape');
              }}
              className={`px-2.5 py-1 rounded text-xs font-retro transition-colors ${
                browserType === 'netscape'
                  ? 'bg-fuchsia-600/30 text-fuchsia-300 font-bold border border-fuchsia-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Netscape 3.0
            </button>
            <button
              onClick={() => {
                retroAudio.playKeyClick();
                onBrowserChange('ie6');
              }}
              className={`px-2.5 py-1 rounded text-xs font-sans transition-colors ${
                browserType === 'ie6'
                  ? 'bg-blue-600/30 text-blue-300 font-bold border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              IE6 XP
            </button>
            <button
              onClick={() => {
                retroAudio.playKeyClick();
                onBrowserChange('chrome');
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                browserType === 'chrome'
                  ? 'bg-cyan-600/30 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Modern Chrome
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="hidden md:inline px-2 py-0.5 rounded bg-slate-800/80 text-cyan-400 border border-slate-700">
            {eraName}
          </span>
        </div>
      </div>

      {/* 1. NCSA MOSAIC 1993 CHROME */}
      {browserType === 'mosaic' && (
        <div className="win95-box select-none border-b-2 border-stone-800">
          {/* Title bar */}
          <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between text-xs font-mono font-bold tracking-wider">
            <span>NCSA Mosaic for Microsoft Windows — [v1.0]</span>
            <div className="flex gap-1">
              <span className="px-1 bg-stone-300 text-black border border-stone-600 cursor-pointer">_</span>
              <span className="px-1 bg-stone-300 text-black border border-stone-600 cursor-pointer">X</span>
            </div>
          </div>

          {/* Mosaic Menu Bar */}
          <div className="flex flex-wrap gap-3 px-2 py-1 text-xs text-black border-b border-stone-400 bg-stone-200 font-sans">
            <span className="hover:underline cursor-pointer">File</span>
            <span className="hover:underline cursor-pointer">Edit</span>
            <span className="hover:underline cursor-pointer">Options</span>
            <span className="hover:underline cursor-pointer">Navigate</span>
            <span className="hover:underline cursor-pointer">Annotate</span>
            <span className="hover:underline cursor-pointer">Help</span>
          </div>

          {/* Mosaic Big Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-300 border-b border-stone-400">
            <button onClick={handleReload} className="win95-btn flex items-center gap-1 font-mono text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button onClick={handleReload} className="win95-btn flex items-center gap-1 font-mono text-xs">
              <ArrowRight className="w-3.5 h-3.5" /> Fwd
            </button>
            <button onClick={handleReload} className="win95-btn flex items-center gap-1 font-mono text-xs">
              <Home className="w-3.5 h-3.5" /> Home
            </button>
            <button onClick={handleReload} className="win95-btn flex items-center gap-1 font-mono text-xs">
              <RotateCw className="w-3.5 h-3.5" /> Reload
            </button>

            {/* Mosaic Spinning Globe Simulator */}
            <div className="ml-auto w-7 h-7 bg-stone-900 rounded-full border border-stone-600 flex items-center justify-center animate-spin">
              <Globe className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          {/* Mosaic URL bar */}
          <div className="flex items-center gap-2 p-1.5 bg-stone-300 text-xs text-black">
            <span className="font-bold text-stone-800">Starting Points URL:</span>
            <input
              type="text"
              readOnly
              value={urlDisplay}
              className="flex-1 px-2 py-1 win95-sunken bg-white font-mono text-xs text-black focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 2. NETSCAPE NAVIGATOR 3.0 (1996) */}
      {browserType === 'netscape' && (
        <div className="bg-[#c0c0c0] text-black select-none border-b-2 border-stone-700">
          {/* Netscape Title Bar */}
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex items-center justify-between text-xs font-sans font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-cyan-400 inline-block"></span>
              <span>Netscape - [The Internet Museum: Welcome to Cyberspace]</span>
            </div>
            <div className="flex gap-1">
              <button className="px-1.5 py-0.5 bg-stone-300 text-black border border-white text-[10px] font-bold">
                _
              </button>
              <button className="px-1.5 py-0.5 bg-stone-300 text-black border border-white text-[10px] font-bold">
                X
              </button>
            </div>
          </div>

          {/* Netscape Toolbar Buttons & Animated Comet Logo */}
          <div className="flex items-center justify-between p-1 bg-stone-200 border-b border-stone-400">
            <div className="flex flex-wrap gap-1">
              <button onClick={handleReload} className="win95-btn flex items-center gap-1 text-[11px]">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
              <button onClick={handleReload} className="win95-btn flex items-center gap-1 text-[11px]">
                <ArrowRight className="w-3 h-3" /> Forward
              </button>
              <button onClick={handleReload} className="win95-btn flex items-center gap-1 text-[11px]">
                <Home className="w-3 h-3" /> Home
              </button>
              <button onClick={handleReload} className="win95-btn flex items-center gap-1 text-[11px]">
                <RotateCw className="w-3 h-3" /> Reload
              </button>
              <button onClick={handleReload} className="win95-btn hidden sm:flex items-center gap-1 text-[11px]">
                Open
              </button>
              <button onClick={handleReload} className="win95-btn hidden sm:flex items-center gap-1 text-[11px]">
                Print
              </button>
              <button onClick={handleReload} className="win95-btn flex items-center gap-1 text-[11px] text-red-700 font-bold">
                Stop
              </button>
            </div>

            {/* Pulsing Meteor Lighthouse Box */}
            <div className="w-8 h-8 bg-black rounded border-2 border-stone-400 flex items-center justify-center overflow-hidden">
              <span className="font-retro text-xs text-cyan-400 font-bold animate-pulse">N</span>
            </div>
          </div>

          {/* Netscape Location Box */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-stone-300 text-xs">
            <span className="font-bold text-stone-700">Location:</span>
            <input
              type="text"
              readOnly
              value={urlDisplay}
              className="flex-1 px-2 py-0.5 win95-sunken bg-white font-mono text-xs text-black"
            />
          </div>

          {/* Netscape Bookmark Quick Bar */}
          <div className="hidden sm:flex gap-4 px-2 py-0.5 text-[11px] bg-stone-200 border-t border-stone-300 font-sans text-stone-700">
            <span className="hover:underline cursor-pointer">What's New?</span>
            <span className="hover:underline cursor-pointer">What's Cool?</span>
            <span className="hover:underline cursor-pointer">Destinations</span>
            <span className="hover:underline cursor-pointer">Net Search</span>
            <span className="hover:underline cursor-pointer">People</span>
            <span className="hover:underline cursor-pointer">Software</span>
          </div>
        </div>
      )}

      {/* 3. INTERNET EXPLORER 6 (WINDOWS XP LUNA BLUE) */}
      {browserType === 'ie6' && (
        <div className="bg-[#ece9d8] text-black select-none border-b-2 border-blue-900">
          {/* XP Blue Gradient Title Bar */}
          <div className="xp-titlebar text-white px-2 py-1.5 flex items-center justify-between text-xs font-sans font-bold shadow">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-cyan-300 flex items-center justify-center text-[10px] text-blue-900 font-bold">
                e
              </span>
              <span>The Internet Museum - Microsoft Internet Explorer</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-[#288eff] border border-white/60 rounded flex items-center justify-center text-[10px]">
                _
              </div>
              <div className="w-4 h-4 bg-[#288eff] border border-white/60 rounded flex items-center justify-center text-[10px]">
                □
              </div>
              <div className="w-4 h-4 bg-[#e81123] border border-white/60 rounded flex items-center justify-center text-[10px]">
                ✕
              </div>
            </div>
          </div>

          {/* XP Toolbar */}
          <div className="flex items-center justify-between px-2 py-1 bg-[#ece9d8] border-b border-[#dcd9c8]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleReload}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/60 border border-transparent hover:border-[#a09e90] text-xs font-sans"
              >
                <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shadow">
                  <ArrowLeft className="w-3 h-3" />
                </div>
                <span>Back</span>
              </button>
              <button
                onClick={handleReload}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/60 border border-transparent hover:border-[#a09e90] text-xs font-sans"
              >
                <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center shadow">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
              <button
                onClick={handleReload}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/60 border border-transparent hover:border-[#a09e90] text-xs font-sans"
              >
                <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow text-xs">
                  ✕
                </div>
                <span>Stop</span>
              </button>
              <button
                onClick={handleReload}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/60 border border-transparent hover:border-[#a09e90] text-xs font-sans"
              >
                <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={handleReload}
                className="hidden md:flex items-center gap-1 px-2 py-1 rounded hover:bg-white/60 border border-transparent hover:border-[#a09e90] text-xs font-sans"
              >
                <Home className="w-3.5 h-3.5 text-amber-600" />
                <span>Home</span>
              </button>
            </div>

            {/* XP Windows Flag / Spinning e */}
            <div className="w-6 h-6 rounded bg-[#2050b0] flex items-center justify-center text-white font-bold text-xs italic shadow-inner">
              e
            </div>
          </div>

          {/* XP Address Bar with Green GO Arrow */}
          <div className="flex items-center gap-2 px-2 py-1 bg-[#f5f4ea] border-b border-[#aca899]">
            <span className="text-xs text-stone-600 font-sans">Address</span>
            <div className="flex-1 flex items-center bg-white border border-[#7f9db9] px-2 py-0.5 rounded shadow-inner">
              <Globe className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
              <input
                type="text"
                readOnly
                value={urlDisplay}
                className="w-full text-xs font-sans text-stone-800 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-1 px-2.5 py-0.5 bg-[#208020] text-white rounded text-xs font-bold shadow hover:bg-green-700">
              Go
            </button>
          </div>
        </div>
      )}

      {/* 4. MODERN CYBER CHROME (2026) */}
      {browserType === 'chrome' && (
        <div className="bg-[#12121e] text-slate-200 border-b border-slate-800">
          {/* Rounded Modern Tabs */}
          <div className="flex items-center px-2 pt-1 gap-1 border-b border-slate-800/80 bg-[#090913]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-[#181829] text-xs font-sans text-cyan-300 border-t border-l border-r border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-medium truncate max-w-[200px]">Internet Museum v10.0</span>
              <span className="text-slate-500 hover:text-slate-300 text-[10px] ml-1">✕</span>
            </div>
            <div className="text-slate-500 text-xs px-2">+</div>
          </div>

          {/* Modern Omnibar */}
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex items-center gap-1 text-slate-400">
              <button onClick={handleReload} className="p-1 hover:text-slate-200 rounded hover:bg-slate-800/60">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={handleReload} className="p-1 hover:text-slate-200 rounded hover:bg-slate-800/60">
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={handleReload} className="p-1 hover:text-slate-200 rounded hover:bg-slate-800/60">
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Omnibar Pill */}
            <div className="flex-1 flex items-center gap-2 bg-[#0c0c17] px-3 py-1 rounded-full border border-slate-700/80 text-xs text-slate-300">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400/90 font-mono text-[11px]">https://</span>
              <span className="font-mono text-slate-200 truncate">{urlDisplay.replace(/^https?:\/\//, '')}</span>
            </div>

            <button
              onClick={() => {
                retroAudio.playKeyClick();
                window.open(window.location.href, '_blank');
              }}
              className="p-1.5 text-slate-400 hover:text-cyan-400 rounded hover:bg-slate-800"
              title="Open current URL in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Viewport Content Area */}
      <div className="relative w-full overflow-hidden min-h-[500px]">{children}</div>

      {/* Retro Status Bar (for Mosaic/Netscape/IE6) */}
      {(browserType === 'mosaic' || browserType === 'netscape' || browserType === 'ie6') && (
        <div className="bg-[#c0c0c0] text-black border-t border-stone-500 px-2 py-0.5 flex items-center justify-between text-[11px] font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
            <span>Document: Done (28 exhibits loaded into memory)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="win95-sunken px-1.5 py-0.5 bg-stone-200">56,000 bps</span>
            <span className="win95-sunken px-1.5 py-0.5 bg-stone-200 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> SSL 3.0
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
