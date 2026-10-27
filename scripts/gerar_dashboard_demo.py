"""Dashboard de vendas de DEMONSTRAÇÃO (dados 100% fictícios) no estilo Power BI.

Gera duas páginas 1600x900 (PNG) para o portfólio da Integra Consultora.
Uso: python3 demo_dashboard.py <pasta_saida>
"""
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyBboxPatch

OUT = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
OUT.mkdir(parents=True, exist_ok=True)

# Paleta Integra 2026
MIDNIGHT, VIOLET, VIOLET_SOFT = "#011237", "#7c6cff", "#b3a8ff"
AMBER, AQUA, INK, MUTED = "#ffb547", "#2fd4c4", "#0b1330", "#5b6480"
PAPER, LINE, WHITE = "#f6f4ef", "#e2ddd2", "#ffffff"

plt.rcParams.update({
    "font.family": "DejaVu Sans",
    "font.size": 10,
    "axes.edgecolor": LINE,
    "axes.labelcolor": MUTED,
    "xtick.color": MUTED,
    "ytick.color": MUTED,
    "axes.spines.top": False,
    "axes.spines.right": False,
})

rng = np.random.default_rng(42)
MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"]


def brl(v, casas=0):
    s = f"{v:,.{casas}f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"R$ {s}"


def mi(v):
    return f"R$ {v / 1e6:.2f} mi".replace(".", ",")


def k(v):
    return f"{v / 1e3:.0f} mil"


def page(title, subtitle, active):
    fig = plt.figure(figsize=(16, 9), dpi=100, facecolor=PAPER)
    # Cabeçalho
    hdr = fig.add_axes([0, 0.905, 1, 0.095])
    hdr.set_axis_off()
    hdr.add_patch(plt.Rectangle((0, 0), 1, 1, color=MIDNIGHT, transform=hdr.transAxes))
    hdr.text(0.018, 0.58, title, color=WHITE, fontsize=19, fontweight="bold", va="center")
    hdr.text(0.018, 0.22, subtitle, color="#aab4d6", fontsize=10.5, va="center")
    # Abas (páginas do relatório)
    x = 0.50
    for name in ["Visão Geral", "Clientes & Produtos"]:
        on = name == active
        hdr.add_patch(plt.Rectangle((x, 0.28), 0.13, 0.44, transform=hdr.transAxes,
                                    facecolor=VIOLET if on else "#0a1c4a", edgecolor="none"))
        hdr.text(x + 0.065, 0.5, name, color=WHITE if on else "#aab4d6", fontsize=10.5,
                 ha="center", va="center", fontweight="bold" if on else "normal")
        x += 0.14
    hdr.add_patch(plt.Rectangle((0.808, 0.28), 0.175, 0.44, transform=hdr.transAxes,
                                facecolor=AMBER, edgecolor="none"))
    hdr.text(0.8955, 0.5, "DEMONSTRAÇÃO · DADOS FICTÍCIOS", color=INK, fontsize=9,
             ha="center", va="center", fontweight="bold")
    return fig


def card(fig, rect, title=None):
    """Card branco com borda; devolve eixos internos para o visual."""
    bg = fig.add_axes(rect)
    bg.set_axis_off()
    bg.add_patch(FancyBboxPatch((0, 0), 1, 1, boxstyle="round,pad=0,rounding_size=0.025",
                                transform=bg.transAxes, mutation_aspect=rect[2] / rect[3] * 16 / 9,
                                facecolor=WHITE, edgecolor=LINE, linewidth=1))
    if title:
        bg.text(0.03, 0.93, title, transform=bg.transAxes, fontsize=11.5, fontweight="bold",
                color=INK, va="top")
    return bg


def kpi(fig, rect, label, value, delta, up=True):
    bg = card(fig, rect)
    bg.text(0.07, 0.74, label.upper(), transform=bg.transAxes, fontsize=9, color=MUTED, va="center")
    bg.text(0.07, 0.42, value, transform=bg.transAxes, fontsize=24, fontweight="bold", color=INK, va="center")
    bg.text(0.07, 0.14, ("▲ " if up else "▼ ") + delta, transform=bg.transAxes, fontsize=9.5,
            color="#12a594" if up else "#e5484d", va="center", fontweight="bold")
    bg.add_patch(plt.Rectangle((0, 0.12), 0.012, 0.76, color=VIOLET, transform=bg.transAxes))


