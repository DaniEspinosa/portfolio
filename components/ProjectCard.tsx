"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

type Props = Readonly<{
  project: Project;
  index: number;
}>;

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver proyecto ${project.name}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "border-color 0.25s, transform 0.25s",
        textDecoration: "none",
        cursor: "pointer",
      }}
      whileHover={{
        borderColor: "var(--accent)",
        y: -4,
      }}
    >
      {/* Preview */}
      <div
        style={{
          width: "100%",
          height: "220px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "var(--surface-2)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={`Preview de ${project.name}`}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: "linear-gradient(to bottom, transparent, var(--surface))",
              pointerEvents: "none",
            }} />
          </>
        ) : (
          <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}>
            sin preview
          </span>
        )}
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            background: "var(--surface-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {project.status === "in-progress" && (
            <span
              style={{
                fontSize: "0.75rem",
                background: "rgba(99,102,241,0.12)",
                color: "var(--accent)",
                padding: "3px 10px",
                borderRadius: "999px",
                fontWeight: 500,
              }}
            >
              En proceso
            </span>
          )}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(99,102,241,0.12)",
              color: "var(--accent)",
            }}
            aria-hidden
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--text)",
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--text-muted)",
            lineHeight: 1.65,
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              background: "var(--surface-2)",
              padding: "4px 10px",
              borderRadius: "6px",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
