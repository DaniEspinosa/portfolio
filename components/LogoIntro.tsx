"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const INTRO_REM = 10;

function buildExtrusion(depth: number, alpha: number): string {
  if (depth === 0) return "none";
  const layers: string[] = [];
  for (let i = 1; i <= depth; i++) {
    const a = alpha * (1 - i / (depth + 1));
    layers.push(`${i}px ${i}px 0 rgba(45, 38, 145, ${a.toFixed(2)})`);
  }
  layers.push(`${depth + 2}px ${depth + 2}px ${depth * 4}px rgba(0,0,0,0.55)`);
  return layers.join(", ");
}

export default function LogoIntro() {
  const { setIntroDone } = useIntro();

  // Preloader
  const [loadPct, setLoadPct] = useState(0);
  const [phase, setPhase] = useState<"loading" | "intro">("loading");

  // Intro
  const [progress, setProgress] = useState(0);
  const [endOffset, setEndOffset] = useState({ x: 0, y: 0 });
  const [scrollDist, setScrollDist] = useState(1100);
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const savedScrollRef = useRef(0);
  const hasFinished = useRef(false);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });

    const dist = Math.min(window.innerHeight * 1.6, 1100);
    setScrollDist(dist);

    const navLogo = document.getElementById("nav-logo");
    if (navLogo) {
      const rect = navLogo.getBoundingClientRect();
      setEndOffset({
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
      });
    }

    // Preloader counter
    let current = 0;
    const duration = 1400;
    const intervalMs = 16;
    const step = 100 / (duration / intervalMs);
    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        setLoadPct(100);
        clearInterval(timer);
        setTimeout(() => {
          setPhase("intro");
          setMounted(true);
        }, 350);
      } else {
        setLoadPct(Math.floor(current));
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  const finishIntro = () => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    setIntroDone(true);
    flushSync(() => setGone(true));
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    if (phase !== "intro") return;
    const onScroll = () => {
      const p = Math.min(window.scrollY / scrollDist, 1);
      setProgress(p);
      if (p >= 1 && !hasFinished.current) {
        savedScrollRef.current = window.scrollY;
        setFinishing(true);        // overlay fade-in empieza (0.18s)
        setTimeout(finishIntro, 200); // espera a que cubra
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase, scrollDist, setIntroDone]); // eslint-disable-line react-hooks/exhaustive-deps

  // — Preloader —
  if (phase === "loading") {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "var(--background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}>
        <span style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          letterSpacing: "0.12em",
          minWidth: "3ch",
          textAlign: "right",
        }}>
          {String(loadPct).padStart(3, "0")}
        </span>
        <div style={{
          width: "140px",
          height: "1px",
          background: "var(--border)",
          borderRadius: "1px",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${loadPct}%`,
            background: "var(--accent)",
            transition: "width 0.05s linear",
          }} />
        </div>
      </div>
    );
  }

  // — Intro —
  if (!mounted) return <div style={{ height: `${scrollDist}px` }} />;
  if (gone) return null;

  const eased = easeOutCubic(progress);
  const scaleEnd = 1 / INTRO_REM;
  const scale = lerp(1, scaleEnd, eased);
  const x = endOffset.x * eased;
  const y = endOffset.y * eased;
  const depth = Math.round(lerp(18, 0, eased));
  const extrusionAlpha = lerp(0.85, 0, eased);
  const textShadow = buildExtrusion(depth, extrusionAlpha);
  const glowOpacity = lerp(0.8, 0, eased);
  const overlayOpacity = finishing ? 1 : (progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.3));
  const hintOpacity = Math.max(0, 1 - progress * 6);
  const isFloating = progress < 0.02;

  return (
    <>
      <div style={{ height: `${scrollDist}px`, pointerEvents: "none" }} />

      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "var(--background)",
        opacity: overlayOpacity,
        transition: finishing ? "opacity 0.18s ease" : "none",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 81,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute",
          width: `${INTRO_REM * 2.4}rem`,
          height: `${INTRO_REM * 1.6}rem`,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.55) 0%, transparent 68%)",
          filter: "blur(48px)",
          opacity: glowOpacity,
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          willChange: "transform, opacity",
          animation: isFloating ? "float 3.5s ease-in-out infinite" : "none",
        }} />

        <div
          onClick={() => progress < 0.05 && window.scrollTo({ top: scrollDist, behavior: "smooth" })}
          style={{
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            transformOrigin: "center center",
            willChange: "transform",
            animation: isFloating ? "float 3.5s ease-in-out infinite" : "none",
            cursor: progress < 0.05 ? "pointer" : "default",
            pointerEvents: "auto",
          }}
        >
          <span style={{
            display: "block",
            fontWeight: 800,
            fontSize: `${INTRO_REM}rem`,
            lineHeight: 1,
            color: "var(--text)",
            letterSpacing: "-0.04em",
            fontFamily: "var(--font-geist-sans)",
            textShadow,
            animation: mounted && progress === 0
              ? "fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) both"
              : "none",
          }}>
            DE<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </div>

        {/* Glow inferior */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "480px",
          height: "180px",
          background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.28) 0%, rgba(99,102,241,0.08) 45%, transparent 70%)",
          opacity: hintOpacity,
          pointerEvents: "none",
        }} />

        {/* Scroll hint — chevrons */}
        <motion.div style={{
          position: "absolute",
          bottom: "52px",
          left: "50%",
          x: "-50%",
          opacity: hintOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}>
          {[0, 1, 2].map((i) => (
            <motion.svg
              key={i}
              width="26"
              height="16"
              viewBox="0 0 26 16"
              fill="none"
              animate={{ opacity: [0.15, 0.9, 0.15], y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
            >
              <polyline points="1,1 13,14 25,1" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ))}
        </motion.div>
      </div>
    </>
  );
}