# ---------------- Dados fictícios ----------------
base = np.array([440, 465, 510, 495, 530, 548, 572, 590, 612]) * 1e3
fat_2026 = base * rng.uniform(0.97, 1.03, 9)
fat_2025 = fat_2026 / rng.uniform(1.08, 1.16, 9)
meta = base * 1.02

produtos = ["Café Torrado 500g", "Arroz Tipo 1 5kg", "Óleo de Soja 900ml", "Açúcar Cristal 5kg",
            "Feijão Carioca 1kg", "Leite UHT 1L", "Farinha de Trigo 1kg", "Macarrão Espaguete"]
fat_prod = np.sort(rng.uniform(180, 760, len(produtos)) * 1e3)[::-1]

canais = ["Representantes", "E-commerce", "Televendas"]
canal_share = np.array([0.56, 0.27, 0.17])

regioes = ["Sul", "Sudeste", "Centro-Oeste", "Nordeste", "Norte"]
fat_reg = np.array([1.94, 1.62, 0.71, 0.41, 0.14]) * 1e6

total = fat_2026.sum()
pedidos = 3214

# ---------------- Página 1: Visão Geral ----------------
fig = page("Painel de Vendas", "Distribuidora Exemplo  ·  Jan a Set 2026  ·  atualizado diariamente às 06h",
           "Visão Geral")
M, G = 0.018, 0.012
w4 = (1 - 2 * M - 3 * G) / 4
kpis = [
    ("Faturamento", mi(total), "12,4% vs 2025", True),
    ("Pedidos", f"{pedidos:,}".replace(",", "."), "8,1% vs 2025", True),
    ("Ticket médio", brl(total / pedidos), "4,0% vs 2025", True),
    ("Clientes ativos", "412", "3,2% vs 2025", False),
]
for i, (lab, val, d, up) in enumerate(kpis):
    kpi(fig, [M + i * (w4 + G), 0.745, w4, 0.14], lab, val, d, up)

# Faturamento mensal
r = [M, 0.385, 0.6, 0.345]
card(fig, r, "Faturamento mensal  ·  2026 x 2025 x meta")
ax = fig.add_axes([r[0] + 0.045, r[1] + 0.045, r[2] - 0.065, r[3] - 0.105])
x = np.arange(9)
ax.bar(x, fat_2026 / 1e3, width=0.58, color=VIOLET, label="2026", zorder=2)
ax.plot(x, fat_2025 / 1e3, color=AQUA, lw=2.4, marker="o", ms=5, label="2025", zorder=3)
ax.plot(x, meta / 1e3, color=AMBER, lw=2, ls="--", label="Meta", zorder=3)
ax.set_xticks(x, MESES)
ax.set_ylabel("R$ mil")
ax.grid(axis="y", color="#efebe3", zorder=0)
ax.set_ylim(0, 720)
ax.legend(loc="upper left", frameon=False, ncol=3, fontsize=9.5)
for xi, v in zip(x, fat_2026):
    ax.text(xi, v / 1e3 + 12, f"{v / 1e3:.0f}", ha="center", fontsize=8.5, color=INK)

# Canal (donut)
r = [M + 0.6 + G, 0.385, 1 - 2 * M - 0.6 - G, 0.345]
card(fig, r, "Faturamento por canal")
ax = fig.add_axes([r[0] + 0.01, r[1] + 0.02, 0.17, r[3] - 0.08])
ax.pie(canal_share, colors=[VIOLET, AQUA, AMBER], startangle=90, counterclock=False,
       wedgeprops=dict(width=0.34, edgecolor=WHITE, linewidth=2))
