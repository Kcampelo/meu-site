# Integra Consultora

Site institucional da Integra Consultora, desenvolvido em Next.js e preparado
para implantação automática na Vercel.

## Publicação na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new).
2. Conecte sua conta GitHub.
3. Importe o repositório `Kcampelo/meu-site`.
4. Mantenha o preset **Next.js** e a branch de produção **main**.
5. Clique em **Deploy**.

Após a primeira implantação, cada novo push na branch `main` publica uma nova
versão automaticamente.

## Domínio

Adicione `integraconsultora.com.br` e `www.integraconsultora.com.br` em
**Project Settings → Domains**. A Vercel mostrará os registros DNS que devem ser
configurados no painel da GoDaddy.

## Desenvolvimento local

```bash
pnpm install
pnpm dev
```

Para validar a versão de produção:

```bash
pnpm build
```
