import { useState } from 'react';
import { retroAudio } from '../../audio/soundSynthesizer';
import { RefreshCw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function FailWhaleExhibit() {
  const [retrying, setRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Twitter is over capacity. Please wait a moment and try again.');

  const handleRetry = () => {
    setRetrying(true);
    retroAudio.playKeyClick();
    setStatusMessage('Negotiating with Ruby on Rails master database...');

    setTimeout(() => {
      setRetrying(false);
      const nextCount = retryCount + 1;
      setRetryCount(nextCount);

      if (nextCount % 3 === 0) {
        retroAudio.playAolMail();
        setStatusMessage('CONNECTION RESTORED! 1 Tweet successfully delivered to timeline.');
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#fb923c', '#ffffff'],
        });
      } else {
        retroAudio.playErrorBeep();
        setStatusMessage(`Error 503: Service Unavailable. Fail Whale remains in flight! (Retry attempt #${nextCount})`);
      }
    }, 1200);
  };

  return (
    <div className="w-full bg-[#e8f5fd] text-[#333333] p-6 rounded-xl border-2 border-[#b9e1f8] max-w-2xl mx-auto my-4 shadow-2xl font-sans text-center select-none">
      {/* 2008 Twitter Header */}
      <div className="flex items-center justify-between border-b border-[#b9e1f8] pb-3 mb-4 text-xs font-bold text-[#1da1f2]">
        <span className="text-base tracking-tight">twitter</span>
        <span className="text-[11px] text-stone-500 font-mono">STATUS: 503 OVER CAPACITY</span>
      </div>

      {/* Fail Whale Scene Illustration */}
      <div className="relative w-full h-56 bg-gradient-to-b from-[#d6f0ff] to-[#a0dcff] rounded-xl overflow-hidden border border-[#b9e1f8] mb-4 flex items-center justify-center">
        {/* Floating Clouds */}
        <div className="absolute top-4 left-6 text-white/70 text-xs font-bold animate-pulse">☁</div>
        <div className="absolute top-8 right-10 text-white/70 text-xs font-bold animate-pulse">☁</div>

        {/* 8-bit Birds Lifting Whale */}
        <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
          {/* Flock of 6 orange birds holding rope */}
          <div className="flex gap-4 mb-1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-4 h-4 bg-orange-500 rounded-sm transform rotate-45 flex items-center justify-center text-[8px] text-white font-bold shadow animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                v
              </div>
            ))}
          </div>

          {/* Cords / Nets hanging down */}
          <div className="w-36 h-3 flex justify-between px-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-0.5 h-full bg-orange-400/80"></div>
            ))}
          </div>

          {/* The White Beluga Whale */}
          <div className="w-44 h-20 bg-white rounded-t-full rounded-b-3xl border-2 border-stone-300 shadow-xl relative flex items-center px-4">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-800 ml-2 animate-ping"></div>
            <div className="ml-auto pr-2 text-stone-400 font-mono text-[9px] font-bold">FAIL WHALE</div>
            {/* Whale tail */}
            <div className="absolute -right-3 top-4 w-6 h-6 bg-white border-2 border-stone-300 rounded-r-full transform rotate-12"></div>
          </div>
        </div>

        {/* Ocean Waves at Bottom */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-cyan-600/30 flex items-end justify-center">
          <div className="w-full text-center text-cyan-700/60 font-mono text-xs tracking-widest">
            ~~~~~~~~~~~~~ ♒ ~~~~~~~~~~~~~ ♒ ~~~~~~~~~~~~~
          </div>
        </div>
      </div>

      {/* Fail Whale Narrative */}
      <h2 className="text-lg font-bold text-stone-800 mb-1">Twitter is over capacity.</h2>
      <p className="text-xs text-stone-600 mb-3 max-w-md mx-auto leading-relaxed">
        {statusMessage}
      </p>

      {/* Interactive Retry Button */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleRetry}
          disabled={retrying}
          className="px-4 py-2 bg-[#1da1f2] hover:bg-[#0d8ddb] text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1.5 transition-transform active:scale-95 disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />
          <span>{retrying ? 'Connecting to servers...' : 'Try Again'}</span>
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-[#b9e1f8] text-[11px] text-stone-500 font-mono flex items-center justify-between">
        <span>Artwork: "Lifting a Dreamer" by Yiying Lu</span>
        <span className="flex items-center gap-1">
          <Heart className="w-3 h-3 text-red-400 fill-red-400" /> Beloved 2008 Memory
        </span>
      </div>
    </div>
  );
}
