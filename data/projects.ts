export type Project = {
  id: number;
  name: string;
  description: string;
  url: string;
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
    tags: ["Angular", "Inmobiliaria", "Frontend"],
    status: "live",
  },
  {
    id: 2,
    name: "Grupo Emere",
    description:
      "Plataforma web moderna para una inmobiliaria en proceso de lanzamiento. Construcción con tecnologías de última generación.",
    url: "https://grupo-emere-web.vercel.app/",
    tags: ["Next.js", "Inmobiliaria", "Frontend"],
    status: "in-progress",
  },
];
