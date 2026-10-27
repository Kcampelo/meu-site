"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { categories, projects, type Project, type ProjectCategory, type Screen } from "./portfolio";

const whatsapp =
  "https://wa.me/5543991544867?text=Olá%2C%20vim%20pelo%20site%20da%20Integra%20Consultora%20e%20gostaria%20de%20conversar%20sobre%20uma%20solução%20em%20dados.";
const email =
  "mailto:consultoria@integraconsultora.com.br?subject=Contato%20pelo%20site%20-%20Integra%20Consultora";
const instagram = "https://www.instagram.com/dadoscomintegra/";

const services = [
  {
    icon: "DE",
    title: "Engenharia de Dados",
    text: "Pipelines, integrações e arquiteturas Lakehouse para ter dados confiáveis, organizados e prontos para uso.",
    points: ["Azure Data Factory & Databricks", "ETL, APIs e integrações", "Data Lake & Data Warehouse"],
  },
  {
    icon: "BI",
    title: "Power BI & Analytics",
    text: "Dashboards executivos e indicadores claros para quem precisa decidir rápido, sem planilha paralela.",
    points: ["Modelagem e DAX", "Dashboards executivos", "Indicadores estratégicos"],
  },
  {
    icon: "PY",
    title: "Automação & IA",
    text: "Automação de rotinas com Python e IA para reduzir trabalho manual e liberar o time para o que importa.",
    points: ["Automação de processos", "Agentes e IA aplicada", "Scripts e APIs sob medida"],
  },
  {
    icon: "AP",
    title: "Apps sob medida",
    text: "Aplicativos Android nativos, rápidos e intuitivos, conectados aos dados do seu negócio.",
    points: ["Kotlin & Jetpack Compose", "Foco em performance", "Publicação na Google Play"],
  },
];

const steps = [
  { n: "01", title: "Diagnóstico", text: "Entendemos o negócio, as fontes de dados e a decisão que precisa ser tomada." },
  { n: "02", title: "Arquitetura", text: "Desenhamos a solução certa para o seu tamanho — sem excesso de ferramenta." },
  { n: "03", title: "Construção", text: "Pipelines, modelos e dashboards entregues em ciclos curtos e validados com você." },
  { n: "04", title: "Evolução", text: "Documentação, repasse e acompanhamento para a solução crescer com a empresa." },
];

const stack = ["Azure", "Databricks", "Data Factory", "Power BI", "Python", "SQL", "Delta Lake", "Kotlin", "Jetpack Compose", "APIs REST"];

type Gallery = { title: string; screens: Screen[]; index: number; landscape: boolean };

