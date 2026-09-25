# Financeiro — app instalável

Página que transforma o Web App do Apps Script num app instalável (PWA): ícone próprio, nome, tela cheia e botão **Instalar** no Android e no computador (Chrome/Edge), e **Adicionar à Tela de Início** com o ícone certo no iPhone.

Ela **não tem dados nem regras do sistema**: só abre o link oficial do Web App em tela cheia. Toda atualização publicada no Apps Script aparece no app sozinha, sem reinstalar.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Abre o sistema (link oficial em `URL_SISTEMA`), mostra a abertura enquanto carrega, avisa se estiver sem internet e convida a instalar |
| `manifest.webmanifest` | Nome, cores e ícones do app |
| `sw.js` | Guarda só a "casca" (esta página e os ícones) pra abrir rápido e mostrar o aviso de sem conexão |
| `icones/` | Ícones (logo do app) em todos os tamanhos |

## Publicação

Fica num repositório **público** separado (`SrKcire/financeiro-app`), servido pelo GitHub Pages em
`https://srkcire.github.io/financeiro-app/`. O repositório principal (privado) guarda esta pasta só pra versionar.

Pra atualizar: copie o conteúdo desta pasta pro repositório `financeiro-app` e faça push. Se mudar arquivos da casca, suba a versão em `CACHE` no `sw.js` (ex.: `financeiro-casca-v2`) pra os apps já instalados pegarem a mudança.

## Requisito no Apps Script

O `WebApp.gs` precisa continuar com `setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)` — é o que permite abrir o sistema dentro desta página. Trocar pra `DEFAULT` quebra o app instalado.
