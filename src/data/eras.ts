export interface Era {
  id: string;
  yearRange: string;
  startYear: number;
  endYear: number;
  name: string;
  subtitle: string;
  themeColor: string;
  accentHex: string;
  tagline: string;
  browserEra: 'mosaic' | 'netscape' | 'ie6' | 'chrome';
  avgSpeed: string;
  globalUsers: string;
  hallmarkTech: string[];
  vibeDescription: string;
  fontClass: string;
}

export const ERAS: Era[] = [
  {
    id: 'dawn-1991-1995',
    yearRange: '1991 — 1995',
    startYear: 1991,
    endYear: 1995,
    name: 'The Dawn of Cyberspace',
    subtitle: 'Hypertext, CERN, and the First Mosaic Pixels',
    themeColor: 'from-amber-600 to-stone-800',
    accentHex: '#f59e0b',
    tagline: 'When the world wide web was just text, links, and gray canvases.',
    browserEra: 'mosaic',
    avgSpeed: '14.4 Kbps Dial-up',
    globalUsers: '16 Million (0.4% of world)',
    hallmarkTech: ['HTML 1.0 / 2.0', 'CGI-BIN Perl', 'FTP & Gopher', 'NCSA Mosaic', 'Grey Backgrounds'],
    vibeDescription:
      'Academic, quiet, and profoundly revolutionary. Every link was an uncharted wormhole into university physics labs and military research centers.',
    fontClass: 'font-pixel',
  },
  {
    id: 'wildwest-1996-2000',
    yearRange: '1996 — 2000',
    startYear: 1996,
    endYear: 2000,
    name: 'The Web 1.0 Wild West',
    subtitle: 'GeoCities, Blinking Text & Dot-Com Euphoria',
    themeColor: 'from-fuchsia-600 to-blue-800',
    accentHex: '#d946ef',
    tagline: 'Everyone had a personal homepage, a visitor counter, and a spinning skull GIF.',
    browserEra: 'netscape',
    avgSpeed: '56.6 Kbps V.90 Modem',
    globalUsers: '361 Million (5.8% of world)',
    hallmarkTech: ['Table Layouts & Slicing', '<marquee> & <blink>', 'GeoCities Neighborhoods', 'Netscape vs IE 4', 'RealAudio & MIDI'],
    vibeDescription:
      'Unregulated digital self-expression. Flaming animated GIFs, neon fonts on black starry backgrounds, auto-playing MIDI music, and web rings linking personal worlds.',
    fontClass: 'font-retro',
  },
  {
    id: 'flash-social-2001-2006',
    yearRange: '2001 — 2006',
    startYear: 2001,
    endYear: 2006,
    name: 'The Flash Boom & Early Social',
    subtitle: 'Newgrounds, MSN Nudges & MySpace Top 8',
    themeColor: 'from-cyan-500 to-indigo-800',
    accentHex: '#06b6d4',
    tagline: 'Bandwidth surged, Flash created games, and social media was born.',
    browserEra: 'ie6',
    avgSpeed: '512 Kbps DSL / Cable',
    globalUsers: '1.02 Billion (15.7% of world)',
    hallmarkTech: ['Macromedia Flash SWF', 'MSN Messenger & ICQ', 'MySpace HTML/CSS Hacks', 'Early YouTube 360p', 'Limewire & Winamp'],
    vibeDescription:
      'The golden age of creative internet chaos. Teens learned CSS to customize their profile music, Newgrounds pioneered viral animation, and the MSN Messenger nudge vibrated desktop monitors.',
    fontClass: 'font-fun',
  },
  {
    id: 'skeuomorphic-mobile-2007-2014',
    yearRange: '2007 — 2014',
    startYear: 2007,
    endYear: 2014,
    name: 'Mobile Dawn & Skeuomorphism',
    subtitle: 'The iPhone, Twitter Fail Whale & Glass Buttons',
    themeColor: 'from-blue-600 to-slate-900',
    accentHex: '#3b82f6',
    tagline: 'The web moved into pockets, leather textures reigned, and services crashed under scale.',
    browserEra: 'chrome',
    avgSpeed: '10 Mbps Broadband',
    globalUsers: '2.8 Billion (39% of world)',
    hallmarkTech: ['iPhone Mobile Web', 'Skeuomorphic Design', 'CSS3 Transitions', 'Twitter Fail Whale', 'Vine 6-Second Loops'],
    vibeDescription:
      'Digital interfaces mimicked real life with stitched leather, glass reflection overlays, and paper textures. Twitter grew so fast that its downtime mascot became a global icon.',
    fontClass: 'font-display',
  },
  {
    id: 'flat-algorithmic-2015-2020',
    yearRange: '2015 — 2020',
    startYear: 2015,
    endYear: 2020,
    name: 'Flat Design & Infinite Feeds',
    subtitle: 'Material Design, Memes & Dark Mode Standard',
    themeColor: 'from-violet-600 to-purple-950',
    accentHex: '#8b5cf6',
    tagline: 'Clean minimalism, infinite algorithmic scrolling, and high-speed web apps.',
    browserEra: 'chrome',
    avgSpeed: '50 Mbps Fiber & 4G',
    globalUsers: '4.5 Billion (59% of world)',
    hallmarkTech: ['Material Design / Flat UI', 'CSS Grid & Flexbox', 'Dark Mode Media Queries', 'Single Page Apps (SPAs)', 'TikTok & Memes'],
    vibeDescription:
      'The era of maximum polish and hyper-efficiency. Websites unified into sleek typography, component libraries, and infinite feeds engineered for continuous attention.',
    fontClass: 'font-sans',
  },
  {
    id: 'modern-ai-2021-2026',
    yearRange: '2021 — 2026',
    startYear: 2021,
    endYear: 2026,
    name: 'Spatial Canvas & The AI Web',
    subtitle: 'Generative Machines, Canvas Shaders & Retro Revival',
    themeColor: 'from-emerald-500 to-teal-900',
    accentHex: '#10b981',
    tagline: 'Intelligent synthesis, WebGL 3D, and digital archaeology celebrating early web roots.',
    browserEra: 'chrome',
    avgSpeed: '150+ Mbps 5G & Gig Fiber',
    globalUsers: '5.4 Billion (67% of world)',
    hallmarkTech: ['Generative Web Agents', 'WebGL / WebGPU Shaders', 'WebAssembly (WASM)', 'Micro-Interactions', 'Digital Archival'],
    vibeDescription:
      'The contemporary horizon where AI agents pair-program interfaces, browsers render console-grade 3D graphics at 60 FPS, and developers nostalgic for the early web rebuild its timeless wonders.',
    fontClass: 'font-display',
  },
];
