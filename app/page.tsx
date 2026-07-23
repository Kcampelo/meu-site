"use client";

import { useEffect, useState } from "react";

const whatsapp =
  "https://wa.me/5543991544867?text=Olá%2C%20vim%20pelo%20site%20da%20Integra%20Consultora%20e%20gostaria%20de%20conversar%20sobre%20uma%20solução%20em%20dados.";
const email =
  "mailto:consultoria@integraconsultora.com.br?subject=Contato%20pelo%20site%20-%20Integra%20Consultora";

const services = [
  {
    tag: "01",
    title: "Engenharia de Dados",
    text: "Arquiteturas modernas, pipelines e integrações para coletar, processar e disponibilizar dados com segurança, escala e performance.",
    points: ["Data Warehouse & Lakehouse", "ETL, APIs e integrações", "Microsoft Azure & Databricks"],
  },
  {
    tag: "02",
    title: "Análise & Power BI",
    text: "Dashboards interativos e indicadores confiáveis para transformar informação em decisões mais rápidas e melhores.",
    points: ["Dashboards executivos", "Indicadores estratégicos", "Visualização em tempo real"],
  },
  {
    tag: "03",
    title: "IA & Automação",
    text: "Automações e soluções inteligentes para reduzir tarefas repetitivas, analisar documentos e apoiar decisões.",
    points: ["Agentes inteligentes", "Automação de processos", "Python e aplicações sob medida"],
  },
];