ax.text(0, 0.06, mi(total).replace(" mi", ""), ha="center", fontsize=12, fontweight="bold", color=INK)
ax.text(0, -0.16, "milhões", ha="center", fontsize=8.5, color=MUTED)
ax.set_aspect("equal")
lg = fig.add_axes([r[0] + 0.19, r[1] + 0.05, r[2] - 0.2, r[3] - 0.13])
lg.set_axis_off()
for i, (c, s, col) in enumerate(zip(canais, canal_share, [VIOLET, AQUA, AMBER])):
    y = 0.8 - i * 0.32
    lg.add_patch(plt.Rectangle((0, y - 0.04), 0.06, 0.08, color=col))
    lg.text(0.1, y + 0.05, c, fontsize=10, color=INK, va="center")
    lg.text(0.1, y - 0.1, f"{s * 100:.0f}%  ·  {mi(total * s)}", fontsize=9, color=MUTED, va="center")

# Top produtos
r = [M, 0.025, 0.5, 0.345]
card(fig, r, "Top 8 produtos por faturamento")
ax = fig.add_axes([r[0] + 0.13, r[1] + 0.03, r[2] - 0.17, r[3] - 0.09])
y = np.arange(len(produtos))[::-1]
ax.barh(y, fat_prod / 1e3, color=[VIOLET] * 3 + [VIOLET_SOFT] * 5, height=0.62, zorder=2)
ax.set_yticks(y, produtos, fontsize=9.5, color=INK)
ax.tick_params(axis="y", length=0)
ax.set_xticks([])
ax.spines["bottom"].set_visible(False)
ax.spines["left"].set_visible(False)
for yi, v in zip(y, fat_prod):
    ax.text(v / 1e3 + 8, yi, k(v), va="center", fontsize=9, color=INK)
ax.set_xlim(0, fat_prod.max() / 1e3 * 1.18)

# Região
r = [M + 0.5 + G, 0.025, 1 - 2 * M - 0.5 - G, 0.345]
card(fig, r, "Faturamento por região")
ax = fig.add_axes([r[0] + 0.04, r[1] + 0.045, r[2] - 0.06, r[3] - 0.11])
xr = np.arange(len(regioes))
ax.bar(xr, fat_reg / 1e6, color=[VIOLET, VIOLET, VIOLET_SOFT, VIOLET_SOFT, VIOLET_SOFT], width=0.55, zorder=2)
ax.set_xticks(xr, regioes, color=INK)
ax.set_yticks([])
ax.spines["left"].set_visible(False)
for xi, v in zip(xr, fat_reg):
    ax.text(xi, v / 1e6 + 0.04, f"{v / total * 100:.0f}%", ha="center", fontsize=10, fontweight="bold", color=INK)
ax.set_ylim(0, fat_reg.max() / 1e6 * 1.2)

fig.savefig(OUT / "dash-01.png", facecolor=PAPER)
plt.close(fig)

# ---------------- Página 2: Clientes & Produtos ----------------
fig = page("Painel de Vendas", "Distribuidora Exemplo  ·  Curva ABC, reativação e mix de produtos",
           "Clientes & Produtos")
n = 412
rank = np.arange(1, n + 1)
vals = np.sort(np.random.default_rng(7).lognormal(0, 2.0, n))[::-1]  # ~20% dos clientes = 80% da receita
vals = vals / vals.sum() * total
acum = np.cumsum(vals) / total * 100
pct = rank / n * 100
cut_a = int(np.searchsorted(acum, 80)) + 1   # nº de clientes curva A
cut_b = int(np.searchsorted(acum, 95)) + 1
kpis = [
    ("Clientes curva A", str(cut_a), f"{cut_a / n * 100:.0f}% da base · 80% do faturamento".replace(".", ","), True),
    ("Sem compra há 90+ dias", "47", "R$ 386 mil em potencial", False),
    ("Reativados no trimestre", "19", "R$ 142 mil recuperados", True),
    ("Mix médio por cliente", "7,4 itens", "0,6 item vs 2025", True),
]
for i, (lab, val, d, up) in enumerate(kpis):
    kpi(fig, [M + i * (w4 + G), 0.745, w4, 0.14], lab, val, d, up)

