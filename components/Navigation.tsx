"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/context/IntroContext";
import { useTheme } from "@/context/ThemeContext";
import { useSound } from "@/context/SoundContext";
import confetti from "canvas-confetti";

const links = [
  { label: "Inicio",       href: "#inicio" },
  { label: "Skills",       href: "#skills" },
  { label: "Trayectoria",  href: "#experiencia" },
  { label: "Proyectos",    href: "#proyectos" },
  { label: "Contacto",     href: "#contacto" },
];

const iconBtn: React.CSSProperties = {
  background: "none",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "6px 8px",
  color: "var(--text-muted)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "border-color 0.2s, color 0.2s",
  cursor: "none",
};

export default function Navigation() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const { introDone }             = useIntro();
  const { theme, toggleTheme }    = useTheme();
  const { muted, toggleMute }     = useSound();
  const clickCount  = useRef(0);
  const clickTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      e.preventDefault();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      confetti({ particleCount: 120, spread: 80, origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }, colors: ["#6366f1", "#818cf8", "#a5b4fc", "#ffffff", "#f472b6"] });
    } else {
      clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 600);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "background 0.3s, border-color 0.3s",
        background: scrolled || menuOpen ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}>
        <nav style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a id="nav-logo" href="#inicio" onClick={handleLogoClick} style={{ fontWeight: 600, fontSize: "1rem", color: "var(--text)", textDecoration: "none", letterSpacing: "-0.02em", opacity: introDone ? 1 : 0, transition: "opacity 0.3s", cursor: "none" }}>
            DE<span style={{ color: "var(--accent)" }}>.</span>
          </a>

          {isMobile ? (
            /* — Hamburger — */
            <button onClick={() => setMenuOpen((o) => !o)} aria-label="Menú" style={{ background: "none", border: "none", padding: "8px", color: "var(--text)", display: "flex", flexDirection: "column", gap: "5px", cursor: "none" }}>
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} style={{ display: "block", width: "22px", height: "2px", background: "currentColor", borderRadius: "2px", transformOrigin: "center" }} />
              <motion.span animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} transition={{ duration: 0.2 }} style={{ display: "block", width: "22px", height: "2px", background: "currentColor", borderRadius: "2px" }} />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} style={{ display: "block", width: "22px", height: "2px", background: "currentColor", borderRadius: "2px", transformOrigin: "center" }} />
            </button>
          ) : (
            /* — Desktop nav — */
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              <ul style={{ display: "flex", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s", cursor: "none" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <button onClick={toggleMute} aria-label={muted ? "Activar sonido" : "Silenciar"} style={iconBtn}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                {muted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
                )}
              </button>

              <button onClick={toggleTheme} aria-label="Cambiar tema" style={iconBtn}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                {theme === "dark" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                )}
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* — Mobile menu overlay — */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "var(--menu-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
                style={{ fontSize: "clamp(1.75rem, 8vw, 2.5rem)", fontWeight: 700, color: "var(--text)", textDecoration: "none", letterSpacing: "-0.03em", padding: "8px 0", cursor: "none" }}
                whileHover={{ color: "var(--accent)", x: 6 }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Toggles en el menú móvil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35 }}
              style={{ display: "flex", gap: "12px", marginTop: "32px" }}
            >
              <button onClick={toggleMute} aria-label={muted ? "Activar sonido" : "Silenciar"} style={{ ...iconBtn, padding: "10px 12px" }}>
                {muted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
                )}
              </button>
              <button onClick={toggleTheme} aria-label="Cambiar tema" style={{ ...iconBtn, padding: "10px 12px" }}>
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
