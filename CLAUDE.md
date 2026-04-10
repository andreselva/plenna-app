# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
# Desenvolvimento local
npm run dev          # Inicia o servidor Vite na porta 3000

# Desenvolvimento via Docker
docker-compose up    # Executa o frontend em container, proxy para API em localhost:8001

# Build
npm run build        # Build de produção via Vite

# Tipos de CSS (após modificar arquivos .module.css)
npm run tcm          # Regenera arquivos .d.ts via typed-css-modules
```

Testes não estão configurados (`npm test` encerra com erro). Não há script de lint; a configuração do ESLint está embutida no `package.json`.

A aplicação espera uma API backend. Defina `VITE_API_URL` em um arquivo `.env` (padrão: `http://localhost:8001`).

## Arquitetura

**Stack:** React 19, React Router v7, Vite, Bootstrap 5, Axios, Chart.js, ícones Lucide React. Mistura de arquivos `.jsx` e `.tsx`.

**Ponto de entrada:** `src/index.jsx` envolve a aplicação em dois providers:
1. `AuthProvider` (`src/Auth/Context/AuthContext.tsx`) — gerencia a sessão do usuário via endpoint `/auth`
2. `ModulesProvider` (`src/Modules/Context/ModulesContext.jsx`) — busca `/client-modules` para determinar quais funcionalidades o tenant do usuário autenticado pode acessar

**Roteamento e controle de acesso** (`src/routes/`):
- `appRoutes.jsx` — registro central de rotas; cada rota possui `meta.placements` (`'sidebar'` ou `'settings'`) e `meta.accessPath` usados para verificação de permissão
- `routeAccess.js` — `hasModuleAccess()` percorre a árvore `modulesTree` para determinar se uma rota é acessível; `getSidebarRoutes()` / `getSettingsRoutes()` filtram rotas por placement e acesso
- `PrivateRoute` redireciona usuários não autenticados para `/login`

**Padrão de camadas por funcionalidade** (consistente em todas as features):

```
Página (src/Pages/<Feature>/)
  └── usa Handler (src/Handlers/use<Feature>Handler.jsx)
        └── compõe Hooks (src/Hooks/<Feature>Manager/)
              └── chama API via axiosInstance
        └── usado por Modais (src/Modals/Modal<Feature>/)
        └── renderiza Tabelas (src/Tables/<Feature>Table/)
```

- **Pages** — camada de orquestração; conecta estado e renderiza o layout
- **Handlers** (`src/Handlers/use*Handler.jsx`) — agrega múltiplos hooks de gerenciamento e lógica de formulário em um único objeto passado para páginas e modais
- **Hooks/Managers** (`src/Hooks/*Manager/`) — estado de dados e CRUD para um recurso específico (ex: `useExpenseManager`, `useBankAccounts`)
- **Modals** — interfaces de formulário para criação/edição; recebem props do handler
- **Tables** (`src/Tables/`) — componentes somente de exibição para listagens

**Fluxo de autenticação:** `axiosInstance.ts` intercepta respostas 401, chama `/auth/refresh` uma vez (enfileirando requisições concorrentes) e então repete a requisição original. Em caso de falha no refresh, redireciona para `/login`. Tokens CSRF são lidos de cookies e enviados como headers em todas as requisições mutáveis.

**Funcionalidades controladas por módulo:** Use o hook `useHasModule(moduleName)` ou `useModulesTree()` para renderizar UI condicionalmente com base nos módulos habilitados do tenant. A árvore de módulos é uma estrutura aninhada buscada de `/client-modules`.

**Componentes compartilhados** (`src/Components/`): `Sidebar`, `GenericModal`, `FlexibleTable`, `Filters`, `DatePicker`, `ActionDropdown`, `Loader`, `Skeleton`, `Tooltip`, `ToogleSwitch`.

**Estilos:** Estilos globais em `src/Styles/GlobalStyles.module.css`. CSS modules por componente junto a cada arquivo. Classes utilitárias do Bootstrap utilizadas em toda a aplicação.

## Skills disponíveis

Use os comandos abaixo para criar novas telas seguindo os padrões do projeto:

| Comando | O que faz |
|---------|-----------|
| `/criar-tela <Recurso>` | Cria a tela completa (página + tabela + modal + hook), com instruções passo a passo |
| `/criar-hook <Recurso>` | Cria o hook base de API (`use<Recurso>s`) e o handler de formulário (`use<Recurso>Handler`) |
| `/criar-table <Recurso>` | Cria o componente de tabela com `FlexibleTable`, skeleton e `ActionDropdown` |
| `/criar-modal <Recurso>` | Cria o modal de criação/edição com `GenericModal` |
