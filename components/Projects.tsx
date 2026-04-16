"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="proyectos"
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
          Proyectos
        </p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "16px",
          }}
        >
          Lo que he construido
        </h2>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--text-muted)",
            maxWidth: "480px",
            lineHeight: 1.7,
          }}
        >
          Una selección de proyectos reales en producción. Más en camino.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
