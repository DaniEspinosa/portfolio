"use client";

import { motion } from "framer-motion";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/DaniEspinosa",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-espinosa-mauri/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:daniespimau@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px clamp(20px, 5vw, 24px) 40px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--accent)",
              fontWeight: 500,
              marginBottom: "16px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Hola, soy
          </p>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: "16px",
            }}
          >
            Daniel Espinosa
          </h1>

          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              color: "var(--text-muted)",
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            Desarrollador Web
          </h2>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-muted)",
              maxWidth: "520px",
              lineHeight: 1.7,
              marginBottom: "48px",
            }}
          >
            Desarrollador web desde 2023, cuando terminé el grado superior de DAM/DAW.
            Me muevo principalmente en frontend con Angular y Next.js, aunque el backend
            no me da miedo. Ahora mismo trabajo como desarrollador Salesforce en Ayesa
            mientras sigo cogiendo proyectos por mi cuenta. Me adapto rápido a cualquier
            stack y disfruto construyendo cosas que funcionen bien y se vean bien.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href="#proyectos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--accent)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9375rem",
                fontWeight: 500,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Ver proyectos
            </a>

            <a
              href="#contacto"
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.9375rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              Contactar →
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "64px",
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.label}
              style={{
                color: "var(--text-muted)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
