"use client";

import { useEffect, useRef, useState } from "react";

type EffectName = "Censor Beep" | "Airhorn" | "Applause" | "Crickets" | "Record Scratch";

const TAU = Math.PI * 2;

// How long each effect rings, used to light the pad while it plays.
const DURATIONS: Record<EffectName, number> = {
  "Censor Beep": 750,
  Airhorn: 1650,
  Applause: 3600,
  Crickets: 3400,
  "Record Scratch": 850,
};

// RBJ biquad bandpass (constant 0 dB peak gain), for filtering inside offline renders.
function bandpass(sampleRate: number, freq: number, q: number) {
  const w = (TAU * freq) / sampleRate;
  const alpha = Math.sin(w) / (2 * q);
  const a0 = 1 + alpha;
  return { b0: alpha / a0, b2: -alpha / a0, a1: (-2 * Math.cos(w)) / a0, a2: (1 - alpha) / a0 };
}

// Deterministic noise keyed by sample index, so scratched audio replays the same grooves.
function hashNoise(n: number) {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return ((x >>> 0) / 4294967295) * 2 - 1;
}

function normalize(buffer: AudioBuffer, peak: number) {
  let max = 0;
  for (let c = 0; c < buffer.numberOfChannels; c += 1) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < data.length; i += 1) max = Math.max(max, Math.abs(data[i]));
  }
  if (max === 0) return buffer;
  const scale = peak / max;
  for (let c = 0; c < buffer.numberOfChannels; c += 1) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < data.length; i += 1) data[i] *= scale;
  }
  return buffer;
}

function makeImpulse(ctx: BaseAudioContext, seconds: number, decay: number) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c += 1) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < len; i += 1) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buffer;
}

// A crowd: dozens of individual hand claps, each a short filtered noise burst with its own
// pitch, rhythm, loudness and stereo position. Swells in, holds, then people drop out.
function renderApplause(ctx: BaseAudioContext) {
  const sr = ctx.sampleRate;
  const dur = 3.6;
  const len = Math.floor(sr * dur);
  const buffer = ctx.createBuffer(2, len, sr);
  const L = buffer.getChannelData(0);
  const R = buffer.getChannelData(1);
  const clapLen = Math.floor(sr * 0.04);

  for (let p = 0; p < 46; p += 1) {
    const rate = 3.6 + Math.random() * 2.8;
    const pan = Math.random();
    const gl = Math.cos((pan * Math.PI) / 2);
    const gr = Math.sin((pan * Math.PI) / 2);
    const center = 700 + Math.random() * 1900;
    const q = 0.9 + Math.random() * 1.6;
    const loud = 0.35 + Math.random() * 0.65;
    const stop = dur - 1.3 + Math.random() * 1.0;
    let t = Math.random() * 0.3;

    while (t < stop) {
      const swell = Math.min(1, t / 0.45);
      const fade = Math.min(1, (stop - t) / 0.5);
      const amp = loud * swell * (0.5 + 0.5 * fade) * (0.65 + Math.random() * 0.35);
      const c = bandpass(sr, center * (0.88 + Math.random() * 0.24), q);
      const decay = sr * (0.0035 + Math.random() * 0.006);
      const s0 = Math.floor(t * sr);
      let x1 = 0; let x2 = 0; let y1 = 0; let y2 = 0;
      for (let i = 0; i < clapLen && s0 + i < len; i += 1) {
        const x = (Math.random() * 2 - 1) * Math.exp(-i / decay);
        const y = c.b0 * x + c.b2 * x2 - c.a1 * y1 - c.a2 * y2;
        x2 = x1; x1 = x; y2 = y1; y1 = y;
        L[s0 + i] += y * amp * gl;
        R[s0 + i] += y * amp * gr;
      }
      t += (1 / rate) * (0.85 + Math.random() * 0.3);
    }
  }
  return normalize(buffer, 0.9);
}

