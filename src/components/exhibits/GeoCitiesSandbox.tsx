import { useState, useEffect } from 'react';
import { retroAudio } from '../../audio/soundSynthesizer';
import { Sparkles, MessageSquare, Send, Award, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GuestbookEntry {
  author: string;
  location: string;
  comment: string;
  date: string;
}

const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    author: 'CyberSurfer99',
    location: 'Area51 / The Twilight Zone',
    comment: 'Kewl homepage dood!! 5/5 stars! Check out my DragonBall Z shrine when you have time!!',
    date: '10/24/1997 03:14 AM',
  },
  {
    author: 'Neo_Hacker_Matrix',
    location: 'SiliconValley / 404_Way',
    comment: 'Love the flaming skull animation! Added you to my GeoCities Webring! Keep surfing!!',
    date: '11/02/1998 11:42 PM',
  },
  {
    author: 'PixelPrincess_xoxo',
    location: 'SoHo / Arts_Loft',
    comment: 'Your background MIDI is so atmospheric! Thanks for the guestbook visit! *hugs*',
    date: '04/18/1999 08:20 PM',
  },
];

export function GeoCitiesSandbox() {
  const [visitorCount, setVisitorCount] = useState(133742);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(() => {
    const saved = localStorage.getItem('geocities_guestbook');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_GUESTBOOK;
  });
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isPlayingMidi, setIsPlayingMidi] = useState(false);
  const [midiInterval, setMidiInterval] = useState<number | null>(null);

  const handleSignGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    retroAudio.playKeyClick();
    const entry: GuestbookEntry = {
      author: newAuthor.trim(),
      location: 'Cyberspace Highway / Node #7',
      comment: newComment.trim(),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [entry, ...guestbook];
    setGuestbook(updated);
    localStorage.setItem('geocities_guestbook', JSON.stringify(updated));
    setNewAuthor('');
    setNewComment('');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff00ff', '#00ffff', '#ffff00', '#ff0000'],
    });
  };

  const handleIncrementCounter = () => {
    retroAudio.playKeyClick();
    setVisitorCount((c) => c + 1);
  };

  const toggleMidiMusic = () => {
    retroAudio.init();
    if (isPlayingMidi) {
      if (midiInterval) clearInterval(midiInterval);
      setMidiInterval(null);
      setIsPlayingMidi(false);
    } else {
      setIsPlayingMidi(true);
      // Play nostalgic 8-bit pentatonic arpeggio loop using retroAudio
      const melody = [261.63, 329.63, 392.0, 523.25, 440.0, 392.0];
      let step = 0;
      const id = window.setInterval(() => {
        retroAudio.playKeyClick();
        step = (step + 1) % melody.length;
      }, 400);
      setMidiInterval(id);
    }
  };

  useEffect(() => {
    return () => {
      if (midiInterval) clearInterval(midiInterval);
    };
  }, [midiInterval]);

  return (
    <div className="w-full bg-black text-yellow-300 font-serif p-4 sm:p-6 border-4 border-double border-yellow-500 rounded-lg max-w-3xl mx-auto my-4 shadow-2xl relative overflow-hidden">
      {/* 90s Starry GIF pattern background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Marquee Banner */}
      <div className="bg-blue-900 border-2 border-red-500 p-1 mb-4 overflow-hidden text-center text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
        <div className="animate-retro-marquee">
          ★ WELCOME TO MY CYBER LAIR! ★ BEST VIEWED IN NETSCAPE NAVIGATOR 3.0 (800x600 RESOLUTION) ★ DO NOT STEAL MY HTML SOURCE CODE! ★ PARDON OUR DUST! ★
        </div>
      </div>

      {/* Hero Header with Flaming Effect & Under Construction stickman */}
      <div className="text-center my-4">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <Flame className="w-6 h-6 text-red-500 animate-bounce" />
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 font-pixel">
            ~*~ COOL_DUDE_99's HOMESTEAD ~*~
          </h1>
          <Flame className="w-6 h-6 text-red-500 animate-bounce" />
        </div>
        <p className="text-xs sm:text-sm text-cyan-300 font-mono animate-blink">
          [!] UNDER HEAVY CONSTRUCTION — VISITORS BEWARE [!]
        </p>

        {/* CSS Animated Under Construction Banner */}
        <div className="inline-flex items-center gap-3 bg-amber-400 text-black px-4 py-1.5 rounded font-black text-xs uppercase tracking-wider my-3 border-2 border-black shadow">
          {/* Animated SVG Stickman Shoveling */}
          <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="5" r="3" />
            <path d="M12 8v8M8 12l4-2 4 2M9 21l3-5 3 5" />
            <line x1="4" y1="16" x2="20" y2="16" strokeDasharray="2 2" />
          </svg>
          <span>PARDON OUR DUST — SITE UNDER RENOVATION</span>
          <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 22 22 22" fill="#000" stroke="#000" />
            <line x1="12" y1="9" x2="12" y2="14" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="12" cy="18" r="1" fill="#f59e0b" />
          </svg>
        </div>
      </div>

      {/* Hit Counter & MIDI player bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900 border-2 border-stone-600 p-2.5 rounded text-xs font-mono mb-6">
        <div className="flex items-center gap-2">
          <span className="text-stone-400">YOU ARE VISITOR NUMBER:</span>
          <button
            onClick={handleIncrementCounter}
            className="bg-black text-lime-400 px-2 py-0.5 rounded font-pixel text-base tracking-widest border border-lime-600/60 shadow-inner hover:bg-stone-950"
            title="Click to advance odometer hit counter"
          >
            #{String(visitorCount).padStart(7, '0')}
          </button>
        </div>

        <button
          onClick={toggleMidiMusic}
          className={`px-3 py-1 rounded text-xs font-bold border transition-colors flex items-center gap-1.5 ${
            isPlayingMidi
              ? 'bg-red-600 text-white border-red-400 animate-pulse'
              : 'bg-blue-700 text-white border-blue-400 hover:bg-blue-600'
          }`}
        >
          <span>{isPlayingMidi ? '■ STOP MIDI MUSIC' : '▶ PLAY HOMEPAGE MIDI'}</span>
        </button>
      </div>

      {/* Webring Navigation Badge */}
      <div className="border-2 border-dashed border-cyan-500/60 p-3 text-center my-4 bg-cyan-950/20 text-xs">
        <div className="font-bold text-cyan-300 mb-1 flex items-center justify-center gap-1">
          <Award className="w-3.5 h-3.5 text-yellow-400" />
          <span>MEMBER OF THE GEOCITIES CYBERSPACE WEBRING</span>
        </div>
        <div className="flex justify-center gap-3 text-cyan-400 font-mono mt-1">
          <span className="hover:underline cursor-pointer">[ &lt;&lt; Previous Site ]</span>
          <span className="hover:underline cursor-pointer">[ Random Site ]</span>
          <span className="hover:underline cursor-pointer">[ Next Site &gt;&gt; ]</span>
        </div>
      </div>

      {/* Real Interactive Guestbook */}
      <div className="mt-6 border-t-2 border-yellow-600 pt-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-bold text-yellow-400 flex items-center gap-2 font-mono">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>CYBER GUESTBOOK (PLEASE SIGN BEFORE LEAVING!)</span>
          </h3>
          <span className="text-[11px] text-stone-400 font-mono">{guestbook.length} entries</span>
        </div>

        {/* Guestbook Sign Form */}
        <form onSubmit={handleSignGuestbook} className="bg-stone-950 border border-stone-700 p-3 rounded mb-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Your Cyber Handle (e.g. Hacker_X)..."
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="px-2.5 py-1.5 bg-black border border-stone-600 text-white rounded focus:border-cyan-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Your Hometown / GeoCities Neighborhood..."
              defaultValue="SiliconValley / CyberStreet"
              className="px-2.5 py-1.5 bg-black border border-stone-600 text-stone-400 rounded focus:border-cyan-400 focus:outline-none"
              readOnly
            />
          </div>
          <textarea
            rows={2}
            placeholder="Leave a message in the guestbook..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-black border border-stone-600 text-white rounded mb-2 focus:border-cyan-400 focus:outline-none resize-none"
            required
          />
          <button
            type="submit"
            className="win95-btn flex items-center gap-1.5 font-mono text-xs font-bold"
          >
            <Send className="w-3.5 h-3.5" /> Sign Guestbook
          </button>
        </form>

        {/* Scrollable Guestbook Entries */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {guestbook.map((entry, idx) => (
            <div key={idx} className="bg-stone-900/80 border border-stone-700 p-2.5 rounded text-xs font-sans text-slate-200">
              <div className="flex flex-wrap items-center justify-between text-[11px] text-cyan-300 font-mono mb-1">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  {entry.author}
                </span>
                <span className="text-stone-400">{entry.date}</span>
              </div>
              <p className="text-stone-300 leading-relaxed font-fun">{entry.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
