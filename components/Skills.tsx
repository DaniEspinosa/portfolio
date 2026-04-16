"use client";

import { motion } from "framer-motion";
import {
  SiAngular, SiNextdotjs, SiJavascript, SiTypescript,
  SiHtml5, SiCss, SiNodedotjs, SiOpenjdk, SiSpringboot,
  SiSalesforce, SiGit, SiMysql,
} from "react-icons/si";
import { TbBolt } from "react-icons/tb";

type Skill = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

type SkillGroup = {
  category: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      { name: "Angular",     icon: <SiAngular />,     color: "#DD0031" },
      { name: "Next.js",     icon: <SiNextdotjs />,   color: "var(--text)" },
      { name: "JavaScript",  icon: <SiJavascript />,  color: "#F7DF1E" },
      { name: "TypeScript",  icon: <SiTypescript />,  color: "#3178C6" },
      { name: "HTML5",       icon: <SiHtml5 />,       color: "#E34F26" },
      { name: "CSS3",        icon: <SiCss />,         color: "#1572B6" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js",     icon: <SiNodedotjs />,   color: "#339933" },
      { name: "Java",        icon: <SiOpenjdk />,     color: "#ED8B00" },
      { name: "Spring Boot", icon: <SiSpringboot />,  color: "#6DB33F" },
    ],
  },
  {
    category: "Salesforce",
    skills: [
      { name: "Salesforce",  icon: <SiSalesforce />,  color: "#00A1E0" },
      { name: "LWC",         icon: <TbBolt />,        color: "#00A1E0" },
    ],
  },
  {
    category: "Herramientas",
    skills: [
      { name: "Git",         icon: <SiGit />,         color: "#F05032" },
      { name: "SQL",         icon: <SiMysql />,       color: "#4479A1" },
    ],
  },
];

function SkillPill({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "12px 16px",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "default",
      }}
      whileHover={{ borderColor: skill.color, y: -2 }}
    >
      <span style={{ color: skill.color, fontSize: "1.2rem", flexShrink: 0, display: "flex" }}>
        {skill.icon}
      </span>
      <span style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 500 }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 24px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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
          Skills
        </p>
        <h2 style={{
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: "16px",
        }}>
          Tecnologías que uso
        </h2>
        <p style={{
          fontSize: "1.0625rem",
          color: "var(--text-muted)",
          maxWidth: "480px",
          lineHeight: 1.7,
        }}>
          Las herramientas con las que trabajo en el día a día.
        </p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {skillGroups.map((group) => (
          <div key={group.category}>
            <p style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontFamily: "var(--font-geist-mono)",
            }}>
              {group.category}
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "10px",
            }}>
              {group.skills.map((skill, i) => (
                <SkillPill key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
