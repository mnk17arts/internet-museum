import { useState } from 'react';
import { retroAudio } from '../audio/soundSynthesizer';
import { SoundOscilloscope } from './SoundOscilloscope';
import { Volume2, VolumeX, Play, Square, Radio, Sparkles } from 'lucide-react';

interface SoundboardProps {
  onNudgeTrigger?: () => void;
}

export function Soundboard({ onNudgeTrigger }: SoundboardProps) {
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

  return (
    <div className="w-full bg-[#111122]/95 backdrop-blur-md rounded-2xl border border-cyan-900/40 p-3 sm:p-4 shadow-2xl relative overflow-hidden">
      {/* Decorative top tape stripe */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wider font-mono flex items-center gap-2">
              <span>CYBERSPACE SOUNDBOARD</span>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">
                WEB AUDIO SYNTH
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              100% procedural browser audio synthesis. Zero external audio downloads.
            </p>
          </div>
        </div>

        {/* Oscilloscope & Mute Button */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden sm:block">
            <SoundOscilloscope width={120} height={28} color="#00F0FF" />
          </div>
          <button
            onClick={toggleMute}
            className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              isMuted
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
        {/* 1. 56k Dial-up (Special long button) */}
        <button
          onClick={handleDialUp}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 relative overflow-hidden group ${
            playingId === 'dialup'
              ? 'bg-amber-600/30 border-amber-400 text-amber-200 scale-95 ring-2 ring-amber-500/50'
              : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] text-amber-400 font-bold">56K MODEM</span>
            {activeDialUpStop ? (
              <Square className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            ) : (
              <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400" />
            )}
          </div>
          <span className="text-xs font-bold truncate">Dial-Up Handshake</span>
          <span className="text-[10px] text-slate-400 font-mono">
            {activeDialUpStop ? 'Connecting...' : 'V.90 Baud (5.5s)'}
          </span>
        </button>

        {/* 2. MSN Messenger Nudge */}
        <button
          onClick={handleNudge}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 group ${
            playingId === 'msn'
              ? 'bg-fuchsia-600/30 border-fuchsia-400 text-fuchsia-200 scale-95 ring-2 ring-fuchsia-500/50'
              : 'bg-slate-900/60 border-slate-800 hover:border-fuchsia-500/50 hover:bg-slate-900 text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] text-fuchsia-400 font-bold">MSN 2005</span>
            <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-fuchsia-400" />
          </div>
          <span className="text-xs font-bold truncate">Messenger Nudge</span>
          <span className="text-[10px] text-slate-400 font-mono">Shake & Buzzer</span>
        </button>

        {/* 3. ICQ Uh-Oh */}
        <button
          onClick={() => handleSound('icq', () => retroAudio.playIcqUhOh())}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 group ${
            playingId === 'icq'
              ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200 scale-95 ring-2 ring-emerald-500/50'
              : 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] text-emerald-400 font-bold">ICQ 1998</span>
            <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
          </div>
          <span className="text-xs font-bold truncate">"Uh-Oh!" Alert</span>
          <span className="text-[10px] text-slate-400 font-mono">Vocal Formant</span>
        </button>

        {/* 4. AOL Mail */}
        <button
          onClick={() => handleSound('aol', () => retroAudio.playAolMail())}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 group ${
            playingId === 'aol'
              ? 'bg-blue-600/30 border-blue-400 text-blue-200 scale-95 ring-2 ring-blue-500/50'
              : 'bg-slate-900/60 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] text-blue-400 font-bold">AOL 1995</span>
            <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
          </div>
          <span className="text-xs font-bold truncate">You've Got Mail</span>
          <span className="text-[10px] text-slate-400 font-mono">Tri-Tone Chime</span>
        </button>

        {/* 5. Windows 95 Chord */}
        <button
          onClick={() => handleSound('win95', () => retroAudio.playWin95Startup())}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 group ${
            playingId === 'win95'
              ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 scale-95 ring-2 ring-indigo-500/50'
              : 'bg-slate-900/60 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] text-indigo-400 font-bold">WIN 95</span>
            <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
          </div>
          <span className="text-xs font-bold truncate">Brian Eno Pad</span>
          <span className="text-[10px] text-slate-400 font-mono">Harmonic Chord</span>
        </button>

        {/* 6. CRT Degauss */}
        <button
          onClick={() => handleSound('crt', () => retroAudio.playCrtDeGauss())}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 group ${
            playingId === 'crt'
              ? 'bg-rose-600/30 border-rose-400 text-rose-200 scale-95 ring-2 ring-rose-500/50'
              : 'bg-slate-900/60 border-slate-800 hover:border-rose-500/50 hover:bg-slate-900 text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] text-rose-400 font-bold">HARDWARE</span>
            <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400" />
          </div>
          <span className="text-xs font-bold truncate">CRT Degauss</span>
          <span className="text-[10px] text-slate-400 font-mono">Coil Thud & 15kHz</span>
        </button>

        {/* 7. Mechanical Key Click */}
        <button
          onClick={() => handleSound('key', () => retroAudio.playKeyClick())}
          className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 group ${
            playingId === 'key'
              ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200 scale-95 ring-2 ring-cyan-500/50'
              : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-[10px] text-cyan-400 font-bold">KEYBOARD</span>
            <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
          </div>
          <span className="text-xs font-bold truncate">Model M Clack</span>
          <span className="text-[10px] text-slate-400 font-mono">Buckling Spring</span>
        </button>
      </div>
    </div>
  );
}