// Awkward-silence crickets: a few insects at different distances, each chirp a train of
// 3-4 rapid ~4.5 kHz pulses, over a faint night-air bed.
function renderCrickets(ctx: BaseAudioContext, pitch: number) {
  const sr = ctx.sampleRate;
  const dur = 3.4;
  const len = Math.floor(sr * dur);
  const buffer = ctx.createBuffer(2, len, sr);
  const L = buffer.getChannelData(0);
  const R = buffer.getChannelData(1);

  const crickets = [
    { freq: 4650, pan: 0.3, period: 0.62, pulses: 4, gain: 0.55, offset: 0.12 },
    { freq: 4380, pan: 0.78, period: 0.81, pulses: 3, gain: 0.32, offset: 0.41 },
    { freq: 4920, pan: 0.52, period: 0.71, pulses: 3, gain: 0.16, offset: 0.27 },
  ];

  crickets.forEach((cr) => {
    const gl = Math.cos((cr.pan * Math.PI) / 2);
    const gr = Math.sin((cr.pan * Math.PI) / 2);
    const freq = cr.freq * pitch;
    const pulseLen = Math.floor(sr * 0.017);
    for (let t = cr.offset; t < dur - 0.3; t += cr.period * (0.94 + Math.random() * 0.12)) {
      for (let k = 0; k < cr.pulses; k += 1) {
        const s0 = Math.floor((t + k * 0.027) * sr);
        const amp = cr.gain * (k === 0 ? 0.75 : 1);
        let phase = 0;
        for (let i = 0; i < pulseLen && s0 + i < len; i += 1) {
          const env = Math.sin((Math.PI * i) / pulseLen) ** 2;
          phase += (TAU * freq * (1 - 0.025 * (i / pulseLen))) / sr;
          const y = (Math.sin(phase) + 0.18 * Math.sin(2 * phase)) * env * amp;
          L[s0 + i] += y * gl;
          R[s0 + i] += y * gr;
        }
      }
    }
  });

  // Very quiet, dark ambience so the gaps read as "silence" rather than digital zero.
  let lpL = 0; let lpR = 0;
  for (let i = 0; i < len; i += 1) {
    const edge = Math.min(1, i / (sr * 0.4), (len - i) / (sr * 0.5));
    lpL += 0.02 * ((Math.random() * 2 - 1) - lpL);
    lpR += 0.02 * ((Math.random() * 2 - 1) - lpR);
    L[i] += lpL * 0.09 * edge;
    R[i] += lpR * 0.09 * edge;
  }
  return normalize(buffer, 0.8);
}

// A short groove (kick, snare, hats, bass, chord) addressed by playhead position, so a
// virtual turntable can drag the needle back and forth through it.
function grooveAt(pos: number, sr: number) {
  const wrap = (v: number, m: number) => ((v % m) + m) % m;
  const saw = (f: number, n: number) => {
    let s = 0;
    for (let k = 1; k <= n; k += 1) s += Math.sin(TAU * f * k * pos) / k;
    return s * 0.6;
  };
  const noise = hashNoise(Math.floor(pos * sr));
  const kt = wrap(pos, 0.5);
  const kick = Math.sin(TAU * (48 * kt + 2.2 * (1 - Math.exp(-kt * 38)))) * Math.exp(-kt * 9);
  const st = wrap(pos - 0.5, 1);
  const snare = (noise * 0.6 + Math.sin(TAU * 185 * st) * 0.4) * Math.exp(-st * 16);
  const ht = wrap(pos - 0.25, 0.5);
  const hat = noise * Math.exp(-ht * 55);
  const bass = saw(110, 8);
  const chord = saw(220, 8) + saw(277.18, 8) + saw(329.63, 8);
  return kick * 0.55 + snare * 0.35 + hat * 0.12 + bass * 0.22 + chord * 0.08;
}

// The freeze-frame "wrrr-WIK" scratch: music plays, a hand yanks the record backward,
// shoves it forward, and it grinds to a stop. Pitch follows platter speed, and stylus
// friction noise rises with how hard the vinyl is moving.
function renderScratch(ctx: BaseAudioContext) {
  const sr = ctx.sampleRate;
  const dur = 0.85;
  const len = Math.floor(sr * dur);
  const buffer = ctx.createBuffer(1, len, sr);
  const out = buffer.getChannelData(0);

  // [time, platter speed] keyframes; 1 = normal play, negative = backward.
  const keys: [number, number][] = [[0, 1], [0.3, 1], [0.41, -3.2], [0.48, 3.7], [0.6, 0.25], [0.65, 0], [dur, 0]];
  const speedAt = (t: number) => {
    for (let k = 0; k < keys.length - 1; k += 1) {
      const [t0, v0] = keys[k];
      const [t1, v1] = keys[k + 1];
      if (t <= t1) {
        const x = (t - t0) / (t1 - t0);
        return v0 + (v1 - v0) * (0.5 - 0.5 * Math.cos(Math.PI * x));
      }
    }
    return 0;
  };

  let pos = 1.0;
  let x1 = 0; let x2 = 0; let y1 = 0; let y2 = 0;
  let coeffs = bandpass(sr, 800, 2);
  let dcIn = 0; let dcOut = 0;
  for (let i = 0; i < len; i += 1) {
    const t = i / sr;
    const v = speedAt(t);
    pos += v / sr;
    const motion = Math.min(1, Math.abs(v) * 5);
    let y = grooveAt(pos, sr) * motion;

    if (i % 32 === 0) coeffs = bandpass(sr, 500 + Math.abs(v) * 1100, 1.8);
    const n = Math.random() * 2 - 1;
    const f = coeffs.b0 * n + coeffs.b2 * x2 - coeffs.a1 * y1 - coeffs.a2 * y2;
    x2 = x1; x1 = n; y2 = y1; y1 = f;
    const scratching = t > 0.3 && t < 0.66 ? 1 : 0.08;
    y += f * Math.min(1, Math.abs(v) / 2.5) * 0.9 * scratching;
    if (Math.random() < 0.0009) y += (Math.random() - 0.5) * 0.4 * motion; // vinyl crackle

    // DC blocker so a stopped platter is silent, not a frozen offset.
    dcOut = y - dcIn + 0.995 * dcOut;
    dcIn = y;
    out[i] = dcOut;
  }
  return normalize(buffer, 0.9);
}

