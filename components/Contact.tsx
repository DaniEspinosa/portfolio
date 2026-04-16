"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");
  const isMobile = useIsMobile();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "var(--text)",
    fontSize: "0.9375rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "var(--font-geist-sans)",
  };

  return (
    <section
      id="contacto"
      style={{
        padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 24px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "48px" : "80px",
          alignItems: "start",
        }}
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--accent)",
              fontWeight: 500,
              marginBottom: "12px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Contacto
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: "20px",
            }}
          >
            Hablemos
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            ¿Tienes un proyecto en mente o simplemente quieres ponerte en
            contacto? Escríbeme y te respondo lo antes posible.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <a
              href="mailto:daniespimau@gmail.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.9375rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              daniespimau@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-espinosa-mauri/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.9375rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {status === "success" ? (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "48px 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(99,102,241,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "var(--accent)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ color: "var(--text)", fontWeight: 600, marginBottom: "8px" }}>
                Mensaje enviado
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}>
                Gracias por escribir. Te respondo pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    marginBottom: "8px",
                  }}
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Cuéntame sobre tu proyecto..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              {status === "error" && (
                <p style={{ fontSize: "0.875rem", color: "#f87171" }}>
                  Algo salió mal. Inténtalo de nuevo o escríbeme directamente por email.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  background: "var(--accent)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "13px 24px",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  opacity: status === "loading" ? 0.7 : 1,
                  transition: "opacity 0.2s",
                  fontFamily: "var(--font-geist-sans)",
                }}
                onMouseEnter={(e) => {
                  if (status !== "loading")
                    (e.currentTarget as HTMLElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  if (status !== "loading")
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
