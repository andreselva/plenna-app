# Plenna App

> Projeto encerrado — mantido como referência de estudo e portfólio.

Plataforma de gestão financeira para pequenas e médias empresas de serviços. Cobre o ciclo completo: contas a pagar, contas a receber, faturas, cobranças via gateway, transferências entre contas, categorias e relatórios com análise de IA.

---

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 + React Router v7 |
| Build | Vite |
| Estilo | CSS Modules + Bootstrap 5 |
| HTTP | Axios com interceptors de refresh e CSRF |
| Gráficos | Chart.js + react-chartjs-2 |
| Ícones | Lucide React |
| Alertas | SweetAlert2 |
| Deploy | Docker + Nginx |

---

## Arquitetura em camadas

O padrão mais relevante do projeto. Toda feature segue a mesma estrutura com responsabilidades fixas:

```
Page
 └── Handler  (useXxxHandler)
       ├── Hook base  (useXxxs)  ←→  API via axiosInstance
       ├── Modal  (ModalXxx)
       └── Table  (XxxTable)
```

**Hook base** — estado dos dados e CRUD. Sem lógica de formulário. Mutações sempre chamam `refetch`, nunca atualizam o estado local manualmente. Retorna `boolean` (sucesso/falha).

**Handler** — agrega o hook base, centraliza estado do formulário, validação e ações de UI. Sem chamadas diretas à API.

**Table** — componente de exibição puro. Recebe callbacks como props, usa `FlexibleTable` e `ActionDropdown` de forma padronizada, exibe skeleton enquanto carrega.

**Modal** — formulário construído sobre o `GenericModal`. Recebe estado e handlers do pai.

**Page** — orquestração. Conecta as peças. Sem lógica de negócio.

A consistência desse padrão em todas as features é o que torna o projeto interessante como estudo — não é uma convenção acidental, é uma decisão aplicada deliberadamente.

---

## Controle de acesso por módulos

Cada tenant acessa apenas os módulos contratados. A sidebar e as rotas protegidas são geradas dinamicamente a partir da árvore de módulos retornada por `/client-modules` — sem hardcode de permissões.

```
AuthProvider
 └── ModulesProvider  (busca /client-modules)
       └── Router
             └── PrivateRoute  →  hasModuleAccess(modulesTree, accessPath)
```

---

## Autenticação

O `axiosInstance` gerencia o ciclo completo de sessão sem que os componentes precisem saber disso:

- Injeta `X-CSRF-Token` em todas as requisições mutáveis, lendo do cookie.
- Ao receber 401, suspende a fila de requisições, chama `/auth/refresh` uma única vez e reexecuta tudo que estava pendente.
- Um `refreshInstance` separado evita recursão infinita.
- Em caso de falha no refresh, redireciona para `/login`.

---

## Componentes notáveis

`GenericModal` — dirigido por configuração. Recebe um array `formFields` e renderiza inputs, selects e toggles sem que os modais de feature precisem conhecer a estrutura do formulário.

`FlexibleTable` — aceita colunas com `accessor` simples ou `renderCell` customizado, sem opinião sobre layout.

`ActionDropdown` — dropdown contextual com fechamento automático, ações desabilitadas e divisores.

`DeleteConfirmation` — HOF que envolve qualquer `onDelete` com confirmação via SweetAlert2, mantendo as tabelas limpas de lógica de UI.

---

## Módulos implementados

| Módulo | Destaque |
|---|---|
| Contas a pagar | Parcelamento fixo/variável, vínculo a faturas, registro e estorno de pagamentos |
| Contas a receber | Vínculo a clientes e formas de pagamento, geração de cobranças |
| Faturas | Fechamento de fatura de cartão com gestão de despesas vinculadas |
| Cobranças | Ciclo de vida via gateway (rascunho → processando → paga/cancelada) |
| Transferências | Entre contas bancárias com estorno |
| Categorias | Subcategorias com sidebar de edição inline |
| Clientes | Cadastro com endereço e CPF/CNPJ formatado automaticamente |
| Gateways | Schema de configuração dinâmico por tipo de gateway |
| Formas de pagamento | Ativação/desativação baseada na tabela SEFAZ |
| Relatórios | Resumo financeiro com análise gerada por IA e gráfico de evolução |
| Dashboard | Saldo, top categoria, próximos vencimentos, evolução mensal |

---

## Estrutura de pastas

```
src/
├── api/            # axiosInstance, refreshInstance, CSRF
├── Auth/           # AuthContext, PrivateRoute
├── Components/     # Componentes compartilhados
├── Handlers/       # Handlers de formulário por feature
├── Hooks/          # Hooks de dados por feature
├── Modals/         # Modais por feature
├── Modules/        # ModulesContext
├── Pages/          # Páginas (orquestração)
├── Routes/         # appRoutes + routeAccess
├── Styles/         # GlobalStyles.module.css
├── Tables/         # Tabelas por feature
├── Types/          # Status colors e opções
├── Utils/          # DateUtils, DarkenColor, AuthUtils
└── enum/           # Enums TypeScript compartilhados
```

---

## Scripts

```bash
npm run dev      # servidor Vite na porta 3000
npm run build    # build de produção
npm run tcm      # regenera arquivos .d.ts dos CSS Modules
```

```bash
docker-compose up   # frontend em container, proxy para API em localhost:8001
```

---

## Autor

André — desenvolvedor backend (NestJS/TypeScript), cursando Análise e Desenvolvimento de Sistemas na PUCRS. O Plenna App foi o frontend de suporte ao Plenna API e está preservado aqui como referência arquitetural.