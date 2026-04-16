import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import { IntroProvider } from "@/context/IntroContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Espinosa — Desarrollador Web",
  description:
    "Desarrollador web desde 2023, especializado en frontend con Angular y Next.js. Trabaja en Ayesa como desarrollador Salesforce y lleva proyectos freelance propios.",
  keywords: ["desarrollador web", "frontend", "Next.js", "Angular", "portfolio"],
  authors: [{ name: "Daniel Espinosa Mauri" }],
  openGraph: {
    title: "Daniel Espinosa — Desarrollador Web",
    description:
      "Desarrollador web desde 2023, especializado en frontend con Angular y Next.js. Trabaja en Ayesa como desarrollador Salesforce y lleva proyectos freelance propios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IntroProvider>
          <Background />
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {children}
          </div>
        </IntroProvider>
      </body>
    </html>
  );
}
