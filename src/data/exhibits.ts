export interface Exhibit {
  id: string;
  title: string;
  eraId: string;
  year: number;
  category: 'Website' | 'Browser' | 'Audio' | 'Culture' | 'Disaster' | 'Tech';
  badge: string;
  summary: string;
  whatItWas: string;
  whyItMattered: string;
  archivalQuote?: string;
  interactiveType: 'none' | 'geocities' | 'myspace' | 'browser-wars' | 'fail-whale' | 'dialup' | 'nudge';
  tags: string[];
  funFact: string;
  sourceUrl?: string;
  iconName: string;
}

export const EXHIBITS: Exhibit[] = [
  // ERA 1: 1991-1995
  {
    id: 'first-website-cern',
    title: 'The World’s First Web Page (CERN)',
    eraId: 'dawn-1991-1995',
    year: 1991,
    category: 'Website',
    badge: 'Genesis Artifact',
    summary: 'Tim Berners-Lee’s minimalist hypertext page hosted on a NeXT computer at CERN.',
    whatItWas:
      'On August 6, 1991, Tim Berners-Lee published the very first website on his NeXTcube computer at CERN in Switzerland. It had no styling, no images, and no colors—only black text and blue hyperlinks explaining what the World Wide Web was and how to create web pages.',
    whyItMattered:
      'It established the fundamental ethos of the web: an open, decentralized, royalty-free information mesh connecting humanity across machines.',
    archivalQuote: '“The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents.”',
    interactiveType: 'none',
    tags: ['CERN', 'Tim Berners-Lee', 'HTML 1.0', 'Hypertext'],
    funFact: 'Tim had a handwritten sticky note taped to his NeXT computer saying: "This machine is a server. DO NOT POWER IT DOWN!"',
    iconName: 'Globe',
  },
  {
    id: 'ncsa-mosaic',
    title: 'NCSA Mosaic — The Browser That Sparked The World',
    eraId: 'dawn-1991-1995',
    year: 1993,
    category: 'Browser',
    badge: 'First Mass Browser',
    summary: 'The first graphical browser that brought images into line with text.',
    whatItWas:
      'Created by Marc Andreessen and Eric Bina at the National Center for Supercomputing Applications (NCSA), Mosaic was the first client to render inline GIF images alongside text on Windows and Mac.',
    whyItMattered:
      'Before Mosaic, viewing an image required downloading it to disk and opening a standalone viewer. Mosaic transformed the web from an academic research tool into a mass media experience.',
    archivalQuote: '“Mosaic is the celebrated graphical ‘browser’ that allows users to travel through the world of electronic information using a point-and-click interface.”',
    interactiveType: 'browser-wars',
    tags: ['Mosaic', 'Marc Andreessen', 'GUI', 'NCSA'],
    funFact: 'Mosaic’s mascot was an illustrated spinning globe that spun while data was downloading over phone lines.',
    iconName: 'Compass',
  },
  {
    id: 'dialup-modem-handshake',
    title: 'The 56K Dial-Up Handshake',
    eraId: 'dawn-1991-1995',
    year: 1994,
    category: 'Audio',
    badge: 'Acoustic Legend',
    summary: 'The screeching, hiss-laden symphony of two modems negotiating baud rates across copper phone wires.',
    whatItWas:
      'When you dialed into an ISP, your computer’s modem took over the household telephone line. The modem speaker blared the negotiation protocol aloud so users could hear if the line was busy or if the carrier was established.',
    whyItMattered:
      'It was the gateway portal of cyberspace. Anyone online in the 1990s knows this sound by heart; it was the acoustic transition from the physical living room to the virtual world.',
    archivalQuote: '“Mom, don’t pick up the phone! I am downloading a picture!”',
    interactiveType: 'dialup',
    tags: ['56k', 'V.90', 'Baud', 'Audio', 'Modem'],
    funFact: 'The harsh high-pitch squeals were actually modems testing line quality across 200 frequency bands to pick the cleanest carrier signal.',
    iconName: 'Volume2',
  },
  {
    id: 'yahoo-directory-1994',
    title: 'Jerry and David’s Guide to the World Wide Web (Yahoo!)',
    eraId: 'dawn-1991-1995',
    year: 1994,
    category: 'Website',
    badge: 'The Internet Yellow Pages',
    summary: 'A human-curated directory of cool websites created in a Stanford trailer.',
    whatItWas:
      'Jerry Yang and David Filo started bookmarking their favorite pages. When the list grew too large, they organized it hierarchically into categories: Computers, Entertainment, Science, Government.',
    whyItMattered:
      'Before automated search crawlers like Google, Yahoo was how you discovered the internet. Human editors literally checked and classified websites by hand.',
    archivalQuote: '“Yet Another Hierarchical Officious Oracle.”',
    interactiveType: 'none',
    tags: ['Yahoo', 'Stanford', 'Web Directory', '1994'],
    funFact: 'In 1994, Yahoo recorded 1 million hits in a single day, which blew away the university’s network bandwidth.',
    iconName: 'BookOpen',
  },

  // ERA 2: 1996-2000
  {
    id: 'geocities-homestead',
    title: 'GeoCities: The Neighborhoods of the Web',
    eraId: 'wildwest-1996-2000',
    year: 1996,
    category: 'Culture',
    badge: 'Unfiltered Humanity',
    summary: 'Free homepages grouped into virtual themed cities like SiliconValley, Area51, and Tokyo.',
    whatItWas:
      'GeoCities offered every human 2 megabytes of free hosting. Users chose a neighborhood: Hollywood for cinema fans, Area51 for sci-fi, Heartland for families. It was the birth of user-generated identity.',
    whyItMattered:
      'It democratized publishing. For the first time, regular teenagers, grandmothers, and hobbyists built personal shrines to their pets, anime, or garage bands without asking anyone for permission.',
    archivalQuote: '“Welcome to my webpage! Please sign my guestbook! Under construction!”',
    interactiveType: 'geocities',
    tags: ['GeoCities', 'Web 1.0', 'Under Construction', 'Guestbook', 'Blink'],
    funFact: 'At its peak in 1999, GeoCities was the 3rd most-visited site on the entire internet, ahead of Amazon and eBay.',
    iconName: 'Home',
  },
  {
    id: 'space-jam-1996',
    title: 'The 1996 Space Jam Website',
    eraId: 'wildwest-1996-2000',
    year: 1996,
    category: 'Website',
    badge: 'The Immortal Site',
    summary: 'Warner Bros’ promotional movie site that stayed untouched on the live internet for 25 consecutive years.',
    whatItWas:
      'Built in 1996 to promote the Michael Jordan and Bugs Bunny movie, featuring tiled planetary starfield backgrounds, HTML frames, image maps, and 8-bit audio clips.',
    whyItMattered:
      'It became an accidental time capsule of mid-90s commercial web design. While virtually every other site redesigned or vanished, Space Jam stayed live, pristine, and accessible until 2021.',
    archivalQuote: '“The best website on the internet has not changed since 1996.”',
    interactiveType: 'none',
    tags: ['Space Jam', 'HTML Tables', 'Image Maps', 'Time Capsule'],
    funFact: 'The web developers used frames and circular image maps because JavaScript had barely been released.',
    iconName: 'Film',
  },
  {
    id: 'under-construction-gif',
    title: 'The “Under Construction” GIF Phenomenon',
    eraId: 'wildwest-1996-2000',
    year: 1997,
    category: 'Culture',
    badge: 'Perpetual Beta',
    summary: 'Pulsing jackhammers, striped barricades, and neon warnings that decorated unfinished personal pages.',
    whatItWas:
      'In the 1990s, no personal homepage was ever considered "done". Creators placed animated GIFs of stickmen shoveling dirt, rotating orange pylons, and flashing yellow tape to excuse missing links.',
    whyItMattered:
      'It represented the psychological shift of digital media: unlike printed books or magazines, a website was an alive, evolving organism that was perpetually unfinished.',
    archivalQuote: '“Pardon our dust! This page is best viewed in 800x600 resolution with Netscape Navigator.”',
    interactiveType: 'geocities',
    tags: ['GIF', 'Nostalgia', 'Under Construction', 'Netscape'],
    funFact: 'Many websites proudly displayed an "Under Construction" GIF for five years straight without ever updating a single sentence.',
    iconName: 'AlertTriangle',
  },
  {
    id: 'hit-counters-webrings',
    title: 'Hit Counters & Webrings',
    eraId: 'wildwest-1996-2000',
    year: 1997,
    category: 'Tech',
    badge: 'Proto-Analytics',
    summary: 'Odometer-style visitor counters and circular rings linking related niche personal sites.',
    whatItWas:
      'Before Google Analytics, websites embedded CGI scripts that generated dynamic image badges showing the exact number of visitors: "You are visitor #004,821". Below it was a Webring navigation: [Previous] [Random] [Next Site].',
    whyItMattered:
      'It was early social proof and grassroots traffic sharing. Instead of algorithms choosing what you saw, communities banded together in voluntary rings.',
    archivalQuote: '“You are the 1,337th traveler to step into this cyber realm.”',
    interactiveType: 'none',
    tags: ['Webring', 'Hit Counter', 'Perl', 'CGI'],
    funFact: 'Savvy webmasters would secretly set the hit counter starting number to 50,000 so their page looked massively popular to schoolmates.',
    iconName: 'Hash',
  },
  {
    id: 'netscape-vs-ie',
    title: 'The First Browser War (Netscape vs IE4)',
    eraId: 'wildwest-1996-2000',
    year: 1998,
    category: 'Browser',
    badge: 'Browser Wars I',
    summary: 'The high-stakes battle between Netscape’s ship wheel and Microsoft bundling Internet Explorer into Windows.',
    whatItWas:
      'Netscape was the golden darling of Silicon Valley with 80% market share. Microsoft launched a full-court press, bundling Internet Explorer for free directly inside Windows 95/98 and creating proprietary HTML tags.',
    whyItMattered:
      'It triggered the landmark United States v. Microsoft antitrust case. It also gave birth to JavaScript (written in 10 days by Brendan Eich at Netscape) and CSS standards.',
    archivalQuote: '“We are going to cut off their air supply.” — Microsoft internal memo',
    interactiveType: 'browser-wars',
    tags: ['Netscape', 'Internet Explorer', 'Antitrust', 'JavaScript'],
    funFact: 'When IE4 launched in 1997, Microsoft employees secretly placed a 10-foot tall blue "e" logo on the front lawn of Netscape headquarters overnight.',
    iconName: 'ShieldAlert',
  },
  {
    id: 'napster-p2p',
    title: 'Napster & The MP3 Revolution',
    eraId: 'wildwest-1996-2000',
    year: 1999,
    category: 'Disaster',
    badge: 'Cultural Earthquake',
    summary: 'Shawn Fanning’s dorm-room peer-to-peer program that upended the global music recording industry.',
    whatItWas:
      'Napster indexed MP3 audio files on millions of users’ personal hard drives. You could search for any song and download it directly from a teenager’s dial-up connection in Ohio.',
    whyItMattered:
      'It proved the sheer power of decentralized peer-to-peer networks and permanently transformed how humans consume music, forcing the creation of iTunes and Spotify.',
    archivalQuote: '“Napster has 80 million users. The genie is out of the bottle.”',
    interactiveType: 'none',
    tags: ['Napster', 'MP3', 'P2P', 'Disruption'],
    funFact: 'Universities across the US had to ban Napster because music downloads consumed more than 60% of their entire campus internet bandwidth.',
    iconName: 'Radio',
  },

  // ERA 3: 2001-2006
  {
    id: 'macromedia-flash-boom',
    title: 'Macromedia Flash & The Interactive Revolution',
    eraId: 'flash-social-2001-2006',
    year: 2001,
    category: 'Tech',
    badge: 'Vector Magic',
    summary: 'The browser plugin that brought vector games, cartoon series, and wild intros to a 56k web.',
    whatItWas:
      'Flash allowed creators to animate vector graphics and code interactive games with ActionScript in file sizes under 200 kilobytes. It powered Newgrounds, Homestar Runner, and Miniclip.',
    whyItMattered:
      'Before HTML5, Flash was the ONLY way to do sound, video, games, and smooth 60fps vector animation inside a browser. It inspired a generation of animators and indie game devs.',
    archivalQuote: '“Click here to skip Flash Intro [5.2 MB]”',
    interactiveType: 'none',
    tags: ['Flash', 'SWF', 'Newgrounds', 'ActionScript', 'Miniclip'],
    funFact: 'The original YouTube video player ran exclusively on Flash; without the Flash browser plugin, early YouTube could not exist.',
    iconName: 'Zap',
  },
  {
    id: 'msn-messenger-nudge',
    title: 'MSN Messenger & The Iconic "Nudge"',
    eraId: 'flash-social-2001-2006',
    year: 2005,
    category: 'Audio',
    badge: 'Instant Messaging Apex',
    summary: 'The vibrating window alert that demanded immediate attention from your high-school crush.',
    whatItWas:
      'MSN Messenger (later Windows Live Messenger) was the social heartbeat of the mid-2000s. You had custom status messages with lyrics, webcam feeds, and the infamous "Nudge" button.',
    whyItMattered:
      'The Nudge literally shook the recipient’s chat window and blasted a buzzer sound through their speakers. It was digital physical tactile feedback before haptic motors existed.',
    archivalQuote: '“*mnk17 has just sent you a nudge!* (Chat window shakes violently)”',
    interactiveType: 'nudge',
    tags: ['MSN Messenger', 'Nudge', 'Chat', 'Audio', 'Vibration'],
    funFact: 'Microsoft had to add a cooldown timer to the nudge button because teenagers were spamming friends with 50 consecutive nudges until their computers froze.',
    iconName: 'BellRing',
  },
  {
    id: 'icq-uhoh',
    title: 'ICQ: "Uh-Oh!" & The Birth of Statuses',
    eraId: 'flash-social-2001-2006',
    year: 2001,
    category: 'Audio',
    badge: 'Instant Messenger Pioneer',
    summary: 'The legendary flower-logo chat app where everyone had a 7-digit UIN number.',
    whatItWas:
      'Created by Mirabilis in Israel in 1996, ICQ ("I Seek You") pioneered real-time user online statuses (Away, Do Not Disturb, Invisible) and played the unforgettable cheerful "Uh-oh!" when a message arrived.',
    whyItMattered:
      'It proved that humans wanted synchronous ambient presence with their friends online while surfing other websites.',
    archivalQuote: '“Uh-oh!” (Synthesized child voice chime)',
    interactiveType: 'none',
    tags: ['ICQ', 'Uh-oh', 'Chat', 'UIN'],
    funFact: 'If you had a 6-digit ICQ number from the late 90s, you had god-tier status among early internet hackers.',
    iconName: 'MessageSquare',
  },
  {
    id: 'myspace-top-8',
    title: 'MySpace: HTML Freedom & The "Top 8" War',
    eraId: 'flash-social-2001-2006',
    year: 2005,
    category: 'Culture',
    badge: 'High School Drama Engine',
    summary: 'The first modern social network, where millions taught themselves CSS to add emo music and custom layouts.',
    whatItWas:
      'On MySpace, users could paste raw `<style>` and `<script>` tags right into their bio. You could change backgrounds to glitter skulls, autoplay a Hawthorne Heights track, and rank your Top 8 friends publicly.',
    whyItMattered:
      'It accidentally became the greatest web development educator in human history. Millions of Gen Z and Millennial coders learned CSS and hex codes just to trick out their profile.',
    archivalQuote: '“Thanks for the add! You’ve been promoted to my Top 8.”',
    interactiveType: 'myspace',
    tags: ['MySpace', 'Top 8', 'Tom', 'CSS Hacks', 'Glitter'],
    funFact: 'Everyone’s first friend was Tom Anderson, the platform co-founder whose smiling photo in a white t-shirt remains legendary.',
    iconName: 'Users',
  },
  {
    id: 'early-youtube-2005',
    title: 'Early YouTube & "Me at the zoo"',
    eraId: 'flash-social-2001-2006',
    year: 2005,
    category: 'Website',
    badge: 'Video Democracy',
    summary: 'Jawad Karim’s 19-second video standing in front of elephants in San Diego.',
    whatItWas:
      'On April 23, 2005, YouTube co-founder Jawed Karim uploaded the first video. The site had simple five-star ratings, yellow subscribe buttons, video responses, and 320x240 pixel resolutions.',
    whyItMattered:
      'Before YouTube, sharing video required hosting an `.avi` or `.mov` file on FTP servers. YouTube made video instantly embeddable on any blog with an iframe.',
    archivalQuote: '“All right, so here we are in front of the elephants... and that’s pretty much all there is to say.”',
    interactiveType: 'none',
    tags: ['YouTube', 'Video', 'Jawed', 'Broadcast Yourself'],
    funFact: 'YouTube was originally prototyped as a video dating website with the slogan "Tune in, Hook up". Nobody submitted dating videos, so they opened it to everything.',
    iconName: 'PlayCircle',
  },
  {
    id: 'wikipedia-birth',
    title: 'Wikipedia: The Free Encyclopedia Anyone Can Edit',
    eraId: 'flash-social-2001-2006',
    year: 2001,
    category: 'Website',
    badge: 'Monument of Goodwill',
    summary: 'Jimmy Wales and Larry Sanger’s collaborative wiki that made physical paper encyclopedias obsolete.',
    whatItWas:
      'Started as a side project to feed an expert-written encyclopedia called Nupedia. When anyone could click "Edit" on a page, it grew exponentially into the greatest repository of knowledge ever assembled.',
    whyItMattered:
      'Pundits predicted chaos and vandalism would destroy it. Instead, millions of volunteer editors built the only top-10 global website that is non-profit, ad-free, and community-policed.',
    archivalQuote: '“Imagine a world in which every single person on the planet is given free access to the sum of all human knowledge.”',
    interactiveType: 'none',
    tags: ['Wikipedia', 'Wiki', 'Open Source', 'Crowdsourced'],
    funFact: 'The first edit ever made on Wikipedia was by Jimmy Wales, who typed: "Hello, World!".',
    iconName: 'BookMarked',
  },

  // ERA 4: 2007-2014
  {
    id: 'twitter-fail-whale',
    title: 'The Twitter Fail Whale',
    eraId: 'skeuomorphic-mobile-2007-2014',
    year: 2008,
    category: 'Disaster',
    badge: 'Beloved Crash Mascot',
    summary: 'A serene white beluga whale lifted by orange birds while Twitter’s Ruby on Rails database melted down.',
    whatItWas:
      'Illustrated by artist Yiying Lu, the illustration was titled "Lifting a Dreamer". Whenever Twitter experienced heavy server outages (which happened almost daily in 2008–2010), users were greeted by the Fail Whale.',
    whyItMattered:
      'Instead of an ugly Apache 500 error code, Twitter turned system downtime into a shared cultural joke. Users tweeted poems and drew fan art celebrating the whale.',
    archivalQuote: '“Twitter is over capacity. Too many tweets! Please wait a moment and try again.”',
    interactiveType: 'fail-whale',
    tags: ['Fail Whale', 'Twitter', 'Server Down', 'Ruby on Rails'],
    funFact: 'The illustration was originally purchased off the royalty-free stock website iStockphoto for less than $15.',
    iconName: 'ServerCrash',
  },
  {
    id: 'iphone-safari-touch',
    title: 'The iPhone & The Death of Desktop-Only Web',
    eraId: 'skeuomorphic-mobile-2007-2014',
    year: 2007,
    category: 'Browser',
    badge: 'Pinch to Zoom',
    summary: 'Steve Jobs demoing full desktop Safari in the palm of a hand with pinch-to-zoom.',
    whatItWas:
      'Before 2007, mobile phones loaded crippled, stripped-down text sites using WAP/WML. Mobile Safari rendered real HTML pages, introduced the viewport meta tag, and refused to run Flash.',
    whyItMattered:
      'It killed Flash (formalized by Steve Jobs’ famous 2010 "Thoughts on Flash" letter) and triggered the responsive web design revolution (media queries, fluid grids, and touch-first UIs).',
    archivalQuote: '“The internet in your pocket. Not the mobile web, the REAL web.”',
    interactiveType: 'none',
    tags: ['iPhone', 'Safari', 'Responsive', 'Touch', 'Mobile'],
    funFact: 'During the 2007 keynote demo, the original iPhone prototype was so unstable that Steve Jobs had to follow a strict sequential path of apps or the memory would crash.',
    iconName: 'Smartphone',
  },
  {
    id: 'skeuomorphism-era',
    title: 'The Skeuomorphic Design Movement',
    eraId: 'skeuomorphic-mobile-2007-2014',
    year: 2010,
    category: 'Tech',
    badge: 'Stitched Leather & Glass',
    summary: 'When web and OS design simulated real-world wood, yellow legal pads, brushed metal, and glossy bevels.',
    whatItWas:
      'To help humans transition to touchscreens, digital interfaces mimicked real physical objects: Notes looked like yellow ruled paper, Game Center had green casino felt, and buttons had drop-shadows and glass specular highlights.',
    whyItMattered:
      'It provided immediate visual affordance to billions of first-time smartphone users who had never touched a screen before.',
    archivalQuote: '“We made the buttons on the screen look so good you’ll want to lick them.” — Steve Jobs',
    interactiveType: 'none',
    tags: ['Skeuomorphism', 'UI Design', 'Drop Shadows', 'Gloss'],
    funFact: 'The Podcasts app in iOS 6 featured a fully animated reel-to-reel tape recorder that physically spun as audio played.',
    iconName: 'Layers',
  },
  {
    id: 'vine-six-seconds',
    title: 'Vine: The 6-Second Comedy Laboratory',
    eraId: 'skeuomorphic-mobile-2007-2014',
    year: 2013,
    category: 'Culture',
    badge: 'Micro-Video Pioneer',
    summary: 'Looping 6-second videos that invented a whole new comedic grammar and launched modern creator culture.',
    whatItWas:
      'Purchased by Twitter before launch, Vine restricted uploads to exactly 6 seconds recorded by pressing your thumb to the screen. When released, the camera paused.',
    whyItMattered:
      'The constraint forced hyper-edited, rhythmic visual storytelling. It created modern internet humor, viral sound bites, and proved short-form looping video would take over the world.',
    archivalQuote: '“Do it for the Vine!”',
    interactiveType: 'none',
    tags: ['Vine', 'Short-form', 'Video', 'Loop', 'Culture'],
    funFact: 'When Vine shut down in 2017, hundreds of compilation archives on YouTube racked up billions of views from people mourning the platform.',
    iconName: 'Repeat',
  },

  // ERA 5: 2015-2020
  {
    id: 'flat-design-takeover',
    title: 'The Flat & Material Design Takeover',
    eraId: 'flat-algorithmic-2015-2020',
    year: 2015,
    category: 'Tech',
    badge: 'Minimalist Purge',
    summary: 'The complete elimination of gradients, drop shadows, and textures in favor of bold colors and geometric typography.',
    whatItWas:
      'Spearheaded by Windows Phone Metro, Google Material Design, and iOS 7, designers stripped interfaces down to pure geometry, whitespace, and pastel cards.',
    whyItMattered:
      'It aligned design with responsive screen sizes and fast load times. Sites no longer loaded heavy PNG textures; everything was rendered via SVG and pure CSS.',
    archivalQuote: '“Digital materials: paper and ink reimagined for responsive touch.”',
    interactiveType: 'none',
    tags: ['Flat Design', 'Material Design', 'SVG', 'CSS Grid'],
    funFact: 'When Apple introduced flat design with iOS 7, many users complained that buttons didn’t look like buttons anymore.',
    iconName: 'Square',
  },
  {
    id: 'dark-mode-standardization',
    title: 'The Dark Mode Standardization',
    eraId: 'flat-algorithmic-2015-2020',
    year: 2018,
    category: 'Tech',
    badge: 'Night Owl Salvation',
    summary: 'The browser and OS adoption of `prefers-color-scheme: dark` that spared billions of eyes from 2 AM white glare.',
    whatItWas:
      'After decades of default white backgrounds mimicking paper, OLED screens and night-shift developers demanded system-level dark themes. CSS added native media queries to trigger dark themes automatically.',
    whyItMattered:
      'It acknowledged that humans look at screens for 12+ hours a day in varying lighting conditions, saving battery life on mobile OLED displays.',
    archivalQuote: '“Dark mode isn’t a feature; it’s a human right.”',
    interactiveType: 'none',
    tags: ['Dark Mode', 'CSS', 'OLED', 'Accessibility'],
    funFact: 'Early computer monitors in the 1970s and 80s were actually ALL dark mode by default because monochrome phosphor screens only lit up green or amber text.',
    iconName: 'Moon',
  },
  {
    id: 'flash-deprecation-day',
    title: 'The Official End of Adobe Flash Player',
    eraId: 'flat-algorithmic-2015-2020',
    year: 2020,
    category: 'Disaster',
    badge: 'End of an Era',
    summary: 'December 31, 2020: The day browsers permanently disabled the Flash plugin, orphaning 20 years of web games.',
    whatItWas:
      'Adobe officially terminated support for Flash Player, and major browsers pushed updates blocking Flash content from executing. Overnight, millions of historic browser games and animations stopped loading.',
    whyItMattered:
      'It sparked a massive internet preservation movement. Projects like Ruffle (Rust-based Flash emulator) and the Internet Archive rushed to save hundreds of thousands of SWF files before they vanished.',
    archivalQuote: '“Adobe Flash Player is no longer supported. Please uninstall it from your computer.”',
    interactiveType: 'none',
    tags: ['Flash', 'Preservation', 'Ruffle', 'Internet Archive'],
    funFact: 'South Africa’s tax collection agency had to build its own custom browser in 2021 because their online tax submission forms still relied on Flash.',
    iconName: 'Skull',
  },

  // ERA 6: 2021-2026
  {
    id: 'generative-ai-web',
    title: 'The Generative & Intelligent Web',
    eraId: 'modern-ai-2021-2026',
    year: 2023,
    category: 'Tech',
    badge: 'The Synthetic Horizon',
    summary: 'Large Language Models, browser agents, and synthetic media rewriting how content is generated and consumed.',
    whatItWas:
      'Interfaces transitioned from static retrieval to dynamic generation. Chat interfaces, autonomous agent pairs, and instant client-side WebGPU neural networks allowed computers to write and render interfaces in real time.',
    whyItMattered:
      'Search engines that indexed documents for 30 years were augmented by generative answers. Code authoring shifted to interactive pair programming between humans and reasoning agents.',
    archivalQuote: '“The web was built for humans to read. Now it is also written and understood by intelligence.”',
    interactiveType: 'none',
    tags: ['AI', 'LLMs', 'WebGPU', 'Generative UI', 'Agents'],
    funFact: 'Within 2 months of launch, ChatGPT reached 100 million monthly active users, making it the fastest-growing consumer web application in internet history.',
    iconName: 'Cpu',
  },
  {
    id: 'webgl-canvas-revival',
    title: 'Creative Coding & WebGL Spatial Canvas',
    eraId: 'modern-ai-2021-2026',
    year: 2024,
    category: 'Tech',
    badge: 'Shader Renaissance',
    summary: 'High-performance 3D shaders, physics simulations, and generative canvas art running at 60 FPS on any phone.',
    whatItWas:
      'Modern web developers rediscovered the experimental joy of the early web using WebGL, WebGPU, Three.js, and Canvas 2D. Websites transformed from sterile business cards into immersive spatial interactive experiences.',
    whyItMattered:
      'It brought the fun, experimental weirdness back to the web, proving that browsers are not just document viewers, but the world’s most accessible universal software engine.',
    archivalQuote: '“The web is the ultimate creative canvas.”',
    interactiveType: 'none',
    tags: ['WebGL', 'WebGPU', 'Three.js', 'Creative Coding', 'Shaders'],
    funFact: 'A modern smartphone running WebGPU in Safari has more graphics computing power than a top-tier supercomputer cluster did when Mosaic was released in 1993.',
    iconName: 'Sparkles',
  },
];