function ProjectVisual({ project, onOpen }: { project: Project; onOpen: (index: number) => void }) {
  if (project.screens?.length && project.landscape) {
    const [cover] = project.screens;
    return (
      <button
        type="button"
        className="pf-media pf-media-dashboard pf-shot-wide"
        onClick={() => onOpen(0)}
        aria-label={`Ver as ${project.screens.length} telas do ${project.title}`}
      >
        <img src={cover.sm} alt={cover.alt} width={640} height={360} loading="lazy" decoding="async" />
        <span className="pf-zoom">Ver {project.screens.length} telas</span>
      </button>
    );
  }

  if (project.screens?.length) {
    return (
      <button
        type="button"
        className="pf-media pf-media-app pf-screens"
        onClick={() => onOpen(0)}
        aria-label={`Ver as ${project.screens.length} telas do ${project.title}`}
      >
        {project.screens.slice(0, 3).map((screen, i) => (
          <img
            key={screen.sm}
            className={`shot shot-${i}`}
            src={screen.sm}
            alt={i === 0 ? screen.alt : ""}
            width={360}
            height={640}
            loading="lazy"
            decoding="async"
          />
        ))}
        <span className="pf-zoom">Ver {project.screens.length} telas</span>
      </button>
    );
  }

  if (project.image) {
    return (
      <div className={`pf-media pf-media-${project.category}`}>
        <img src={project.image} alt={`Imagem do projeto ${project.title}`} loading="lazy" />
      </div>
    );
  }

  if (project.category === "app") {
    return (
      <div className="pf-media pf-media-app" aria-hidden="true">
        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-title">{project.title}</div>
          {(project.mock ?? []).map((row, i) => (
            <div className="phone-row" key={row}>
              <i className={i === 0 ? "done" : ""} />
              <span>{row}</span>
            </div>
          ))}
          <div className="phone-fab">+</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pf-media pf-media-dashboard" aria-hidden="true">
      <div className="dash">
        <div className="dash-kpis">
          {(project.mock ?? ["KPI 1", "KPI 2", "KPI 3"]).map((kpi, i) => (
            <div key={kpi}>
              <small>{kpi}</small>
              <b>{["R$ 1,24M", "R$ 384K", "31,0%"][i] ?? "—"}</b>
            </div>
          ))}
        </div>
        <div className="dash-bars">
          {[38, 62, 46, 78, 69, 92, 84].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<"todos" | ProjectCategory>("todos");
  const [gallery, setGallery] = useState<Gallery | null>(null);

  const step = useCallback((delta: number) => {
    setGallery((g) => g && { ...g, index: (g.index + delta + g.screens.length) % g.screens.length });
  }, []);

  const isGalleryOpen = gallery !== null;
  useEffect(() => {
    if (!isGalleryOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGallery(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isGalleryOpen, step]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleProjects = useMemo(
    () => (filter === "todos" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { todos: projects.length };
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <a className="brand" href="#inicio" aria-label="Integra Consultora - início">
          <img src="/logo-integra-nitida.png" alt="Integra Consultora" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#servicos" onClick={closeMenu}>Soluções</a>
          <a href="#portfolio" onClick={closeMenu}>Portfólio</a>
          <a href="#metodo" onClick={closeMenu}>Como trabalho</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
          <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Agendar conversa
          </a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span className="dot" /> Engenharia de Dados · Power BI · Apps</p>
          <h1>
            Seus dados,
            <br />
            <em>integrados</em> e
            <br />
            trabalhando por você.
          </h1>
          <p className="hero-copy">
            Consultoria independente que conecta sistemas, automatiza rotinas e entrega
            dashboards e aplicativos que viram decisão — do pipeline ao painel.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer">
              Conversar sobre meu projeto <b>↗</b>
            </a>
            <a className="btn btn-ghost" href="#portfolio">
              Ver portfólio <b>↓</b>
            </a>
          </div>
          <ul className="hero-proof">
            <li><strong>DP-203</strong><span>Azure Data Engineer</span></li>
            <li><strong>DA-100</strong><span>Data Analyst</span></li>
            <li><strong>{projects.length}+</strong><span>projetos no portfólio</span></li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="terminal">
            <div className="terminal-bar"><i /><i /><i /><span>pipeline_vendas.py</span></div>
            <pre>
              <span className="c-mute">$</span> run pipeline --env prod{"\n"}
              <span className="c-ok">✔</span> ingest   omie_api      <span className="c-mute">12.4k rows</span>{"\n"}
              <span className="c-ok">✔</span> bronze → silver        <span className="c-mute">0.8s</span>{"\n"}
              <span className="c-ok">✔</span> silver → gold         <span className="c-mute">1.2s</span>{"\n"}
              <span className="c-ok">✔</span> refresh powerbi_dre{"\n"}
              <span className="c-accent">→ dados prontos para decisão</span>
            </pre>
          </div>
          <div className="kpi-card">
            <small>Status do pipeline</small>
            <b>Saudável</b>
            <div className="spark">
              {[42, 55, 48, 66, 72, 81, 90].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
            </div>
          </div>
          <div className="chip-card">
            <span className="dot" /> Atualizado automaticamente
          </div>
        </div>
      </section>

      <div className="stack-strip" aria-label="Tecnologias">
        <div className="stack-track">
          {[...stack, ...stack].map((item, i) => (
            <span key={`${item}-${i}`} aria-hidden={i >= stack.length}>{item}</span>
          ))}
        </div>
      </div>

      <section className="services section" id="servicos">
        <div className="section-heading">
          <div>
            <p className="kicker">O que eu entrego</p>
            <h2>Da integração dos dados<br />ao app na mão do usuário.</h2>
          </div>
          <p>
            Uma consultoria enxuta, com atuação de ponta a ponta: menos intermediários,
            mais velocidade e responsabilidade técnica do início ao fim.
          </p>
        </div>
        <div className="service-grid">
          {services.map((s) => (
            <article className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>{s.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio section" id="portfolio">
        <div className="section-heading">
          <div>
            <p className="kicker">Portfólio</p>
            <h2>Projetos que saíram<br />do papel.</h2>
          </div>
          <p>Aplicativos publicados, dashboards e arquiteturas de dados construídos com foco em performance e usabilidade.</p>
        </div>

        <div className="pf-filters" role="tablist" aria-label="Filtrar portfólio">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={filter === c.id}
              className={filter === c.id ? "active" : ""}
              onClick={() => setFilter(c.id)}
            >
              {c.label} <span>{counts[c.id] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="pf-grid">
          {visibleProjects.map((p) => (
            <article className={`pf-card pf-${p.category}`} key={p.id}>
              <ProjectVisual
                project={p}
                onOpen={(index) =>
                  p.screens && setGallery({ title: p.title, screens: p.screens, index, landscape: !!p.landscape })
                }
              />
              <div className="pf-body">
                <div className="pf-meta">
                  <span className="pf-cat">{categories.find((c) => c.id === p.category)?.label}</span>
                  <span className="pf-status">{p.status}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="pf-tagline">{p.tagline}</p>
                <p className="pf-desc">{p.description}</p>
                <ul className="pf-highlights">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                <div className="pf-stack">{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
                {p.link && (
                  <a className="pf-link" href={p.link.href} target="_blank" rel="noreferrer">
                    {p.link.label} <b>↗</b>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="pf-cta">
          <p>Tem um projeto parecido em mente?</p>
          <a className="btn btn-dark" href={whatsapp} target="_blank" rel="noreferrer">Vamos conversar <b>→</b></a>
        </div>
      </section>

      <section className="method section" id="metodo">
        <div className="method-copy">
          <p className="kicker light">Como trabalho</p>
          <h2>Processo claro,<br />entregas em ciclos.</h2>
          <p>
            Você acompanha cada etapa e recebe valor desde as primeiras semanas,
            não só no fim do projeto.
          </p>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.n}>
                <span>{s.n}</span>
                <div><b>{s.title}</b><p>{s.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <figure className="pipeline-visual">
          <img
            src="/pipeline-end-to-end.webp"
            alt="Animação do pipeline de dados da Integra, conectando fontes, Data Lake, tratamento, Data Warehouse e ferramentas de análise"
            loading="lazy"
          />
          <figcaption>Pipeline end-to-end · da origem ao consumo</figcaption>
        </figure>
      </section>

      <section className="credentials section">
        <p className="kicker">Competência técnica validada</p>
        <div className="cred-grid">
          <div><strong>Microsoft Certified</strong><span>Azure Data Engineer Associate · DP-203</span></div>
          <div><strong>Microsoft Certified</strong><span>Data Analyst Associate · DA-100</span></div>
          <div><strong>Conteúdo para a comunidade</strong><span>Dicas de dados no Instagram <a href={instagram} target="_blank" rel="noreferrer">@dadoscomintegra</a></span></div>
        </div>
      </section>

      <section className="contact" id="contato">
        <p className="kicker">Próximo passo</p>
        <h2>Vamos colocar seus<br />dados para trabalhar?</h2>
        <p>Conte seu desafio em uma mensagem. Respondo com um caminho possível — sem compromisso.</p>
        <div className="contact-actions">
          <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer">Chamar no WhatsApp <b>↗</b></a>
          <a className="btn btn-ghost" href={email}>Enviar e-mail <b>→</b></a>
        </div>
      </section>

      <footer>
        <img src="/logo-integra-nitida.png" alt="Integra Consultora" />
        <div>
          <a href="mailto:consultoria@integraconsultora.com.br">consultoria@integraconsultora.com.br</a>
          <a href={whatsapp} target="_blank" rel="noreferrer">+55 43 99154-4867</a>
          <a href={instagram} target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <p>© {new Date().getFullYear()} Integra Consultora</p>
      </footer>

      {gallery && (
        <div
          className={gallery.landscape ? "lightbox is-wide" : "lightbox"}
          role="dialog"
          aria-modal="true"
          aria-label={`Telas do ${gallery.title}`}
          onClick={() => setGallery(null)}
        >
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <div className="lb-head">
              <b>{gallery.title}</b>
              <span>{gallery.index + 1} / {gallery.screens.length}</span>
              <button type="button" className="lb-close" onClick={() => setGallery(null)} aria-label="Fechar galeria">×</button>
            </div>
            <div className="lb-stage">
              <button type="button" className="lb-nav lb-prev" onClick={() => step(-1)} aria-label="Tela anterior">‹</button>
              <img
                src={gallery.screens[gallery.index].lg}
                alt={gallery.screens[gallery.index].alt}
                width={gallery.landscape ? 1600 : 720}
                height={gallery.landscape ? 900 : 1280}
              />
              <button type="button" className="lb-nav lb-next" onClick={() => step(1)} aria-label="Próxima tela">›</button>
            </div>
            <p className="lb-caption">{gallery.screens[gallery.index].alt}</p>
            <div className="lb-thumbs">
              {gallery.screens.map((screen, i) => (
                <button
                  key={screen.sm}
                  type="button"
                  className={i === gallery.index ? "active" : ""}
                  onClick={() => setGallery({ ...gallery, index: i })}
                  aria-label={`Tela ${i + 1}: ${screen.alt}`}
                >
                  <img
                    src={screen.sm}
                    alt=""
                    width={gallery.landscape ? 640 : 360}
                    height={gallery.landscape ? 360 : 640}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp">
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/>
        </svg>
      </a>
    </main>
  );
}