const benefits = [
  "Eliminar silos de informação",
  "Reduzir custos operacionais",
  "Aumentar a produtividade",
  "Decidir com dados confiáveis",
  "Escalar com governança",
  "Acelerar a transformação digital",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#servicos" onClick={closeMenu}>Soluções</a>
          <a href="#metodo" onClick={closeMenu}>Como atuamos</a>
          <a href="#diferenciais" onClick={closeMenu}>Diferenciais</a>
          <a href="#cases" onClick={closeMenu}>Cases</a>
          <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Vamos conversar
          </a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="pixel-field" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className="hero-content">
          <p className="eyebrow"><span /> Inteligência que gera resultado</p>
          <h1>
            Seus dados podem fazer
            <em> muito mais.</em>
          </h1>
          <p className="hero-copy">
            Conectamos dados, tecnologia e estratégia para sua empresa decidir melhor,
            automatizar processos e crescer com segurança.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer">
              Falar com um especialista <b>↗</b>
            </a>
            <a className="btn btn-link" href="#servicos">
              Conhecer soluções <span>↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <div><strong>End-to-end</strong><span>Da arquitetura ao insight</span></div>
            <div><strong>Microsoft + Databricks</strong><span>Especialização técnica</span></div>
            <div><strong>Sob medida</strong><span>Para o seu negócio</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="data-orbit orbit-a"><span /></div>
          <div className="data-orbit orbit-b"><span /></div>
          <div className="data-core">
            <small>DADOS</small>
            <strong>→</strong>
            <small>VALOR</small>
          </div>
          <div className="float-card card-a"><b>+ clareza</b><span>Decisões confiáveis</span></div>
          <div className="float-card card-b"><b>+ eficiência</b><span>Processos inteligentes</span></div>
        </div>
      </section>

      <section className="intro section">
        <div>
          <p className="section-kicker">Integra Consultora</p>
          <h2>Dados que conectam.<br />Insights que transformam.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Somos especialistas em Engenharia de Dados. Atuamos de ponta a ponta,
            da concepção da arquitetura à entrega de soluções que tornam seus dados
            úteis, acessíveis e estratégicos.
          </p>
          <a href="#diferenciais">Por que escolher a Integra <span>→</span></a>
        </div>
      </section>

      <section className="method section" id="metodo">
        <div className="method-copy">
          <p className="section-kicker">Nossa proposta end-to-end</p>
          <h2>Da origem dos dados<br />à decisão de negócio.</h2>
          <p>
            Conectamos todas as etapas da jornada: integramos suas fontes, estruturamos
            o armazenamento, tratamos e modelamos os dados e entregamos informações
            prontas para análise e ação.
          </p>
          <div className="method-steps" aria-label="Etapas da proposta de trabalho">
            <span>01 <b>Ingestão</b></span>
            <span>02 <b>Armazenamento</b></span>
            <span>03 <b>Transformação</b></span>
            <span>04 <b>Visualização</b></span>
          </div>
        </div>
        <figure className="pipeline-visual">
          <img
            src="/pipeline-end-to-end.webp"
            alt="Animação do pipeline de dados da Integra, conectando fontes, Data Lake, tratamento, Data Warehouse e ferramentas de análise"
            loading="lazy"
          />
          <figcaption>Pipeline de dados: da origem ao consumo</figcaption>
        </figure>
      </section>

      <section className="services section" id="servicos">
        <div className="section-heading">
          <div>
            <p className="section-kicker">O que fazemos</p>
            <h2>Soluções que transformam<br />complexidade em resultado.</h2>
          </div>
          <p>Estratégia, tecnologia e execução integradas em uma única parceria.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span className="service-number">{service.tag}</span>
              <div className="service-icon">{service.tag === "01" ? "DB" : service.tag === "02" ? "BI" : "IA"}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="difference" id="diferenciais">
        <div className="difference-copy">
          <p className="section-kicker light">Por que a Integra</p>
          <h2>Tecnologia forte.<br />Visão de negócio.</h2>
          <p>
            Combinamos conhecimento técnico, boas práticas de mercado e foco em
            resultado para criar soluções robustas, escaláveis e alinhadas à realidade
            de cada cliente.
          </p>
          <a className="btn btn-primary" href={email}>Conte seu desafio <b>→</b></a>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit, index) => (
            <div className="benefit" key={benefit}>
              <span>0{index + 1}</span>
              <p>{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case section" id="cases">
        <div className="case-top">
          <div>
            <p className="section-kicker">Experiência aplicada</p>
            <h2>Dados integrados.<br />Negócios em movimento.</h2>
          </div>
          <p>
            Projetos que conectam sistemas, automatizam rotinas e entregam uma visão
            completa da operação.
          </p>
        </div>
        <div className="case-card">
          <div className="case-copy">
            <span className="case-label">CASE • INTEGRAÇÃO OMIE</span>
            <h3>Uma visão 360º da empresa em um só lugar.</h3>
            <p>
              Integração via API com o Omie para consolidar dados financeiros,
              comerciais, CRM, estoque e DRE em dashboards práticos e confiáveis.
            </p>
            <div className="case-tags">
              <span>Financeiro</span><span>DRE</span><span>CRM</span><span>Estoque</span>
            </div>
          </div>
          <div className="dashboard-mock" aria-label="Representação visual de dashboard">
            <div className="mock-head"><i /><span /><span /></div>
            <div className="mock-metrics">
              <div><small>Receita</small><b>R$ 1,24M</b><em>↑ 18%</em></div>
              <div><small>Resultado</small><b>R$ 384K</b><em>↑ 12%</em></div>
              <div><small>Margem</small><b>31,0%</b><em>↑ 4%</em></div>
            </div>
            <div className="mock-chart">
              {[38, 62, 46, 78, 69, 92, 84].map((height, index) => (
                <i key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="credentials section">
        <p>COMPETÊNCIA TÉCNICA VALIDADA</p>
        <div>
          <strong>Microsoft Certified</strong>
          <span>Azure Data Engineer Associate • DP-203</span>
        </div>
        <div>
          <strong>Microsoft Certified</strong>
          <span>Data Analyst Associate • DA-100</span>
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-pixels" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <p className="section-kicker light">Próximo passo</p>
        <h2>Vamos transformar dados<br />em vantagem competitiva?</h2>
        <p>Conte seu desafio. A Integra conecta a solução certa ao seu negócio.</p>
        <div className="contact-actions">
          <a className="btn btn-white" href={whatsapp} target="_blank" rel="noreferrer">
            Chamar no WhatsApp <b>↗</b>
          </a>
          <a className="btn btn-outline" href={email}>Enviar e-mail <b>→</b></a>
        </div>
      </section>

      <footer>
        <img src="/logo-integra-nitida.png" alt="Integra Consultora" />
        <div>
          <a href="mailto:consultoria@integraconsultora.com.br">consultoria@integraconsultora.com.br</a>
          <a href={whatsapp} target="_blank" rel="noreferrer">+55 43 99154-4867</a>
        </div>
        <p>© {new Date().getFullYear()} Integra Consultora</p>
      </footer>

      <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp">
        <span>WA</span>
      </a>
    </main>
  );
}
