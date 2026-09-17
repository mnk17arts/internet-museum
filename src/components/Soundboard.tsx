import { useState } from 'react';
import { retroAudio } from '../audio/soundSynthesizer';
import { SoundOscilloscope } from './SoundOscilloscope';
import { type Era } from '../data/eras';
import { Volume2, VolumeX, Play, Square, Radio, Sparkles } from 'lucide-react';

interface SoundboardProps {
  onNudgeTrigger?: () => void;
  era: Era;
}

export function Soundboard({ onNudgeTrigger, era }: SoundboardProps) {
  const [isMuted, setIsMuted] = useState(retroAudio.getIsMuted());
  const [activeDialUpStop, setActiveDialUpStop] = useState<(() => void) | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleMute = () => {
    const next = retroAudio.toggleMute();
    setIsMuted(next);
  };

  const handleDialUp = () => {
    if (activeDialUpStop) {
      activeDialUpStop();
      setActiveDialUpStop(null);
      setPlayingId(null);
      return;
    }
    setPlayingId('dialup');
    const stopFn = retroAudio.playDialUp();
    setActiveDialUpStop(() => stopFn);

    // Auto reset after 5.5s
    setTimeout(() => {
      setActiveDialUpStop(null);
      setPlayingId((curr) => (curr === 'dialup' ? null : curr));
    }, 5500);
  };

  const handleNudge = () => {
    setPlayingId('msn');
    retroAudio.playMsnNudge();
    if (onNudgeTrigger) onNudgeTrigger();
    setTimeout(() => setPlayingId(null), 1000);
  };

  const handleSound = (id: string, playFn: () => void) => {
    setPlayingId(id);
    playFn();
    setTimeout(() => setPlayingId(null), 600);
  };

  const getSoundBtnClass = (id: string) => {
    const isPlaying = playingId === id;

    if (era.id === 'dawn-1991-1995') {
      return isPlaying
        ? 'win95-sunken bg-white text-black p-2.5 font-mono text-left'
        : 'win95-box bg-[#c0c0c0] text-black p-2.5 font-mono text-left hover:bg-[#d4d0c8]';
    }
    if (era.id === 'wildwest-1996-2000') {
      return isPlaying
        ? 'win95-sunken bg-white text-black p-2.5 font-sans text-left border-2 border-t-stone-700 border-l-stone-700 border-b-white border-r-white'
        : 'win95-box bg-[#ece9d8] text-black p-2.5 font-sans text-left hover:bg-white border-2 border-t-white border-l-white border-b-stone-600 border-r-stone-600 shadow-[1px_1px_0px_#404040]';
    }
    if (era.id === 'flash-social-2001-2006') {
      return isPlaying
        ? 'web2-glossy-orange text-white rounded-xl p-2.5 font-fun text-left shadow-lg scale-95'
        : 'bg-white text-[#1a2a3a] border-2 border-[#b5d5f5] rounded-xl p-2.5 font-fun text-left hover:border-[#3895e8] hover:shadow-[0_4px_12px_rgba(0,102,204,0.15)] shadow-sm';
    }
    if (era.id === 'skeuomorphic-mobile-2007-2014') {
      return isPlaying
        ? 'skeuomorphic-glass-btn text-white rounded-xl p-2.5 font-sans text-left shadow-inner scale-95'
        : 'bg-gradient-to-b from-[#383a42] to-[#24262b] text-stone-100 border border-black/80 rounded-xl p-2.5 font-sans text-left shadow-[0_3px_8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] hover:border-stone-400 text-letterpress-dark';
    }
    if (era.id === 'flat-algorithmic-2015-2020') {
      return isPlaying
        ? 'bg-violet-600 text-white rounded-lg p-2.5 font-sans text-left'
        : 'bg-[#191d29] text-slate-200 border border-slate-800 rounded-lg p-2.5 font-sans text-left hover:border-violet-500';
    }
    // modern cyber
    return isPlaying
      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 rounded-2xl p-2.5 font-display text-left scale-95 ring-2 ring-cyan-500/50'
      : 'bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-2.5 font-display text-left hover:border-cyan-400/80 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]';
  };

  const getOscilloscopeColor = () => {
    switch (era.id) {
      case 'dawn-1991-1995':
        return '#000080';
      case 'wildwest-1996-2000':
        return '#003399';
      case 'flash-social-2001-2006':
        return '#0066cc';
      case 'skeuomorphic-mobile-2007-2014':
        return '#4a90e2';
      case 'flat-algorithmic-2015-2020':
        return '#8b5cf6';
      default:
        return '#00F0FF';
    }
  };

  return (
    <div className={`w-full p-3 sm:p-4 transition-all duration-300 relative overflow-hidden ${era.soundboardContainerClass}`}>
      {/* Decorative top tape stripe */}
      <div className={`flex items-center justify-between pb-2.5 mb-3 gap-2 border-b ${
        era.id === 'dawn-1991-1995'
          ? 'border-[#808080]'
          : era.id === 'wildwest-1996-2000'
          ? 'border-stone-400'
          : era.id === 'flash-social-2001-2006'
          ? 'border-[#b5d5f5]'
          : 'border-current/15'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 flex items-center justify-center ${
            era.id === 'dawn-1991-1995'
              ? 'win95-box bg-[#c0c0c0] text-black'
              : era.id === 'wildwest-1996-2000'
              ? 'win95-box bg-[#000080] text-white'
              : era.id === 'flash-social-2001-2006'
              ? 'web2-glossy-btn text-white rounded-lg'
              : era.id === 'skeuomorphic-mobile-2007-2014'
              ? 'skeuomorphic-glass-btn text-white rounded-lg'
              : 'rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
          }`}>
            <Radio className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold tracking-wider font-mono flex items-center gap-2">
              <span>CYBERSPACE SOUNDBOARD</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                era.id === 'dawn-1991-1995'
                  ? 'win95-sunken bg-white text-black font-serif'
                  : era.id === 'wildwest-1996-2000'
                  ? 'bg-[#003399] text-white font-sans'
                  : era.id === 'flash-social-2001-2006'
                  ? 'web2-glossy-orange text-white font-sans rounded-full px-2'
                  : era.id === 'skeuomorphic-mobile-2007-2014'
                  ? 'bg-stone-800 text-stone-200 border border-black/50 font-sans text-letterpress-light'
                  : 'bg-cyan-950/60 text-cyan-400 border border-cyan-800'
              }`}>
                WEB AUDIO SYNTH
              </span>
            </h3>
            <p className="text-[11px] opacity-75 hidden sm:block">
              100% procedural browser audio synthesis. Zero external audio downloads.
            </p>
          </div>
        </div>

        {/* Oscilloscope & Mute Button */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden sm:block">
            <SoundOscilloscope
              width={120}
              height={28}
              color={getOscilloscopeColor()}
            />
          </div>
          <button
            onClick={toggleMute}
            className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              era.id === 'dawn-1991-1995' || era.id === 'wildwest-1996-2000'
                ? 'win95-btn text-black'
                : era.id === 'flash-social-2001-2006'
                ? 'web2-glossy-btn text-white rounded-full px-3'
                : era.id === 'skeuomorphic-mobile-2007-2014'
                ? 'skeuomorphic-glass-btn text-white rounded-lg'
                : isMuted
                ? 'bg-red-950/40 text-red-400 border-red-800 hover:bg-red-900/50'
                : 'bg-emerald-950/40 text-emerald-400 border-emerald-800 hover:bg-emerald-900/50'
            }`}
            title={isMuted ? 'Unmute procedural audio' : 'Mute procedural audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden md:inline">{isMuted ? 'MUTED' : 'LIVE'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Sound Triggers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {/* 1. 56k Dial-up */}
        <button
          onClick={handleDialUp}
          className={`flex flex-col justify-between transition-all duration-150 ${getSoundBtnClass('dialup')}`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] font-bold opacity-80">56K MODEM</span>
            {activeDialUpStop ? (
              <Square className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            ) : (
              <Play className="w-3.5 h-3.5 opacity-60" />
            )}
          </div>
          <span className="text-xs font-bold truncate">Dial-Up Handshake</span>
          <span className="text-[10px] opacity-70 font-mono">
            {activeDialUpStop ? 'Connecting...' : 'V.90 Baud (5.5s)'}
          </span>
        </button>

        {/* 2. MSN Messenger Nudge */}
        <button
          onClick={handleNudge}
          className={`flex flex-col justify-between transition-all duration-150 ${getSoundBtnClass('msn')}`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] font-bold opacity-80">MSN 2005</span>
            <Sparkles className="w-3.5 h-3.5 opacity-60" />
          </div>
          <span className="text-xs font-bold truncate">Messenger Nudge</span>
          <span className="text-[10px] opacity-70 font-mono">Shake & Buzzer</span>
        </button>

        {/* 3. ICQ Uh-Oh */}
        <button
          onClick={() => handleSound('icq', () => retroAudio.playIcqUhOh())}
          className={`flex flex-col justify-between transition-all duration-150 ${getSoundBtnClass('icq')}`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] font-bold opacity-80">ICQ 1998</span>
            <Play className="w-3.5 h-3.5 opacity-60" />
          </div>
          <span className="text-xs font-bold truncate">"Uh-Oh!" Alert</span>
          <span className="text-[10px] opacity-70 font-mono">Vocal Formant</span>
        </button>

        {/* 4. AOL Mail */}
        <button
          onClick={() => handleSound('aol', () => retroAudio.playAolMail())}
          className={`flex flex-col justify-between transition-all duration-150 ${getSoundBtnClass('aol')}`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] font-bold opacity-80">AOL 1995</span>
            <Play className="w-3.5 h-3.5 opacity-60" />
          </div>
          <span className="text-xs font-bold truncate">You've Got Mail</span>
          <span className="text-[10px] opacity-70 font-mono">Tri-Tone Chime</span>
        </button>

        {/* 5. Windows 95 Chord */}
        <button
          onClick={() => handleSound('win95', () => retroAudio.playWin95Startup())}
          className={`flex flex-col justify-between transition-all duration-150 ${getSoundBtnClass('win95')}`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] font-bold opacity-80">WIN 95</span>
            <Play className="w-3.5 h-3.5 opacity-60" />
          </div>
          <span className="text-xs font-bold truncate">Brian Eno Pad</span>
          <span className="text-[10px] opacity-70 font-mono">Harmonic Chord</span>
        </button>

        {/* 6. CRT Degauss */}
        <button
          onClick={() => handleSound('crt', () => retroAudio.playCrtDeGauss())}
          className={`flex flex-col justify-between transition-all duration-150 ${getSoundBtnClass('crt')}`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] font-bold opacity-80">HARDWARE</span>
            <Play className="w-3.5 h-3.5 opacity-60" />
          </div>
          <span className="text-xs font-bold truncate">CRT Degauss</span>
          <span className="text-[10px] opacity-70 font-mono">Coil & 15kHz</span>
        </button>

        {/* 7. Mechanical Key Click */}
        <button
          onClick={() => handleSound('key', () => retroAudio.playKeyClick())}
          className={`flex flex-col justify-between transition-all duration-150 ${getSoundBtnClass('key')}`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] font-bold opacity-80">KEYBOARD</span>
            <Play className="w-3.5 h-3.5 opacity-60" />
          </div>
          <span className="text-xs font-bold truncate">Model M Clack</span>
          <span className="text-[10px] opacity-70 font-mono">Buckling Spring</span>
        </button>
      </div>
    </div>
  );
}
