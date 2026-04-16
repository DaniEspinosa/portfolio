"use client";

import { useState, useEffect } from "react";
import { useIntro } from "@/context/IntroContext";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Skills", href: "#skills" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { introDone } = useIntro();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s, border-color 0.3s",
        background: scrolled ? "rgba(12,12,14,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          id="nav-logo"
          href="#inicio"
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            opacity: introDone ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          DE<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        <ul
          style={{
            display: "flex",
            gap: "clamp(16px, 4vw, 32px)",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-muted)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