export default function AudioBoard() {
  const contextRef = useRef<AudioContext | null>(null);
  const busRef = useRef<{ input: GainNode; reverb: GainNode } | null>(null);
  const timerRef = useRef<number>(0);
  const [active, setActive] = useState<string>("");
  const [gain, setGain] = useState(64);
  const [tone, setTone] = useState(52);

  useEffect(() => () => { window.clearTimeout(timerRef.current); contextRef.current?.close(); }, []);

  const getContext = () => {
    if (!contextRef.current) contextRef.current = new AudioContext();
    return contextRef.current;
  };

  // Shared output: limiter to keep loud effects clean, plus a room reverb send.
  const getBus = (ctx: AudioContext) => {
    if (busRef.current) return busRef.current;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -3; limiter.knee.value = 4; limiter.ratio.value = 12;
    limiter.attack.value = 0.003; limiter.release.value = 0.15;
    limiter.connect(ctx.destination);
    const input = ctx.createGain();
    input.connect(limiter);
    const convolver = ctx.createConvolver();
    convolver.buffer = makeImpulse(ctx, 1.8, 3);
    const reverb = ctx.createGain();
    reverb.connect(convolver).connect(limiter);
    busRef.current = { input, reverb };
    return busRef.current;
  };

  const playBuffer = (ctx: AudioContext, buffer: AudioBuffer, dry: AudioNode, wet: AudioNode | null, when: number) => {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(dry);
    if (wet) src.connect(wet);
    src.start(when);
  };

  const play = async (name: EffectName) => {
    const ctx = getContext();
    if (ctx.state === "suspended") await ctx.resume();
    const bus = getBus(ctx);
    const now = ctx.currentTime + 0.01;
    // TONE nudges pitch (±~1 semitone range across the slider) and tilts brightness.
    const pitch = 2 ** ((tone - 50) / 600);

    const master = ctx.createGain();
    master.gain.value = Math.max(0.02, gain / 100) * 0.9;
    const shelf = ctx.createBiquadFilter();
    shelf.type = "highshelf"; shelf.frequency.value = 2500; shelf.gain.value = ((tone - 50) / 50) * 8;
    master.connect(shelf).connect(bus.input);
    const send = (amount: number) => {
      const g = ctx.createGain(); g.gain.value = amount;
      shelf.connect(g).connect(bus.reverb);
    };

    setActive(name);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setActive(""), DURATIONS[name]);

    if (name === "Censor Beep") {
      // Broadcast bleep: a steady 1 kHz sine, hard on, hard off.
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 1000 * 2 ** ((tone - 50) / 150);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.55, now + 0.004);
      g.gain.setValueAtTime(0.55, now + 0.72);
      g.gain.linearRampToValueAtTime(0, now + 0.726);
      osc.connect(g).connect(master);
      osc.start(now); osc.stop(now + 0.75);
    }

    if (name === "Airhorn") {
      // Stadium air horn: two buzzy reeds a major third apart, hard overdriven, with the
      // classic BWAP-BWAP-BWAAAAP pattern. Each blast scoops up in pitch as pressure builds.
      send(0.3);
      const env = ctx.createGain();
      env.gain.value = 0;
      const shaper = ctx.createWaveShaper();
      const curve = new Float32Array(1024);
      for (let i = 0; i < curve.length; i += 1) curve[i] = Math.tanh(((i / 511.5) - 1) * 4.5);
      shaper.curve = curve;
      const honk = ctx.createBiquadFilter();
      honk.type = "peaking"; honk.frequency.value = 2200; honk.Q.value = 1.2; honk.gain.value = 7;
      const body = ctx.createBiquadFilter();
      body.type = "peaking"; body.frequency.value = 900; body.Q.value = 0.9; body.gain.value = 4;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass"; lp.frequency.value = 7500;
      const level = ctx.createGain();
      level.gain.value = 0.75;
      env.connect(shaper).connect(body).connect(honk).connect(lp).connect(level).connect(master);

      const blasts: [number, number][] = [[0, 0.17], [0.25, 0.17], [0.5, 1.1]];
      const end = now + 1.65;
      const flutter = ctx.createOscillator();
      flutter.frequency.value = 31;
      flutter.start(now); flutter.stop(end);

      [370, 466].forEach((base) => {
        [-6, 6].forEach((cents) => {
          const f = base * pitch * 2 ** (cents / 1200);
          const osc = ctx.createOscillator();
          osc.type = "sawtooth";
          const vg = ctx.createGain();
          vg.gain.value = 0.45;
          const depth = ctx.createGain();
          depth.gain.value = f * 0.004;
          flutter.connect(depth).connect(osc.frequency);
          osc.frequency.setValueAtTime(f, now);
          blasts.forEach(([start, length]) => {
            const s = now + start;
            const e = s + length;
            osc.frequency.setValueAtTime(f * 0.92, s);
            osc.frequency.exponentialRampToValueAtTime(f, s + 0.05);
            osc.frequency.setValueAtTime(f, e - 0.04);
            osc.frequency.exponentialRampToValueAtTime(f * 0.95, e);
          });
          osc.connect(vg).connect(env);
          osc.start(now); osc.stop(end);
        });
      });

      blasts.forEach(([start, length]) => {
        const s = now + start;
        const e = s + length;
        env.gain.setValueAtTime(0, s);
        env.gain.linearRampToValueAtTime(1, s + 0.02);
        env.gain.setValueAtTime(1, e - 0.035);
        env.gain.linearRampToValueAtTime(0, e);
      });
    }

    if (name === "Applause") {
      send(0.45);
      playBuffer(ctx, renderApplause(ctx), master, null, now);
    }

    if (name === "Crickets") {
      send(0.25);
      const g = ctx.createGain();
      g.gain.value = 0.6;
      g.connect(master);
      playBuffer(ctx, renderCrickets(ctx, pitch), g, null, now);
    }

    if (name === "Record Scratch") {
      send(0.12);
      playBuffer(ctx, renderScratch(ctx), master, null, now);
    }
  };

  const effects: EffectName[] = ["Censor Beep", "Airhorn", "Applause", "Crickets", "Record Scratch"];

  return (
    <section className="soundboard section-shell" id="board">
      <div className="section-kicker">STUDIO BOARD</div>
      <div className="board-layout">
        <div>
          <h2>Push buttons.<br />Make noise.</h2>
          <p className="board-copy">A fan-made mixer with original browser-generated effects. No podcast clips are stored or reproduced.</p>
          <div className="pad-grid">
            {effects.map((effect, i) => (
              <button type="button" key={effect} className={`sound-pad pad-${i + 1} ${active === effect ? "is-active" : ""}`} onClick={() => play(effect)}>
                <span>CH {String(i + 1).padStart(2, "0")}</span><strong>{effect}</strong>
              </button>
            ))}
          </div>
        </div>
        <div className="mixer-panel" aria-label="Mixer controls">
          <div className="vu-labels"><span>L</span><span>VU</span><span>R</span></div>
          <div className="vu-row">
            <div className="vu-meter"><i style={{ width: `${28 + gain * 0.6}%` }} /></div>
            <div className="vu-meter"><i style={{ width: `${18 + tone * 0.68}%` }} /></div>
          </div>
          <label className="fader"><span>OUTPUT</span><input type="range" min="5" max="100" value={gain} onChange={(e) => setGain(Number(e.target.value))} /><b>{gain}</b></label>
          <label className="fader"><span>TONE</span><input type="range" min="0" max="100" value={tone} onChange={(e) => setTone(Number(e.target.value))} /><b>{tone}</b></label>
          <div className="knobs">
            <div className="knob" style={{ transform: `rotate(${-120 + gain * 2.4}deg)` }}><i /></div>
            <div className="knob" style={{ transform: `rotate(${-120 + tone * 2.4}deg)` }}><i /></div>
          </div>
          <div className="mixer-note">BROWSER AUDIO / FAN FX</div>
        </div>
      </div>
    </section>
  );
}
