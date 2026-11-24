# EHS-LifeSafety — Sistema de Gestão de Segurança e Ocorrências

O **EHS-LifeSafety** é uma aplicação web *front-end* desenvolvida em **Vue.js 3** para o registro, acompanhamento e análise gerencial de ocorrências de Saúde, Segurança e Meio Ambiente (EHS — *Environment, Health and Safety*).

O sistema foi projetado com layout corporativo orientado para *desktop*, permitindo que colaboradores comuniquem desvios ou quase acidentes de forma ágil, enquanto supervisores e gestores acompanham indicadores dinâmicos em tempo real.

---

## Índice

- [Sobre o Framework (Vue.js 3)](#sobre-o-framework-vuejs-3)
- [Tecnologias e Bibliotecas Utilizadas](#tecnologias-e-bibliotecas-utilizadas)
- [Arquitetura e Estrutura de Pastas](#arquitetura-e-estrutura-de-pastas)
- [Funcionalidades e Fluxo do Sistema](#funcionalidades-e-fluxo-do-sistema)
- [Persistência de Dados e Autenticação](#persistência-de-dados-e-autenticação)
- [Divisão de Atividades da Equipe](#divisão-de-atividades-da-equipe)
- [Como Instalar as Dependências e Subir a Aplicação](#como-instalar-as-dependências-e-subir-a-aplicação)

---

## Sobre o Framework (Vue.js 3)

O **Vue.js 3** é um framework JavaScript progressivo voltado para a construção de interfaces de usuário e aplicações de página única (*Single Page Applications — SPA*). Sua arquitetura baseada em componentes permite dividir a interface em blocos modulares, reutilizáveis e independentes.

Neste projeto, adotamos a **Composition API** com a sintaxe `<script setup>`, que oferece:

- **Reatividade Nativa:** Uso de `ref()` e `computed()` para atualizar gráficos e tabelas instantaneamente na interface sempre que uma nova ocorrência é registrada, sem recarregar a página.
- **Modularidade e Manutenção:** Organização clara da lógica de negócio por funcionalidade, facilitando o desenvolvimento paralelo em equipe no GitHub.
- **Alto Desempenho:** Renderização otimizada por meio do *Virtual DOM*, atualizando apenas os elementos visuais que sofreram alteração de estado.

---

## Tecnologias e Bibliotecas Utilizadas

O projeto foi estruturado utilizando ferramentas modernas do ecossistema Vue, dispensando back-end externo por meio de gerenciamento de estado em sessão:

| Tecnologia / Pacote | Finalidade no Projeto |
| :--- | :--- |
| **Vue.js 3 (`<script setup>`)** | Framework principal para construção reativa das interfaces e componentes. |
| **Vite** | *Bundler* e servidor de desenvolvimento de alta velocidade. |
| **Vue Router (`vue-router`)** | Gerenciamento das 4 rotas da aplicação e *Navigation Guards* para controle de acesso. |
| **Pinia (`pinia`)** | Gerenciamento global de estado (armazenamento de ocorrências, usuários e sessão). |
| **Chart.js + `vue-chartjs`** | Renderização de gráficos interativos (Barras, Pizza e Linha) no painel gerencial. |

---

## Arquitetura e Estrutura de Pastas

A organização do diretório `src/` separa responsabilidades entre gerenciamento de estado, roteamento, telas principais e componentes visuais reutilizáveis:

```text
ehs-lifesafety/
├── index.html                   # Ponto de entrada HTML da aplicação
├── package.json                 # Dependências e scripts do projeto
└── src/
    ├── main.js                  # Inicialização do Vue, Pinia e Vue Router
    ├── App.vue                  # Componente raiz com <router-view /> e estilos globais
    ├── router/
    │   └── index.js             # Definição das rotas e proteção de acesso (/dashboard)
    ├── stores/
    │   └── useEhsStore.js       # Store Pinia com dados mockados, ações e sessionStorage
    ├── views/                   # As 4 telas principais do sistema
    │   ├── LoginView.vue        # Tela 1: Acesso rápido público e login de supervisor
    │   ├── CadastroView.vue     # Tela 2: Solicitação de cadastro de novo supervisor
    │   ├── OcorrenciaView.vue   # Tela 3: Formulário dinâmico de registro de ocorrência
    │   └── DashboardView.vue    # Tela 4: Painel analítico e gerencial (grid 2x2)
    └── components/              # Componentes modulares do Dashboard
        ├── GraficoBarras.vue    # Gráfico de barras (ocorrências mais relatadas por tipo)
        ├── GraficoPizza.vue     # Gráfico de pizza (setores com mais relatos)
        ├── GraficoLinha.vue     # Gráfico de linha (frequência mensal de ocorrências)
        └── TabelaRelatos.vue    # Tabela detalhada com visualização dos registros escritos
```

---

## Funcionalidades e Fluxo do Sistema

O sistema é dividido em 4 telas principais:

### 1. Acesso e Autenticação (`LoginView.vue` — Rota `/`)
- **Acesso Rápido (Público):** Permite que qualquer colaborador acesse imediatamente o formulário de registro de ocorrência sem necessidade de login.
- **Acesso Restrito (Supervisores):** Login com validação de credenciais para acesso ao painel gerencial (`/dashboard`).

### 2. Cadastro de Supervisor (`CadastroView.vue` — Rota `/cadastro`)
- Formulário para criação de credenciais de gestão contendo **Nome Completo**, **Usuário**, **E-mail Corporativo**, **Cargo/Função** e **Senha**.
- Registra o novo usuário na sessão com feedback visual de confirmação e permite login imediato para testes.

### 3. Registro de Ocorrência (`OcorrenciaView.vue` — Rota `/registrar-ocorrencia`)
- Layout web em duas colunas com identificação dos observadores, seleção entre 8 áreas da empresa, nível de severidade (`0` a `4`) e descrição detalhada.
- **Formulário Condicional:** Adapta campos específicos conforme os 4 tipos de relato:
  - Comportamento
  - Condição
  - Dever de Recusa
  - Quase Acidente

### 4. Dashboard Gerencial (`DashboardView.vue` — Rota `/dashboard`)
- Protegido por guarda de rota (`router.beforeEach`), redirecionando usuários não autenticados para `/`.
- Organizado em um **grid 2x2** contendo 3 gráficos dinâmicos (`GraficoBarras`, `GraficoPizza`, `GraficoLinha`) e a tabela consolidada (`TabelaRelatos`), todos atualizados reativamente via propriedades `computed` sempre que uma nova ocorrência é cadastrada.

---

## Persistência de Dados e Autenticação

- **Memória de Sessão (`Pinia` + `sessionStorage`):** O sistema inicia com uma base de dados *mockada* pré-carregada em `useEhsStore.js`. Todas as ocorrências registradas ou supervisores cadastrados durante o uso são salvos automaticamente no `sessionStorage`, sobrevivendo a recarregamentos de página (`F5`) durante a sessão do navegador.
- **Credencial Padrão de Supervisor:**
  - **Usuário:** `admin`
  - **Senha:** `1234`
  *(Também é possível utilizar qualquer conta criada na tela de Cadastro durante a mesma sessão).*

---

## Divisão de Atividades da Equipe

O desenvolvimento foi planejado de forma modular entre os 6 integrantes do grupo, com integração contínua na branch `main`:

- **Integrante 1 — Daniel de Oliveira Silva (`useEhsStore.js`, `router/index.js`, `main.js`, `App.vue`):** Configuração inicial do ambiente Vite + Vue 3, instalação das dependências (Pinia, Vue Router e Chart.js), criação da store com dados *mockados*, regras de autenticação e configuração das rotas.
- **Integrante 2 — Rafael Sportore (`LoginView.vue`):** Desenvolvimento da interface inicial, fluxo de acesso rápido para colaboradores e validação de login para supervisores.
- **Integrante 3 — Gabriel Grandi (`CadastroView.vue`):** Implementação do formulário de registro de novos supervisores, validações de campos e integração com a store.
- **Integrante 4 — Matheus Nogueira (`OcorrenciaView.vue`):** Construção do layout em duas colunas, mapeamento das 8 áreas, escala de severidade (`0` a `4`) e lógica condicional dos 4 tipos de relato.
- **Integrante 5 — Ayslan Souza (`GraficoBarras.vue`, `GraficoPizza.vue`, `GraficoLinha.vue`):** Integração com Chart.js / `vue-chartjs` e criação dos gráficos reativos conectados aos dados da store.
- **Integrante 6 — Bruno Italo (`DashboardView.vue` e `TabelaRelatos.vue`):** Montagem do grid gerencial 2x2, consolidação dos indicadores dinâmicos e tabela detalhada de relatos.

---

## Como Instalar as Dependências e Subir a Aplicação

### Pré-requisitos
- **Node.js** (versão 18 ou superior) e **npm** instalados na máquina.

### Passo a passo

1. **Clone o repositório do GitHub:**
   ```bash
   git clone https://github.com/Danieloliveira19/EHS-LifeSafety.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd EHS-LifeSafety
   ```
   *(Observação: caso o arquivo `package.json` esteja dentro da subpasta interna do repositório, execute `cd ehs-lifesafety` antes do próximo passo).*

3. **Instale todas as dependências do projeto (Vue, Pinia, Vue Router e Chart.js):**
   ```bash
   npm install
   ```

4. **Suba o servidor local de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação no navegador:**
   Abra o endereço local exibido no terminal (por padrão: `http://localhost:5173`).