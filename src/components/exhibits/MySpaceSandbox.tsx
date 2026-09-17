import { useState, useRef } from 'react';
import { retroAudio } from '../../audio/soundSynthesizer';
import { Heart, Music, Sparkles, MessageCircle, UserPlus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Friend {
  id: string;
  name: string;
  avatarColor: string;
  relationship: string;
  initials: string;
}

const DEFAULT_FRIENDS: Friend[] = [
  { id: '1', name: 'Tom (Co-Founder)', avatarColor: 'bg-emerald-600', relationship: 'Default Friend', initials: 'TOM' },
  { id: '2', name: 'Sparkle_Queen_99', avatarColor: 'bg-fuchsia-600', relationship: 'Bestie for Life', initials: 'SQ' },
  { id: '3', name: 'xX_Emo_Kid_Xx', avatarColor: 'bg-purple-900', relationship: 'Bandmate', initials: 'EMO' },
  { id: '4', name: 'SkaterBoi_2005', avatarColor: 'bg-amber-600', relationship: 'Skatepark Bro', initials: 'SB' },
  { id: '5', name: 'GlitterGirl_x3', avatarColor: 'bg-pink-600', relationship: 'Locker Neighbor', initials: 'GG' },
  { id: '6', name: 'CyberDJ_Remix', avatarColor: 'bg-cyan-700', relationship: 'Mixtape Guru', initials: 'DJ' },
  { id: '7', name: 'PixelArt_Dev', avatarColor: 'bg-indigo-700', relationship: 'Taught Me CSS', initials: 'PAD' },
  { id: '8', name: 'AnimeFreak_Otaku', avatarColor: 'bg-rose-700', relationship: 'AMV Creator', initials: 'AF' },
];

const MOODS = ['rawr xD (nostalgic)', 'angsty / emo', 'hyped for Warped Tour', 'learning CSS with Tom'];

export function MySpaceSandbox() {
  const [friends, setFriends] = useState<Friend[]>(DEFAULT_FRIENDS);
  const [moodIndex, setMoodIndex] = useState(0);
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cycleMood = () => {
    retroAudio.playKeyClick();
    setMoodIndex((idx) => (idx + 1) % MOODS.length);
  };

  // Sparkle cursor trail
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (Math.random() < 0.2) {
      const sparkle = document.createElement('div');
      sparkle.className = 'glitter-sparkle text-pink-400 font-bold text-xs select-none';
      sparkle.textContent = ['✦', '★', '✧', '♦'][Math.floor(Math.random() * 4)];
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      containerRef.current.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  };

  const handlePromoteFriend = (index: number) => {
    if (index === 0) return;
    retroAudio.playKeyClick();
    const copy = [...friends];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    setFriends(copy);

    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#00ffff', '#ffff00'],
    });
  };

  const toggleSong = () => {
    retroAudio.init();
    setIsPlayingSong(!isPlayingSong);
    retroAudio.playKeyClick();
    if (!isPlayingSong) {
      retroAudio.playWin95Startup();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full bg-[#181a24] text-slate-200 p-4 sm:p-6 rounded-xl border border-pink-900/50 shadow-2xl relative overflow-hidden font-sans select-none max-w-3xl mx-auto my-4"
    >
      {/* MySpace Profile Header */}
      <div className="bg-[#24283b] p-3 rounded-lg border border-pink-500/30 flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 font-fun flex items-center gap-2">
            <span>xX_CyberDreamer_2005_Xx</span>
            <span className="text-xs font-mono bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/40">
              ONLINE NOW!
            </span>
          </h2>
          <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
            <span>"I code in raw HTML & glitter"</span>
            <button onClick={cycleMood} className="text-pink-400 font-medium hover:underline text-left">
              Mood: {MOODS[moodIndex]} ↻
            </button>
          </div>
        </div>

        {/* Profile Music Player */}
        <button
          onClick={toggleSong}
          className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-colors border shadow ${
            isPlayingSong
              ? 'bg-pink-600 text-white border-pink-400 animate-pulse'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>{isPlayingSong ? 'PAUSE PROFILE SONG' : 'PLAY PROFILE SONG'}</span>
        </button>
      </div>

      {/* Profile Grid: Bio / Details + Top 8 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Avatar & Details */}
        <div className="bg-[#12131d] p-3 rounded-lg border border-slate-800 text-xs">
          <div className="w-full aspect-square bg-gradient-to-tr from-purple-800 via-pink-600 to-cyan-500 rounded-lg flex flex-col items-center justify-center p-3 text-center mb-3 shadow-inner relative overflow-hidden">
            <Sparkles className="w-8 h-8 text-yellow-300 animate-spin mb-1" />
            <span className="font-fun font-bold text-white text-base">CYBER PHOENIX</span>
            <span className="text-[10px] text-pink-200 mt-1">"Thanks 4 the add!!"</span>
          </div>

          <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
            <div className="flex justify-between py-0.5 border-b border-slate-800">
              <span className="text-slate-500">Member Since:</span>
              <span>08/14/2004</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-slate-800">
              <span className="text-slate-500">Profile Views:</span>
              <span className="text-cyan-400">84,912</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-slate-800">
              <span className="text-slate-500">Zodiac:</span>
              <span>Aquarius ⚡</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5 mt-3 pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                retroAudio.playKeyClick();
                alert('Friend Request Sent to xX_CyberDreamer_Xx!');
              }}
              className="py-1 px-2 bg-pink-600/30 hover:bg-pink-600/50 text-pink-300 border border-pink-500/40 rounded text-[11px] font-bold flex items-center justify-center gap-1"
            >
              <UserPlus className="w-3 h-3" /> Add Friend
            </button>
            <button
              onClick={() => {
                retroAudio.playMsnNudge();
                alert('Nudge / Comment sent to CyberDreamer!');
              }}
              className="py-1 px-2 bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 rounded text-[11px] font-bold flex items-center justify-center gap-1"
            >
              <MessageCircle className="w-3 h-3" /> Send PM
            </button>
          </div>
        </div>

        {/* Right 2 Columns: The Legendary Top 8 War */}
        <div className="md:col-span-2 bg-[#12131d] p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-pink-300 font-fun flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>CyberDreamer’s Top 8 Friends ({friends.length})</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Click any friend to promote ↑</span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3 leading-snug">
              In 2005, your Top 8 friends list was a battleground of friendships, relationship drama, and social hierarchy.
            </p>

            {/* Top 8 Friend Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {friends.map((friend, idx) => (
                <div
                  key={friend.id}
                  onClick={() => handlePromoteFriend(idx)}
                  className={`p-2 rounded-lg border text-center transition-all duration-150 cursor-pointer group hover:scale-[1.03] ${
                    idx === 0
                      ? 'bg-gradient-to-b from-amber-500/20 to-slate-900 border-amber-500/60 ring-1 ring-amber-500/40'
                      : 'bg-slate-900/70 border-slate-800 hover:border-pink-500/50'
                  }`}
                  title={`#${idx + 1}: ${friend.name}. Click to promote to higher spot!`}
                >
                  <div
                    className={`w-10 h-10 mx-auto rounded-full ${friend.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-md mb-1 group-hover:ring-2 ring-pink-400`}
                  >
                    {friend.initials}
                  </div>
                  <div className="text-xs font-bold text-slate-200 truncate group-hover:text-pink-300">
                    {friend.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1">
                    <span className="font-bold text-pink-400">#{idx + 1}</span>
                    <span className="truncate max-w-[70px]">{friend.relationship}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>✨ Drag/click to reorder hierarchy</span>
            <button
              onClick={() => {
                retroAudio.playKeyClick();
                setFriends([...DEFAULT_FRIENDS]);
              }}
              className="hover:underline text-cyan-400"
            >
              Reset to Default Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
