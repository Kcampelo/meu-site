import type { Metadata } from "next";
import "./globals.css";

const title = "Integra Consultora | Engenharia de Dados, Power BI e Apps";
const description =
  "Consultoria em Engenharia de Dados, Power BI, automação com Python e apps Android. Integração de sistemas, pipelines no Azure e Databricks e dashboards que viram decisão.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.integraconsultora.com.br"),
  title,
  description,
  keywords: [
    "consultoria de dados",
    "engenharia de dados",
    "Power BI",
    "dashboards",
    "Azure Data Factory",
    "Databricks",
    "integração de sistemas",
    "automação com Python",
    "desenvolvimento de apps Android",
  ],
  openGraph: {
    title,
    description,
    url: "https://www.integraconsultora.com.br",
    siteName: "Integra Consultora",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/identidade-integra.png", width: 1536, height: 1024, alt: "Integra Consultora" }],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
