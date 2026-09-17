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

  // Whole Page Visual Transformation System
  rootClass: string;
  headerClass: string;
  headerTitleClass: string;
  timelineContainerClass: string;
  soundboardContainerClass: string;
  footerClass: string;

  // Viewport Interior System
  containerClass: string;
  bannerClass: string;
  cardClass: string;
  cardTitleClass: string;
  cardBadgeClass: string;
  cardSummaryClass: string;
  cardExploreClass: string;
  filterContainerClass: string;
  inputClass: string;
  buttonClass: string;
  pillActiveClass: string;
  pillInactiveClass: string;
}

export const ERAS: Era[] = [
  // 1. 1991-1995: CERN & MOSAIC 1993 GREY CANVAS (GENESIS OF HYPERTEXT)
  {
    id: 'dawn-1991-1995',
    yearRange: '1991 — 1995',
    startYear: 1991,
    endYear: 1995,
    name: 'The Dawn of Cyberspace',
    subtitle: 'Hypertext, CERN, and the First Mosaic Pixels',
    themeColor: 'from-stone-400 to-stone-600',
    accentHex: '#000080',
    tagline: 'When the world wide web was just text, links, and gray canvases.',
    browserEra: 'mosaic',
    avgSpeed: '14.4 Kbps Dial-up',
    globalUsers: '16 Million (0.4% of world)',
    hallmarkTech: ['HTML 1.0 / 2.0', 'CGI-BIN Perl', 'FTP & Gopher', 'NCSA Mosaic', 'Grey Backgrounds'],
    vibeDescription:
      'Academic, quiet, and profoundly revolutionary. Every link was an uncharted wormhole into university physics labs and military research centers.',
    fontClass: 'font-serif',

    // Full Page System (100% Authentic Gray Canvas)
    rootClass: 'era-dawn-root',
    headerClass: 'bg-[#c0c0c0] text-black border-b-2 border-[#808080] shadow-[0_2px_0_#ffffff]',
    headerTitleClass: 'text-black font-serif tracking-normal font-bold',
    timelineContainerClass: 'win95-box bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-[2px_2px_0px_#000000]',
    soundboardContainerClass: 'win95-box bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-[2px_2px_0px_#000000]',
    footerClass: 'bg-[#c0c0c0] text-stone-800 border-t-2 border-t-[#808080] border-b-white',

    // Viewport Inner System
    containerClass: 'bg-[#bfbfbf] text-black font-serif',
    bannerClass: 'bg-[#d4d0c8] text-black border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-[2px_2px_0px_#404040]',
    cardClass: 'bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-[2px_2px_0px_#404040] hover:bg-[#cecece]',
    cardTitleClass: 'text-[#000080] font-serif font-bold text-base hover:underline',
    cardBadgeClass: 'bg-[#000080] text-white font-mono text-[10px] px-1.5 py-0.5 border border-black',
    cardSummaryClass: 'text-stone-800 font-serif text-xs',
    cardExploreClass: 'text-[#0000ee] underline font-serif font-bold text-xs',
    filterContainerClass: 'bg-[#d4d0c8] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-[1px_1px_0px_#000000]',
    inputClass: 'bg-white text-black border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white font-mono text-xs focus:outline-none',
    buttonClass: 'win95-btn font-mono font-bold text-xs',
    pillActiveClass: 'bg-[#000080] text-white border-2 border-t-black border-l-black border-b-white border-r-white font-bold',
    pillInactiveClass: 'win95-btn font-normal text-black',
  },

  // 2. 1996-2000: AUTHENTIC WEB 1.0 & DOT-COM BOOM (NETSCAPE NAVIGATOR & WHITE TABLE LAYOUTS)
  {
    id: 'wildwest-1996-2000',
    yearRange: '1996 — 2000',
    startYear: 1996,
    endYear: 2000,
    name: 'The Web 1.0 Wild West',
    subtitle: 'Netscape, Dot-Com Boom & HTML Table Layouts',
    themeColor: 'from-blue-700 to-indigo-900',
    accentHex: '#003399',
    tagline: 'The era of Netscape Navigator, Yahoo directories, hit counters, and the Dot-Com frenzy.',
    browserEra: 'netscape',
    avgSpeed: '56.6 Kbps V.90 Modem',
    globalUsers: '361 Million (5.8% of world)',
    hallmarkTech: ['Table Layouts & Slicing', 'Verdana & Comic Sans MS', 'Web-Safe 216 Palette', 'Netscape Navigator 3/4', 'Hit Counters & CGI'],
    vibeDescription:
      'The explosive commercial birth of the internet. Clean white pages divided by HTML table cells, classic navy blue headers, blue underlined links, and beveled buttons.',
    fontClass: 'font-sans',

    // Full Page System (Authentic Light Beige/Parchment & Netscape Navy Blue)
    rootClass: 'era-wildwest-root',
    headerClass: 'bg-[#000080] text-white border-b-2 border-stone-500 shadow-[0_2px_0_#ffffff]',
    headerTitleClass: 'text-white font-sans font-bold tracking-tight',
    timelineContainerClass: 'bg-[#dcd8c4] text-black border-2 border-t-white border-l-white border-b-stone-600 border-r-stone-600 shadow-[2px_2px_0px_#404040]',
    soundboardContainerClass: 'bg-[#dcd8c4] text-black border-2 border-t-white border-l-white border-b-stone-600 border-r-stone-600 shadow-[2px_2px_0px_#404040]',
    footerClass: 'bg-[#d4d0c8] text-stone-700 border-t-2 border-stone-500',

    // Viewport Inner System (Clean White Web 1.0 Table Layout)
    containerClass: 'bg-[#ffffff] text-black font-sans',
    bannerClass: 'bg-[#eef3fb] text-black border-2 border-[#003399] shadow-[2px_2px_0px_#003399]',
    cardClass: 'bg-[#ffffff] text-black border-2 border-t-white border-l-white border-b-stone-500 border-r-stone-500 shadow-[2px_2px_0px_#808080] hover:bg-[#f8f9fa]',
    cardTitleClass: 'text-[#0000ee] font-sans font-bold text-base hover:underline',
    cardBadgeClass: 'bg-[#003399] text-white font-sans text-[10px] px-1.5 py-0.5 border border-black',
    cardSummaryClass: 'text-stone-700 font-sans text-xs',
    cardExploreClass: 'text-[#0000ee] underline font-sans font-bold text-xs',
    filterContainerClass: 'bg-[#f0f0f0] border-2 border-stone-500 shadow-[1px_1px_0px_#000000]',
    inputClass: 'bg-white text-black border-2 border-t-stone-600 border-l-stone-600 border-b-white border-r-white font-sans text-xs focus:outline-none',
    buttonClass: 'win95-btn font-sans font-bold text-xs',
    pillActiveClass: 'bg-[#003399] text-white border-2 border-t-black border-l-black border-b-white border-r-white font-bold text-xs',
    pillInactiveClass: 'win95-btn font-normal text-black text-xs',
  },

  // 3. 2001-2006: AUTHENTIC FLASH BOOM & EARLY SOCIAL (WEB 2.0 CANDY AQUA & XP LUNA)
  {
    id: 'flash-social-2001-2006',
    yearRange: '2001 — 2006',
    startYear: 2001,
    endYear: 2006,
    name: 'The Flash Boom & Early Social',
    subtitle: 'Newgrounds, MSN Nudges & MySpace Top 8',
    themeColor: 'from-sky-400 to-blue-600',
    accentHex: '#0066cc',
    tagline: 'Bandwidth surged, Flash created games, and social media was born.',
    browserEra: 'ie6',
    avgSpeed: '512 Kbps DSL / Cable',
    globalUsers: '1.02 Billion (15.7% of world)',
    hallmarkTech: ['Macromedia Flash SWF', 'MSN Messenger & ICQ', 'MySpace HTML/CSS Hacks', 'Early YouTube 360p', 'Limewire & Winamp'],
    vibeDescription:
      'The golden age of creative internet chaos. Bright optimistic white canvases, glossy Aqua candy gel buttons, Flickr & Digg Web 2.0 aesthetics, and MSN Messenger nudges.',
    fontClass: 'font-fun',

    // Full Page System (Clean Sky Gradient & Glossy Web 2.0 Aqua)
    rootClass: 'era-flash-root',
    headerClass: 'bg-gradient-to-b from-[#2a68b2] to-[#1a4a82] text-white border-b-2 border-[#123661] shadow-md',
    headerTitleClass: 'text-white font-fun font-bold tracking-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]',
    timelineContainerClass: 'bg-white/95 text-[#1a2a3a] border-2 border-[#b5d5f5] rounded-2xl shadow-[0_4px_15px_rgba(0,102,204,0.12)]',
    soundboardContainerClass: 'bg-white/95 text-[#1a2a3a] border-2 border-[#b5d5f5] rounded-2xl shadow-[0_4px_15px_rgba(0,102,204,0.12)]',
    footerClass: 'bg-[#dcebf7] text-[#335577] border-t border-[#b5d5f5]',

    // Viewport Inner System (Clean Web 2.0 White Canvas & Glossy Gel Badges)
    containerClass: 'bg-[#ffffff] text-[#222222] font-fun',
    bannerClass: 'bg-gradient-to-b from-[#ebf4fc] to-[#d8eaf8] text-[#1c3d5a] border-2 border-[#a8cfee] rounded-2xl shadow-[0_4px_12px_rgba(0,102,204,0.15)]',
    cardClass: 'bg-white text-[#222222] border-2 border-[#d0e2f2] rounded-xl shadow-[0_4px_12px_rgba(0,80,160,0.08)] hover:border-[#3895e8] hover:shadow-[0_6px_18px_rgba(0,102,204,0.18)] hover:-translate-y-0.5 transition-all',
    cardTitleClass: 'text-[#0055b3] font-fun font-bold text-base hover:underline',
    cardBadgeClass: 'web2-glossy-orange text-white rounded-full font-sans text-xs px-2.5 py-0.5 shadow',
    cardSummaryClass: 'text-[#445566] font-sans text-xs',
    cardExploreClass: 'text-[#0066cc] font-fun font-bold text-xs hover:underline',
    filterContainerClass: 'bg-gradient-to-b from-[#f0f6fc] to-[#e1edf8] border-2 border-[#c2dcf0] rounded-2xl shadow-sm',
    inputClass: 'bg-white text-[#1a2a3a] border-2 border-[#9fc4e4] rounded-xl font-sans text-xs focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/20 shadow-inner placeholder:text-[#8899aa]',
    buttonClass: 'web2-glossy-btn text-white font-bold rounded-full border border-[#0d4d8c] shadow-[0_2px_8px_rgba(0,102,204,0.35)] hover:brightness-105 active:scale-95',
    pillActiveClass: 'web2-glossy-btn text-white rounded-full font-bold shadow-md',
    pillInactiveClass: 'bg-white text-[#0055b3] border border-[#b5d5f5] rounded-full hover:bg-[#eaf4fd]',
  },

  // 4. 2007-2014: AUTHENTIC SKEUOMORPHISM (APPLE WOVEN LINEN, STITCHED LEATHER & BRUSHED METAL)
  {
    id: 'skeuomorphic-mobile-2007-2014',
    yearRange: '2007 — 2014',
    startYear: 2007,
    endYear: 2014,
    name: 'Mobile Dawn & Skeuomorphism',
    subtitle: 'The iPhone, Twitter Fail Whale & Glass Buttons',
    themeColor: 'from-stone-600 to-stone-900',
    accentHex: '#3a75c4',
    tagline: 'The web moved into pockets, physical textures reigned, and services crashed under scale.',
    browserEra: 'chrome',
    avgSpeed: '10 Mbps Broadband',
    globalUsers: '2.8 Billion (39% of world)',
    hallmarkTech: ['iPhone Mobile Web', 'Skeuomorphic Textures', 'CSS3 Drop Shadows', 'Twitter Fail Whale', 'Vine 6-Second Loops'],
    vibeDescription:
      'Digital interfaces mimicked the physical world: dark woven linen, stitched leather seams, brushed aluminum bezels, letterpress etched typography, and convex glass buttons.',
    fontClass: 'font-display',

    // Full Page System (Authentic Apple iOS Woven Linen & Stitched Leather)
    rootClass: 'era-skeuomorphic-root',
    headerClass: 'bg-gradient-to-b from-[#4a4d56] to-[#2c2e35] text-stone-100 border-b-2 border-black/60 shadow-[0_4px_12px_rgba(0,0,0,0.8)]',
    headerTitleClass: 'text-stone-100 font-bold tracking-tight text-letterpress-dark',
    timelineContainerClass: 'bg-[#1e2025]/95 text-stone-100 border-2 border-[#3d4048] rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] skeuomorphic-stitch',
    soundboardContainerClass: 'bg-[#1e2025]/95 text-stone-100 border-2 border-[#3d4048] rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] skeuomorphic-stitch',
    footerClass: 'bg-[#18191e] text-stone-400 border-t-2 border-black/80 shadow-inner',

    // Viewport Inner System (Physical Cream Paper Cardboard & Stitched Leather)
    containerClass: 'bg-[#25272e] text-stone-100 font-sans',
    bannerClass: 'bg-gradient-to-b from-[#3a3d46] to-[#22242b] text-stone-100 border-2 border-[#4d515c] rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.2)] skeuomorphic-stitch',
    cardClass: 'bg-gradient-to-b from-[#fffef7] to-[#f4f1e6] text-[#2c2b28] border-2 border-[#c4beaa] rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.6),inset_0_1px_0_#ffffff] hover:border-[#3a75c4] hover:shadow-[0_8px_24px_rgba(0,0,0,0.8)] transition-all',
    cardTitleClass: 'text-[#1f2024] font-bold text-base tracking-tight text-letterpress-light',
    cardBadgeClass: 'bg-gradient-to-b from-[#4a4d56] to-[#2a2c33] text-stone-200 border border-black/50 rounded font-mono text-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
    cardSummaryClass: 'text-[#55524b] font-sans text-xs',
    cardExploreClass: 'text-[#1e58a2] font-sans font-bold text-xs drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]',
    filterContainerClass: 'bg-gradient-to-b from-[#32353d] to-[#22242a] border-2 border-[#454954] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.5)] skeuomorphic-stitch',
    inputClass: 'bg-[#191b20] text-stone-100 border-2 border-[#121316] rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] font-sans text-xs focus:border-[#4a90e2] placeholder:text-stone-500',
    buttonClass: 'skeuomorphic-glass-btn text-white font-bold rounded-lg shadow-[0_3px_8px_rgba(0,0,0,0.6)] hover:brightness-110 active:scale-95',
    pillActiveClass: 'skeuomorphic-glass-btn text-white rounded-lg font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]',
    pillInactiveClass: 'bg-gradient-to-b from-[#3e424b] to-[#292b31] text-stone-300 border border-black/40 rounded-lg hover:brightness-110 shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
  },

  // 5. 2015-2020: FLAT MATERIAL MINIMALISM
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

    // Full Page System
    rootClass: 'era-flat-root',
    headerClass: 'bg-[#161a24] text-slate-100 border-b border-slate-800 shadow-none',
    headerTitleClass: 'text-slate-100 font-sans font-bold tracking-tight',
    timelineContainerClass: 'bg-[#161a24] text-slate-100 border border-slate-800 rounded-xl shadow-none',
    soundboardContainerClass: 'bg-[#161a24] text-slate-100 border border-slate-800 rounded-xl shadow-none',
    footerClass: 'bg-[#10131a] text-slate-500 border-t border-slate-800',

    // Viewport Inner System
    containerClass: 'bg-[#12151f] text-slate-100 font-sans',
    bannerClass: 'bg-[#1a1e2b] text-white border border-slate-700/80 rounded-xl shadow-none',
    cardClass: 'bg-[#191d29] text-slate-200 border border-slate-800 rounded-lg hover:border-violet-500 hover:bg-[#1f2433] shadow-none transition-all',
    cardTitleClass: 'text-slate-100 font-medium text-base',
    cardBadgeClass: 'bg-violet-600 text-white rounded font-mono text-[11px] px-2 py-0.5',
    cardSummaryClass: 'text-slate-400 font-sans text-xs',
    cardExploreClass: 'text-violet-400 font-mono font-medium text-xs',
    filterContainerClass: 'bg-[#1a1e2b] border border-slate-800 rounded-xl',
    inputClass: 'bg-[#12151f] text-slate-100 border border-slate-700 rounded-lg font-sans text-xs focus:border-violet-500 placeholder:text-slate-500',
    buttonClass: 'bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-500 transition-colors',
    pillActiveClass: 'bg-violet-600 text-white rounded-lg font-medium',
    pillInactiveClass: 'bg-[#12151f] text-slate-400 border border-slate-800 rounded-lg hover:text-slate-200',
  },

  // 6. 2021-2026: SPATIAL CANVAS & CYBER OBSIDIAN
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

    // Full Page System
    rootClass: 'era-cyber-root',
    headerClass: 'bg-slate-950/40 backdrop-blur-2xl text-slate-100 border-b border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]',
    headerTitleClass: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-display font-black tracking-wider',
    timelineContainerClass: 'bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.1)]',
    soundboardContainerClass: 'bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.1)]',
    footerClass: 'bg-slate-950/80 backdrop-blur-xl text-slate-400 border-t border-cyan-500/20',

    // Viewport Inner System
    containerClass: 'bg-[#05050b] text-slate-100 font-display cyber-mesh-pattern',
    bannerClass: 'bg-slate-900/40 backdrop-blur-2xl text-white border border-cyan-500/40 rounded-3xl shadow-[0_0_35px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30',
    cardClass: 'bg-slate-900/30 backdrop-blur-xl text-slate-200 border border-slate-800/80 rounded-2xl hover:border-cyan-400/90 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all',
    cardTitleClass: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 font-display font-black text-base',
    cardBadgeClass: 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 rounded-full font-mono text-[11px] px-2 py-0.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]',
    cardSummaryClass: 'text-slate-300 font-sans text-xs',
    cardExploreClass: 'text-cyan-400 font-mono font-bold text-xs tracking-wider',
    filterContainerClass: 'bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]',
    inputClass: 'bg-slate-950/60 text-cyan-100 border border-slate-800 rounded-xl font-mono text-xs focus:border-cyan-400 shadow-inner placeholder:text-slate-600',
    buttonClass: 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-black font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:brightness-110 active:scale-95',
    pillActiveClass: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/80 rounded-xl font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]',
    pillInactiveClass: 'bg-slate-900/60 text-slate-400 border border-slate-800 rounded-xl hover:text-slate-200',
  },
];
