"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const hovering = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.4 });
  const ringScale = useSpring(hovering, { stiffness: 200, damping: 20 });
  const ringSize = useTransform(ringScale, [0, 1], [32, 52]);
  const ringOpacity = useTransform(ringScale, [0, 1], [0.35, 0.6]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const enter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) hovering.set(1);
    };
    const leave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) hovering.set(0);
    };
    globalThis.addEventListener("mousemove", move);
    globalThis.addEventListener("mouseover", enter);
    globalThis.addEventListener("mouseout", leave);
    return () => {
      globalThis.removeEventListener("mousemove", move);
      globalThis.removeEventListener("mouseover", enter);
      globalThis.removeEventListener("mouseout", leave);
    };
  }, [mouseX, mouseY, hovering]);

  return (
    <>
      {/* Punto exacto */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 9999,
          translateX: "-50%",
          translateY: "-50%",
          x: mouseX,
          y: mouseY,
        }}
      />
      {/* Anillo con lag */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          opacity: ringOpacity,
          pointerEvents: "none",
          zIndex: 9999,
          translateX: "-50%",
          translateY: "-50%",
          x: springX,
          y: springY,
        }}
      />
    </>
  );
}
