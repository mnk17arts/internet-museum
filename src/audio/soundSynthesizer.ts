/**
 * 100% Procedural Web Audio API Synthesizer for Retro Cyberspace & Web Sounds
 * Zero external audio files required. Completely zero-latency and reliable.
 */

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  public analyser: AnalyserNode | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser autoplay policy
    this.isMuted = localStorage.getItem('museum_audio_muted') === 'true';
  }

  public init() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 128;

      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported in this browser', e);
    }
  }

  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;
    localStorage.setItem('museum_audio_muted', String(this.isMuted));

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Procedural 56k Dial-Up Modem Handshake Simulation (~5.5 seconds)
   * Recreates:
   * 1. Dial tone
   * 2. DTMF dialing tones
   * 3. Remote ring
   * 4. 2100Hz V.25 answer tone
   * 5. V.8 / V.34 baud rate negotiation & scrambler white-noise train
   * 6. Connection silence click
   */
  public playDialUp(): () => void {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return () => {};

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const soundNodes: (AudioNode & { stop?: (when?: number) => void })[] = [];

    // Helper to stop all if interrupted
    const stopAll = () => {
      soundNodes.forEach((node) => {
        try {
          if (node.stop) node.stop();
          node.disconnect();
        } catch {
          // ignore already stopped
        }
      });
    };

    // Phase 1: Dial tone (350Hz + 440Hz) for 0.6s
    const dt1 = ctx.createOscillator();
    const dt2 = ctx.createOscillator();
    const dtGain = ctx.createGain();

    dt1.frequency.value = 350;
    dt2.frequency.value = 440;
    dtGain.gain.setValueAtTime(0.12, now);
    dtGain.gain.setValueAtTime(0, now + 0.6);

    dt1.connect(dtGain);
    dt2.connect(dtGain);
    dtGain.connect(this.masterGain);

    dt1.start(now);
    dt2.start(now);
    dt1.stop(now + 0.6);
    dt2.stop(now + 0.6);
    soundNodes.push(dt1, dt2, dtGain);

    // Phase 2: DTMF Dialing (quick 5 burst tones) between 0.7s and 1.4s
    const dtmfPairs = [
      [697, 1209],
      [770, 1336],
      [852, 1477],
      [941, 1336],
      [697, 1477],
    ];

    dtmfPairs.forEach((pair, idx) => {
      const start = now + 0.7 + idx * 0.12;
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();

      o1.frequency.value = pair[0];
      o2.frequency.value = pair[1];
      g.gain.setValueAtTime(0.15, start);
      g.gain.setValueAtTime(0, start + 0.08);

      o1.connect(g);
      o2.connect(g);
      g.connect(this.masterGain!);

      o1.start(start);
      o2.start(start);
      o1.stop(start + 0.08);
      o2.stop(start + 0.08);
      soundNodes.push(o1, o2, g);
    });

    // Phase 3: 2100Hz V.25 Answer Tone at 1.8s for 0.9s
    const ansOsc = ctx.createOscillator();
    const ansGain = ctx.createGain();
    ansOsc.type = 'sine';
    ansOsc.frequency.setValueAtTime(2100, now + 1.8);
    ansGain.gain.setValueAtTime(0.18, now + 1.8);
    ansGain.gain.exponentialRampToValueAtTime(0.01, now + 2.7);

    ansOsc.connect(ansGain);
    ansGain.connect(this.masterGain);
    ansOsc.start(now + 1.8);
    ansOsc.stop(now + 2.7);
    soundNodes.push(ansOsc, ansGain);

    // Phase 4: Scrambler / Hiss noise & Baud frequency shift (2.8s to 5.2s)
    const bufferSize = ctx.sampleRate * 2.4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1200, now + 2.8);
    noiseFilter.frequency.exponentialRampToValueAtTime(2800, now + 4.2);
    noiseFilter.Q.setValueAtTime(3.0, now + 2.8);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now + 2.8);
    noiseGain.gain.linearRampToValueAtTime(0.24, now + 3.8);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 5.2);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    whiteNoise.start(now + 2.8);
    whiteNoise.stop(now + 5.2);
    soundNodes.push(whiteNoise, noiseGain);

    // Phase 5: High pitched handshake chirp tones (3.4s to 4.8s)
    const chirp = ctx.createOscillator();
    const chirpGain = ctx.createGain();
    chirp.type = 'sawtooth';
    chirp.frequency.setValueAtTime(980, now + 3.2);
    chirp.frequency.linearRampToValueAtTime(1800, now + 3.8);
    chirp.frequency.setValueAtTime(1400, now + 4.0);
    chirp.frequency.linearRampToValueAtTime(2400, now + 4.7);

    chirpGain.gain.setValueAtTime(0.08, now + 3.2);
    chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 4.8);

    chirp.connect(chirpGain);
    chirpGain.connect(this.masterGain);
    chirp.start(now + 3.2);
    chirp.stop(now + 4.8);
    soundNodes.push(chirp, chirpGain);

    return stopAll;
  }

  /**
   * MSN Messenger Nudge Sound (Dual buzz vibrato + chime)
   */
  public playMsnNudge() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Rapid buzz pulses
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + i * 0.08;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, start);
      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(start);
      osc.stop(start + 0.06);
    }

    // Finishing ding
    const ding = ctx.createOscillator();
    const dingGain = ctx.createGain();
    ding.type = 'sine';
    ding.frequency.setValueAtTime(1174.66, now + 0.35); // D6
    dingGain.gain.setValueAtTime(0.25, now + 0.35);
    dingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    ding.connect(dingGain);
    dingGain.connect(this.masterGain);
    ding.start(now + 0.35);
    ding.stop(now + 0.9);
  }

  /**
   * Classic ICQ "Uh-Oh!" voice synthesizer approximation
   */
  public playIcqUhOh() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // "Uh" syllable (low to mid rise)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(320, now);
    osc1.frequency.exponentialRampToValueAtTime(260, now + 0.12);

    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(now);
    osc1.stop(now + 0.14);

    // "Oh!" syllable (punchy pitch drop)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(540, now + 0.16);
    osc2.frequency.exponentialRampToValueAtTime(290, now + 0.42);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now + 0.16);
    filter.Q.value = 4.0;

    gain2.gain.setValueAtTime(0.32, now + 0.16);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc2.connect(filter);
    filter.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(now + 0.16);
    osc2.stop(now + 0.45);
  }

  /**
   * AOL "You've Got Mail" Tri-Tone Chime
   */
  public playAolMail() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // F4 -> A4 -> C5 chime
    const notes = [349.23, 440.0, 523.25, 698.46];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.14;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.22, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(start);
      osc.stop(start + 0.5);
    });
  }

  /**
   * Windows 95 Brian Eno Style Ambient Chord Cascade
   */
  public playWin95Startup() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Ambient shimmering chords: Db, Ab, Eb, Gb ethereal pads
    const chords = [
      { freqs: [138.59, 207.65, 277.18, 311.13], start: 0, dur: 3.2 },
      { freqs: [207.65, 277.18, 369.99, 415.3], start: 0.8, dur: 3.0 },
      { freqs: [415.3, 554.37, 622.25, 830.61], start: 1.6, dur: 2.8 },
    ];

    chords.forEach((chord) => {
      chord.freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + chord.start;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.06, startTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + chord.dur);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(startTime);
        osc.stop(startTime + chord.dur);
      });
    });
  }

  /**
   * Mechanical Keyboard Clack
   */
  public playKeyClick() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  /**
   * CRT Monitor Degauss "THWUMP" & 15kHz flyback hum
   */
  public playCrtDeGauss() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Heavy degauss coil thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.4);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.6);

    // High pitch 15kHz flyback transformer hum
    const flyback = ctx.createOscillator();
    const flyGain = ctx.createGain();
    flyback.type = 'triangle';
    flyback.frequency.setValueAtTime(14500, now);
    flyGain.gain.setValueAtTime(0.015, now);
    flyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    flyback.connect(flyGain);
    flyGain.connect(this.masterGain);
    flyback.start(now);
    flyback.stop(now + 0.8);
  }

  /**
   * Retro PC Speaker 8-bit Beep
   */
  public playErrorBeep() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(750, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.setValueAtTime(0, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.12);
  }
}

export const retroAudio = new RetroAudioEngine();
