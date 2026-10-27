/**
 * Portfólio da Integra Consultora.
 *
 * Para adicionar um projeto, inclua um item no array `projects`.
 * - `image`: opcional. Salve o print em /public/portfolio/ e informe o caminho
 *   (ex.: "/portfolio/lista-facil.png"). Sem imagem, o card usa um mockup em CSS.
 * - `link`: opcional (Play Store, vídeo, case, repositório...).
 */

export type ProjectCategory = "app" | "dashboard" | "dados";

export type Project = {
  id: string;
  category: ProjectCategory;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  status: string;
  image?: string;
  link?: { href: string; label: string };
  /** Linhas exibidas no mockup quando não há imagem. */
  mock?: string[];
};

export const categories: { id: "todos" | ProjectCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "app", label: "Apps Android" },
  { id: "dashboard", label: "Dashboards" },
  { id: "dados", label: "Engenharia de Dados" },
];

export const projects: Project[] = [
  {
    id: "lista-facil",
    category: "app",
    title: "Lista Fácil",
    tagline: "Lista de compras simples, rápida e offline.",
    description:
      "App Android para organizar compras do dia a dia: listas por categoria, marcação rápida de itens e foco total em usabilidade.",
    highlights: ["Publicado na Google Play", "Funciona offline", "Interface pensada para uma mão"],
    stack: ["Kotlin", "Jetpack Compose", "Room"],
    status: "Na Google Play",
    link: {
      href: "https://play.google.com/store/apps/details?id=com.integraconsultora.lista_facil",
      label: "Baixar na Play Store",
    },
    mock: ["Hortifruti", "Mercearia", "Limpeza", "Padaria"],
  },
  {
    id: "jejumflow",
    category: "app",
    title: "JejumFlow",
    tagline: "Acompanhamento de jejum intermitente.",
    description:
      "Timer de jejum com protocolos personalizáveis, histórico e acompanhamento de progresso, com foco em performance e design limpo.",
    highlights: ["Protocolos personalizáveis", "Histórico de jejuns", "Notificações inteligentes"],
    stack: ["Kotlin", "Jetpack Compose", "Material 3"],
    status: "Projeto autoral",
    mock: ["16:8 em andamento", "Janela alimentar", "Histórico", "Metas"],
  },
  {
    id: "planner-junior",
    category: "app",
    title: "Planner Junior",
    tagline: "Rotina e tarefas para crianças, com recompensas.",
    description:
      "Planner diário infantil com visual de bullet journal, tarefas temáticas e sistema de recompensas para estimular autonomia.",
    highlights: ["Sistema de recompensas", "Temas visuais", "Dados salvos no aparelho"],
    stack: ["Kotlin", "Compose", "Room", "DataStore"],
    status: "Projeto autoral",
    mock: ["Escovar os dentes ⭐", "Lição de casa ⭐", "Arrumar a mochila", "Ler 15 min"],
  },
  {
    id: "financas-em-casa",
    category: "app",
    title: "Finanças em Casa",
    tagline: "Controle financeiro doméstico descomplicado.",
    description:
      "Registro de receitas e despesas, categorias e visão mensal do orçamento da família — dados virando decisão também em casa.",
    highlights: ["Receitas e despesas", "Categorias", "Resumo mensal"],
    stack: ["Android", "Mobile"],
    status: "Projeto autoral",
    mock: ["Receitas", "Despesas fixas", "Mercado", "Saldo do mês"],
  },
  {
    id: "omie-360",
    category: "dashboard",
    title: "Visão 360º · Integração Omie",
    tagline: "Financeiro, DRE, CRM e estoque em um só lugar.",
    description:
      "Integração via API com o ERP Omie consolidando dados financeiros, comerciais e de estoque em dashboards executivos no Power BI.",
    highlights: ["Integração via API", "DRE gerencial", "Atualização automática"],
    stack: ["Power BI", "Python", "API REST", "DAX"],
    status: "Case de cliente",
    mock: ["Receita", "Resultado", "Margem"],
  },
  {
    id: "pipeline-e2e",
    category: "dados",
    title: "Pipeline de dados end-to-end",
    tagline: "Da origem ao dashboard, com governança.",
    description:
      "Arquitetura de referência com ingestão orquestrada, Data Lake em camadas, transformação e Data Warehouse prontos para consumo analítico.",
    highlights: ["Arquitetura medalhão", "Orquestração", "Pronto para escala"],
    stack: ["Azure Data Factory", "Databricks", "Delta Lake", "SQL"],
    status: "Arquitetura",
    image: "/pipeline-end-to-end.webp",
  },
];
