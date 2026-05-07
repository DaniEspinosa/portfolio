export type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
  image?: string;
  tags: string[];
  status: "live" | "in-progress";
};

export const projects: Project[] = [
  {
    id: 1,
    name: "TomasAPI",
    description:
      "Web corporativa para una inmobiliaria. Diseño limpio y funcional que muestra el catálogo de propiedades y servicios de la empresa.",
    url: "https://tomasapi.es/",
    image: "/projects/tomasapi.png",
    tags: ["Angular", "Inmobiliaria", "Frontend"],
    status: "live",
  },
  {
    id: 2,
    name: "Grupo Emere",
    description:
      "Plataforma web moderna para una inmobiliaria. Diseño y desarrollo completo con tecnologías de última generación.",
    url: "https://grupoemere.es/",
    image: "/projects/grupoemere.png",
    tags: ["Next.js", "Inmobiliaria", "Frontend"],
    status: "live",
  },
];
