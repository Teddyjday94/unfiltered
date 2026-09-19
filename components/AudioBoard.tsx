"use client";

import { useEffect, useRef, useState } from "react";

type EffectName = "Censor Beep" | "Airhorn" | "Applause" | "Crickets" | "Record Scratch";

function makeNoise(ctx: AudioContext, duration: number) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export default function AudioBoard() {
  const contextRef = useRef<AudioContext | null>(null);
  const [active, setActive] = useState<string>("");
  const [gain, setGain] = useState(64);
  const [tone, setTone] = useState(52);

  useEffect(() => () => { contextRef.current?.close(); }, []);

  const getContext = () => {
    if (!contextRef.current) contextRef.current = new AudioContext();
    return contextRef.current;
  };

  const play = async (name: EffectName) => {
    const ctx = getContext();
    if (ctx.state === "suspended") await ctx.resume();
    const master = ctx.createGain();
    master.gain.value = Math.max(0.02, gain / 100) * 0.2;
    master.connect(ctx.destination);
    const now = ctx.currentTime;
    setActive(name);
    window.setTimeout(() => setActive(""), 600);

    if (name === "Censor Beep") {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = 620 + tone * 6;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.8, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(g).connect(master); osc.start(now); osc.stop(now + 0.34);
    }

    if (name === "Airhorn") {
      [220, 277, 330].forEach((f, i) => {
        const osc = ctx.createOscillator(); const g = ctx.createGain();
        osc.type = "sawtooth"; osc.frequency.setValueAtTime(f, now); osc.frequency.linearRampToValueAtTime(f * 0.93, now + 0.5);
        g.gain.setValueAtTime(0.22, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.56);
        osc.connect(g).connect(master); osc.start(now + i * 0.015); osc.stop(now + 0.58);
      });
    }

    if (name === "Applause") {
      const src = ctx.createBufferSource(); src.buffer = makeNoise(ctx, 0.75);
      const filter = ctx.createBiquadFilter(); filter.type = "bandpass"; filter.frequency.value = 1200; filter.Q.value = 0.7;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.3, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      src.connect(filter).connect(g).connect(master); src.start(now);
    }

    if (name === "Crickets") {
      [0, 0.18, 0.36].forEach((offset) => {
        const osc = ctx.createOscillator(); const g = ctx.createGain();
        osc.type = "sine"; osc.frequency.value = 3900 + tone * 10;
        g.gain.setValueAtTime(0.001, now + offset); g.gain.linearRampToValueAtTime(0.16, now + offset + 0.025); g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.09);
        osc.connect(g).connect(master); osc.start(now + offset); osc.stop(now + offset + 0.11);
      });
    }

    if (name === "Record Scratch") {
      const src = ctx.createBufferSource(); src.buffer = makeNoise(ctx, 0.43); src.playbackRate.setValueAtTime(1.55, now); src.playbackRate.exponentialRampToValueAtTime(0.25, now + 0.4);
      const filter = ctx.createBiquadFilter(); filter.type = "highpass"; filter.frequency.value = 900;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.4, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      src.connect(filter).connect(g).connect(master); src.start(now);
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
