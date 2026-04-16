"use client";

import { createContext, useContext, useCallback, useRef, useEffect, useState } from "react";

type SoundVariant = { freq: number; endFreq: number; type: OscillatorType; duration: number; gain: number };

const variants: SoundVariant[] = [
  { freq: 700, endFreq: 350, type: "sine",     duration: 0.12, gain: 0.055 },
  { freq: 900, endFreq: 500, type: "sine",     duration: 0.09, gain: 0.045 },
  { freq: 500, endFreq: 280, type: "triangle", duration: 0.14, gain: 0.06  },
  { freq: 1100,endFreq: 600, type: "sine",     duration: 0.08, gain: 0.04  },
  { freq: 600, endFreq: 400, type: "triangle", duration: 0.11, gain: 0.05  },
];

const SoundContext = createContext<{
  muted: boolean;
  toggleMute: () => void;
}>({ muted: false, toggleMute: () => {} });

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sound-muted");
    if (saved !== null) {
      const val = saved === "true";
      setMuted(val);
      mutedRef.current = val;
    }
  }, []);

  const getCtx = useCallback(() => {
    if (!audioCtx.current) audioCtx.current = new AudioContext();
    return audioCtx.current;
  }, []);

  const playSound = useCallback(async () => {
    if (mutedRef.current) return;
    try {
      const ctx = getCtx();
      if (ctx.state === "suspended") await ctx.resume();
      const v = variants[Math.floor(Math.random() * variants.length)];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = v.type;
      osc.frequency.setValueAtTime(v.freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(v.endFreq, ctx.currentTime + v.duration);
      gain.gain.setValueAtTime(v.gain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + v.duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + v.duration);
    } catch { /* ignore */ }
  }, [getCtx]);

  // Global click listener
  useEffect(() => {
    const handler = () => playSound();
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [playSound]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      mutedRef.current = !m;
      localStorage.setItem("sound-muted", String(!m));
      return !m;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ muted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
