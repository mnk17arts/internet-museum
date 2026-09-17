# 🏛️ The Internet Museum (AN INTERACTIVE ARCHIVE OF CYBERSPACE: 1991–2026)

> **Step into the digital time machine.** An interactive, sensory museum documenting 35 years of web history, dial-up sounds, classic browser engines (Mosaic, Netscape, IE6), GeoCities sandboxes, MySpace chaos, and cultural web relics.

Part of the **Weird Web Projects** series (Project 10).

---

## 🌟 Highlights & Features

1. **The Chrono-Timeline (1991 — 2026)**
   - **Era 1 (1991–1995): The Dawn of Cyberspace** — CERN, Tim Berners-Lee, NCSA Mosaic, 14.4k dial-up, pure HTML and blue hyperlinks.
   - **Era 2 (1996–2000): The Web 1.0 Wild West** — GeoCities, Under Construction GIFs, blinking text, hit counters, Netscape vs IE4, Space Jam, Napster.
   - **Era 3 (2001–2006): The Flash Boom & Early Social Dawn** — Macromedia Flash `.swf` vector games, MSN Messenger nudges, ICQ "Uh-oh!", MySpace HTML/CSS hacks & Top 8, early YouTube.
   - **Era 4 (2007–2014): Mobile Dawn & Skeuomorphism** — iPhone Mobile Safari, skeuomorphic leather and felt textures, Twitter Fail Whale, Vine 6-second loops.
   - **Era 5 (2015–2020): Flat Design & Algorithmic Feeds** — Material Design, CSS Grid, Dark Mode standardization, meme velocity, infinite scroll.
   - **Era 6 (2021–2026): Spatial Canvas & The AI Web** — WebGL/WebGPU shaders, creative coding revival, AI web agents, and digital archaeology.

2. **The "Retro Browser Chrome" Simulator**
   - Seamlessly switch the entire museum viewport between 4 period-accurate browser frames:
     - **NCSA Mosaic 1993**: Stone gray bevels, spinning globe, and early hypertext menu.
     - **Netscape Navigator 3.0 (1996)**: Embossed toolbar, gold key, animated meteor lighthouse, and Net Search buttons.
     - **Internet Explorer 6 (2001)**: Windows XP Luna Blue gradient, spinning Windows flag e-globe, and green "Go" arrow.
     - **Modern Cyber-Chrome (2026)**: Minimalist glass rounded tabs, HTTPS padlock, and omnibar.

3. **100% Procedural "Sounds of Cyberspace" Soundboard**
   - Built entirely on the browser's native **Web Audio API** — zero external audio files, zero 404 errors, and instant playback:
     - **56K Dial-Up Modem Handshake**: Dual-tone dial pulses, 2100Hz V.25 answer tones, V.8/V.34 baud rate negotiations, scrambler white-noise train, and connection click.
     - **MSN Messenger Nudge**: Dual vibration buzzer alert that violently shakes the screen.
     - **ICQ "Uh-Oh!"**: Formant-filtered synthesizer voice approximation.
     - **AOL "You've Got Mail"**: Nostalgic tri-tone chime.
     - **Windows 95 Startup Pad**: Brian Eno-style ambient ascending harmonic chord progression.
     - **CRT Monitor Degauss & Hum**: Heavy degauss coil thud followed by 15kHz flyback transformer whine.
     - **Model M Mechanical Key Click**: Buckling spring switch clack.
     - **PC Speaker Beep**: 8-bit retro motherboard tone.
   - Real-time **Web Audio Oscilloscope** rendering live audio waveforms on canvas.
   - Persistent mute control stored in `localStorage`.

4. **Curated Interactive Artifacts & Sandboxes**
   - **GeoCities Homestead Sandbox**: Complete with flaming banner, animated Under Construction stickman, odometer visitor counter, MIDI music player, and a working signed cyber guestbook!
   - **MySpace Profile Sandbox (2005)**: Glittering cursor trails, draggable "Top 8 Friends" hierarchy, mood cycle, and profile soundtrack.
   - **The 30-Year Browser Wars Arena**: Animated segmented market share comparison bar across 1995, 1998, 2003 (IE6 95% monopoly), 2007 (Firefox), 2012 (Chrome), and 2026.
   - **The Twitter Fail Whale Memorial**: Interactive 2008 downtime screen with 8-bit birds lifting the white whale, Ruby on Rails server jokes, and interactive "Try Again" retry physics.

5. **Device Friendly & SEO Optimized**
   - Fully responsive for mobile, tablet, laptop, and desktop.
   - Horizontal scrubbable and touch-swipe timeline with keyboard arrow shortcuts (`←` / `→`).
   - Deep linking support (`?era=...&exhibit=...`) with one-click clipboard share.
   - Complete OpenGraph (`og:*`) and Twitter Card (`twitter:*`) meta tags for rich social sharing.
   - CRT scanline & screen vignette overlay toggle.

---

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript, HTML5, CSS3
- **Build / Dev:** Vite 8, `@vitejs/plugin-react`
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), Custom CSS CRT Scanlines & Bevel Systems
- **Icons:** Lucide React
- **Audio:** Native Browser Web Audio API (Oscillators, GainNodes, BiquadFilters, AnalyserNode)
- **Effects:** Canvas Confetti
- **Code Hygiene:** Oxlint (0 errors, 0 warnings)
- **CI/CD:** GitHub Actions workflow deploying to GitHub Pages

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build

# Run linter
npm run lint
```

---

## 📜 License

Created with ❤️ by [@mnk17arts](https://github.com/mnk17arts) for the **Weird Web Projects** series. Open source under the MIT License.
