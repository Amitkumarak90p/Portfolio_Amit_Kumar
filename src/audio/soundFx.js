/**
 * Web Audio API Sound Synthesizer for Developer Portfolio
 * Generates clean UI feedback tones without external audio file dependencies.
 */

class SoundFx {
  constructor() {
    this.audioCtx = null;
    this.enabled = false;
    this.masterGain = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.beep(880, 'sine', 0.08);
    }
    return this.enabled;
  }

  beep(freq = 600, type = 'sine', duration = 0.06) {
    if (!this.enabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  click() {
    this.beep(1200, 'triangle', 0.04);
  }

  hover() {
    this.beep(800, 'sine', 0.03);
  }

  surge() {
    if (!this.enabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.audioCtx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.14, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  glitch() {
    this.beep(400, 'square', 0.08);
  }

  targetLock() {
    this.beep(1600, 'triangle', 0.06);
  }

  success() {
    if (!this.enabled || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.12, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * 0.07);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.07);
        osc.stop(now + (idx + 1) * 0.07);
      });
    } catch (e) {}
  }

  // Aliases for compatibility
  playClick() { this.click(); }
  playHover() { this.hover(); }
  playSurge() { this.surge(); }
  playChirp(freq, dur, type) { this.beep(freq, type, dur); }
  playTransmission() { this.success(); }
}

export const sound = new SoundFx();
