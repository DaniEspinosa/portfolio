"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = () => window.innerWidth < 768;

    const onScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight) || 0;
      const mobile = isMobile();

      const moveX1 = mobile ? 30 : 80;
      const moveX2 = mobile ? 40 : 100;
      const scrollFactor1 = mobile ? 0.15 : 0.3;
      const scrollFactor2 = mobile ? 0.1 : 0.2;
      const scrollFactor3 = mobile ? 0.08 : 0.15;

      if (blob1.current) {
        blob1.current.style.transform = `translateY(${window.scrollY * scrollFactor1}px) translateX(${Math.sin(progress * Math.PI) * moveX1}px)`;
        blob1.current.style.opacity = String(0.7 - progress * 0.3);
      }
      if (blob2.current) {
        blob2.current.style.transform = `translateY(${window.scrollY * -scrollFactor2}px) translateX(${Math.cos(progress * Math.PI) * moveX2}px)`;
        blob2.current.style.opacity = String(0.3 + progress * 0.4);
      }
      if (blob3.current) {
        blob3.current.style.transform = `translateY(${window.scrollY * scrollFactor3}px)`;
        blob3.current.style.opacity = String(0.2 + progress * 0.5);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Wrapper que reduce la intensidad en modo claro */}
      <div style={{ opacity: "var(--blob-opacity, 1)" as unknown as number, width: "100%", height: "100%" }}>
        {/* Blob indigo — arriba izquierda */}
        <div
          ref={blob1}
          style={{
            position: "absolute",
            top: "-20%",
            left: "-15%",
            width: "clamp(360px, 70vw, 800px)",
            height: "clamp(360px, 70vw, 800px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.65) 0%, transparent 65%)",
            filter: "blur(clamp(30px, 5vw, 60px))",
            opacity: 0.7,
            transition: "opacity 0.6s",
            willChange: "transform, opacity",
          }}
        />

        {/* Blob violeta — derecha centro */}
        <div
          ref={blob2}
          style={{
            position: "absolute",
            top: "30%",
            right: "-15%",
            width: "clamp(280px, 60vw, 700px)",
            height: "clamp(280px, 60vw, 700px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.58) 0%, transparent 65%)",
            filter: "blur(clamp(30px, 5vw, 60px))",
            opacity: 0.5,
            transition: "opacity 0.6s",
            willChange: "transform, opacity",
          }}
        />

        {/* Blob azul — abajo centro */}
        <div
          ref={blob3}
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "10%",
            width: "clamp(300px, 75vw, 900px)",
            height: "clamp(200px, 40vw, 500px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.52) 0%, transparent 65%)",
            filter: "blur(clamp(35px, 6vw, 70px))",
            opacity: 0.4,
            transition: "opacity 0.6s",
            willChange: "transform, opacity",
          }}
        />
      </div>
    </div>
  );
}
