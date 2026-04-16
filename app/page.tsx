import Navigation from "@/components/Navigation";
import LogoIntro from "@/components/LogoIntro";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <LogoIntro />
      <main>
        <Hero />
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            height: "1px",
            background: "var(--border)",
          }}
        />
        <Skills />
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            height: "1px",
            background: "var(--border)",
          }}
        />
        <Projects />
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            height: "1px",
            background: "var(--border)",
          }}
        />
        <Contact />
      </main>
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 24px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "0.875rem",
        }}
      >
        <p>© {new Date().getFullYear()} Daniel Espinosa Mauri</p>
      </footer>
    </>
  );
}
