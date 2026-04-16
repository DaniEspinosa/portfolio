"use client";

import { motion } from "framer-motion";

type Item = {
  period: string;
  role: string;
  company: string;
  description: string;
  tags?: string[];
};

const experience: Item[] = [
  {
    period: "Sep 2025 — Actualmente",
    role: "Desarrollador Lightning Salesforce",
    company: "Ayesa",
    description:
      "Desarrollo y mantenimiento de soluciones Salesforce para Heineken Portugal (Novadis). Lógica de negocio en Apex, LWC, Visualforce e integración con APIs externas.",
    tags: ["Salesforce", "Apex", "LWC", "Visualforce"],
  },
  {
    period: "Mar 2023 — Nov 2024",
    role: "Desarrollador FullStack",
    company: "Atos – Eviden",
    description:
      "Desarrollo y mantenimiento de aplicaciones con Java Spring Boot y Angular. Implementación de soluciones de IA, refactorización de código legacy y desarrollo de microservicios con integración de APIs.",
    tags: ["Angular", "Java", "Spring Boot", "Microservicios"],
  },
];

const education: Item[] = [
  {
    period: "Sep 2021 — Jun 2023",
    role: "Ciclo Superior — DAM / DAW",
    company: "CESUR, Sevilla",
    description:
      "Desarrollo de Aplicaciones Multiplataforma y Web. Formación en Java, bases de datos, desarrollo web y arquitectura de software.",
  },
  {
    period: "Sep 2019 — Jun 2021",
    role: "Ciclo Medio — SMR",
    company: "I.E.S Heliche, Sevilla",
    description:
      "Sistemas Microinformáticos y Redes. Fundamentos de redes, sistemas operativos y hardware.",
  },
];

function TimelineItem({ item, index }: { item: Item; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{ display: "flex", gap: "24px" }}
    >
      {/* Línea + punto */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "var(--accent)",
          marginTop: "6px",
          flexShrink: 0,
        }} />
        <div style={{
          width: "1px",
          flex: 1,
          background: "var(--border)",
          marginTop: "8px",
        }} />
      </div>

      {/* Contenido */}
      <div style={{ paddingBottom: "40px" }}>
        <p style={{
          fontSize: "0.8125rem",
          color: "var(--accent)",
          fontWeight: 500,
          marginBottom: "4px",
          fontFamily: "var(--font-geist-mono)",
        }}>
          {item.period}
        </p>
        <h3 style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--text)",
          marginBottom: "2px",
        }}>
          {item.role}
        </h3>
        <p style={{
          fontSize: "0.875rem",
          color: "var(--accent)",
          marginBottom: "10px",
          fontWeight: 500,
        }}>
          {item.company}
        </p>
        <p style={{
          fontSize: "0.9375rem",
          color: "var(--text-muted)",
          lineHeight: 1.65,
          marginBottom: item.tags ? "12px" : "0",
        }}>
          {item.description}
        </p>
        {item.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {item.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "2px 10px",
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      id="experiencia"
      style={{
        padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 24px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "64px" }}
      >
        <p style={{
          fontSize: "0.875rem",
          color: "var(--accent)",
          fontWeight: 500,
          marginBottom: "12px",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}>
          Trayectoria
        </p>
        <h2 style={{
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "var(--text)",
        }}>
          Experiencia y formación
        </h2>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
        gap: "0 80px",
      }}>
        {/* Experiencia */}
        <div>
          <p style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "32px",
            fontFamily: "var(--font-geist-mono)",
          }}>
            Experiencia
          </p>
          {experience.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Formación */}
        <div>
          <p style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "32px",
            fontFamily: "var(--font-geist-mono)",
          }}>
            Formación
          </p>
          {education.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
