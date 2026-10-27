/**
 * Portfólio da Integra Consultora.
 *
 * Para adicionar um projeto, inclua um item no array `projects`.
 * - `screens`: telas reais do app. Salve em /public/portfolio/<id>/ como
 *   NN-sm.webp (360px, usada no card) e NN-lg.webp (720px, usada na galeria).
 * - `image`: opcional, imagem única (dashboards / arquiteturas).
 * Sem `screens` nem `image`, o card usa um mockup em CSS.
 * - `link`: opcional (Play Store, vídeo, case, repositório...).
 */

export type ProjectCategory = "app" | "dashboard" | "dados";

export type Screen = { sm: string; lg: string; alt: string };

/** Monta a lista de telas a partir da pasta /public/portfolio/<id>/. */
const screens = (id: string, alts: string[]): Screen[] =>
  alts.map((alt, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { sm: `/portfolio/${id}/${n}-sm.webp`, lg: `/portfolio/${id}/${n}-lg.webp`, alt };
  });

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
  screens?: Screen[];
  /** Telas horizontais (16:9), ex.: dashboards. */
  landscape?: boolean;
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
    tagline: "Lista de compras e desejos, 100% offline.",
    description:
      "Listas de compras e desejos com agrupamento automático por categoria, inclusão de itens por voz em português e compartilhamento direto no WhatsApp. Os dados ficam só no aparelho.",
    highlights: ["Inclusão de itens por voz", "Compartilha a lista no WhatsApp", "Sem login e sem internet"],
    stack: ["React Native", "Expo", "TypeScript", "AdMob"],
    status: "Na Google Play",
    link: {
      href: "https://play.google.com/store/apps/details?id=com.integraconsultora.lista_facil",
      label: "Baixar na Play Store",
    },
    screens: screens("lista-facil", [
      "Lista de compras principal agrupada por categoria",
      "Cadastro de produtos e serviços",
      "Itens e gerenciamento da lista",
    ]),
  },
  {
    id: "jejumflow",
    category: "app",
    title: "JejumFlow",
    tagline: "Jejum intermitente com lembretes inteligentes.",
    description:
      "Cronômetro com as fases do jejum, planos de 12:12 a 72h, lembretes com ações na notificação, meta de água e gráfico de peso — app nativo, com gráficos desenhados em Canvas.",
    highlights: ["Planos prontos e personalizados", "Lembretes com ações na notificação", "Água, peso e IMC"],
    stack: ["Kotlin", "Jetpack Compose", "Room", "MVVM"],
    status: "Projeto autoral",
    screens: screens("jejumflow", [
      "Cronômetro de jejum com fases",
      "Registro de água com meta diária",
      "Progresso de peso e IMC",
      "Planos de jejum",
    ]),
  },
  {
    id: "planner-junior",
    category: "app",
    title: "Planner Junior",
    tagline: "Rotina e tarefas para crianças, com recompensas.",
    description:
      "Missões do dia organizadas por manhã, tarde e noite, recompensas e conquistas para estimular a autonomia, com temas visuais para a criança escolher. Funciona offline, sem login.",
    highlights: ["Missões com recorrência semanal", "Recompensas e conquistas", "Temas floral e super-herói"],
    stack: ["React Native", "Expo", "TypeScript", "Notificações"],
    status: "Em breve na Play Store",
    screens: screens("planner-junior", [
      "Missões de hoje no tema floral",
      "Missões de hoje no tema super-herói",
      "Tela de recompensas",
      "Tela de conquistas",
    ]),
  },
  {
    id: "financas-em-casa",
    category: "app",
    title: "Finanças em Casa",
    tagline: "Controle financeiro da família, por voz.",
    description:
      "Dashboard mensal com receitas, despesas e divisão entre essenciais e supérfluos, contas e cartões com fechamento e vencimento, e lançamentos por voz com categorização automática.",
    highlights: ["Lançamento por voz", "Categorização automática", "Dados protegidos no aparelho"],
    stack: ["React Native", "Expo", "TypeScript", "Biometria"],
    status: "Projeto autoral",
    screens: screens("financas-em-casa", [
      "Tela inicial com saldo do mês",
      "Dashboard de receitas e despesas",
      "Contas e cartões",
      "Menu e recursos",
    ]),
  },
  {
    id: "painel-vendas-demo",
    category: "dashboard",
    title: "Painel de Vendas",
    tagline: "Faturamento, curva ABC e reativação de clientes.",
    description:
      "Dashboard comercial com faturamento x meta x ano anterior, canais, regiões, mix de produtos, curva ABC e lista priorizada de clientes para reativação. Exemplo com dados fictícios.",
    highlights: ["Faturamento x meta x ano anterior", "Curva ABC de clientes", "Prioridade de reativação"],
    stack: ["Power BI", "DAX", "Modelagem dimensional"],
    status: "Demonstração · dados fictícios",
    landscape: true,
    screens: screens("painel-vendas-demo", [
      "Visão geral: faturamento mensal, canais, produtos e regiões",
      "Clientes e produtos: curva ABC e prioridade de reativação",
    ]),
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