# Curva ABC (Pareto)
r = [M, 0.025, 0.6, 0.705]
card(fig, r, f"Curva ABC de clientes  ·  {n} clientes ativos")
ax = fig.add_axes([r[0] + 0.045, r[1] + 0.06, r[2] - 0.085, r[3] - 0.13])
ax.fill_between(pct, acum, color=VIOLET, alpha=0.10, zorder=1)
ax.plot(pct, acum, color=VIOLET, lw=2.6, zorder=3)
xa, xb = pct[cut_a - 1], pct[cut_b - 1]
for lim, col in [(xa, VIOLET), (xb, AQUA)]:
    ax.axvline(lim, color=col, ls="--", lw=1.4, zorder=2)
ax.axhline(80, color=LINE, lw=1)
ax.axhline(95, color=LINE, lw=1)
ax.text(xa / 2, 40, "A", fontsize=30, fontweight="bold", color=VIOLET, ha="center", alpha=0.85)
ax.text((xa + xb) / 2, 40, "B", fontsize=30, fontweight="bold", color=AQUA, ha="center", alpha=0.85)
ax.text((xb + 100) / 2, 40, "C", fontsize=30, fontweight="bold", color=AMBER, ha="center", alpha=0.95)
ax.set_xlim(0, 100)
ax.set_ylim(0, 102)
ax.set_xlabel("% dos clientes")
ax.set_ylabel("% do faturamento acumulado")
ax.grid(color="#efebe3", zorder=0)

# Reativação (tabela)
r = [M + 0.6 + G, 0.025, 1 - 2 * M - 0.6 - G, 0.705]
card(fig, r, "Prioridade de reativação  ·  sem compra há 90+ dias")
tb = fig.add_axes([r[0] + 0.012, r[1] + 0.03, r[2] - 0.024, r[3] - 0.1])
tb.set_axis_off()
cols = [("Cliente", 0.0), ("Últ. compra", 0.42), ("Ticket médio", 0.64), ("Curva", 0.9)]
for c, cx in cols:
    tb.text(cx, 0.97, c, fontsize=9, color=MUTED, fontweight="bold", va="center")
nomes = ["Mercado Bom Preço", "Supermercado Aurora", "Empório Central", "Atacarejo Pinhal",
         "Padaria Pão Dourado", "Restaurante Sabor da Serra", "Mercearia Vila Nova", "Hotel Recanto Azul",
         "Lanchonete Ponto Certo", "Cantina Bella Vita"]
dias = np.sort(rng.integers(92, 240, len(nomes)))
tick = np.sort(rng.uniform(2.1, 14.8, len(nomes)) * 1e3)[::-1]
curva = ["A", "A", "A", "B", "A", "B", "B", "C", "B", "C"]
cor = {"A": VIOLET, "B": AQUA, "C": AMBER}
for i, (nm, d, t, cv) in enumerate(zip(nomes, dias, tick, curva)):
    yy = 0.88 - i * 0.087
    if i % 2 == 0:
        tb.add_patch(plt.Rectangle((-0.01, yy - 0.04), 1.02, 0.08, color=PAPER, zorder=0))
    tb.text(0.0, yy, nm, fontsize=9.5, color=INK, va="center")
    tb.text(0.42, yy, f"há {d} dias", fontsize=9.5, color="#e5484d" if d > 180 else INK, va="center")
    tb.text(0.64, yy, brl(t), fontsize=9.5, color=INK, va="center")
    tb.add_patch(FancyBboxPatch((0.9, yy - 0.025), 0.07, 0.05, boxstyle="round,pad=0,rounding_size=0.02",
                                facecolor=cor[cv], edgecolor="none", mutation_aspect=0.5))
    tb.text(0.935, yy, cv, fontsize=9, color=WHITE if cv != "C" else INK, fontweight="bold",
            ha="center", va="center")
tb.set_xlim(0, 1)
tb.set_ylim(0, 1)

fig.savefig(OUT / "dash-02.png", facecolor=PAPER)
plt.close(fig)
print("ok", OUT)
