"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useIntro } from "@/context/IntroContext";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Tamaño base del logo en el intro (rem). El navbar usa 1rem,
// así que el factor de escala final será 1/INTRO_REM.
const INTRO_REM = 10;

// Genera el text-shadow de extrusión 3D
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
  const [progress, setProgress] = useState(0);
  const [endOffset, setEndOffset] = useState({ x: 0, y: 0 });
  const [scrollDist, setScrollDist] = useState(1100);
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);
  const savedScrollRef = useRef(0);
  const hasFinished = useRef(false);

  useEffect(() => {
    // Evita que el navegador restaure el scroll al recargar
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });

    // Más distancia = animación más lenta
    const dist = Math.min(window.innerHeight * 1.6, 1100);
    setScrollDist(dist);

    // Medir la posición real del logo del navbar en vez de estimarla
    const navLogo = document.getElementById("nav-logo");
    if (navLogo) {
      const rect = navLogo.getBoundingClientRect();
      const navX = rect.left + rect.width / 2;
      const navY = rect.top + rect.height / 2;
      setEndOffset({
        x: navX - window.innerWidth / 2,
        y: navY - window.innerHeight / 2,
      });
    }
    setMounted(true);
  }, []);

  const finishIntro = () => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    flushSync(() => setGone(true));
    window.scrollTo({ top: Math.max(0, savedScrollRef.current - scrollDist), behavior: "instant" });
  };

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(window.scrollY / scrollDist, 1);
      setProgress(p);
      if (p >= 1 && !hasFinished.current) {
        setIntroDone(true);
        savedScrollRef.current = window.scrollY;
        setTimeout(finishIntro, 350);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDist, setIntroDone]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return <div style={{ height: `${scrollDist}px` }} />;
  if (gone) return null;

  const eased = easeOutCubic(progress);

  // Escala: empieza en 1 (= INTRO_REM tamaño), termina en 1/INTRO_REM (= 1rem, navbar)
  const scaleEnd = 1 / INTRO_REM;
  const scale = lerp(1, scaleEnd, eased);
  const x = endOffset.x * eased;
  const y = endOffset.y * eased;

  // Extrusión: 18px de profundidad → 0 conforme hace scroll
  const depth = Math.round(lerp(18, 0, eased));
  const extrusionAlpha = lerp(0.85, 0, eased);
  const textShadow = buildExtrusion(depth, extrusionAlpha);

  // Glow
  const glowOpacity = lerp(0.8, 0, eased);

  // Overlay fondo: se desvanece en el tramo final
  const overlayOpacity =
    progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.3);

  // Hint scroll
  const hintOpacity = Math.max(0, 1 - progress * 6);

  // Animación flotante sólo cuando el logo está quieto (progress < 0.02)
  const isFloating = progress < 0.02;

  return (
    <>
      {/* Spacer de scroll */}
      <div style={{ height: `${scrollDist}px`, pointerEvents: "none" }} />

      {/* Fondo del intro */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 80,
          background: "var(--background)",
          opacity: overlayOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Contenedor centrado */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 81,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Glow radial de fondo */}
        <div
          style={{
            position: "absolute",
            width: `${INTRO_REM * 2.4}rem`,
            height: `${INTRO_REM * 1.6}rem`,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.55) 0%, transparent 68%)",
            filter: "blur(48px)",
            opacity: glowOpacity,
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            willChange: "transform, opacity",
            animation: isFloating ? "float 3.5s ease-in-out infinite" : "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            transformOrigin: "center center",
            willChange: "transform",
            animation: isFloating ? "float 3.5s ease-in-out infinite" : "none",
          }}
        >
          <span
            style={{
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
            }}
          >
            DE<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: "52px",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: hintOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span>scroll</span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, var(--text-muted), transparent)",
              animation: "scrollPulse 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </>
  );
}
