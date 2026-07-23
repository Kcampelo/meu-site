import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Integra Consultora | Engenharia de Dados, Power BI e IA",
  description:
    "Transformamos dados em decisões, automações e vantagem competitiva. Engenharia de Dados, dashboards, Power BI e Inteligência Artificial.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
