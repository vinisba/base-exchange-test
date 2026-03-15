# Base Exchange Test

Uma plataforma de negociação de ativos financeiros que permite criar, visualizar e cancelar ordens de compra e venda com execução automática.

Este é um projeto de demonstração desenvolvido como parte de um desafio técnico.

## Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Framework Web:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Backend API:** [ElysiaJS](https://elysiajs.com/) (integrado via Eden Treaty)
- **Banco de Dados & ORM:** PostgreSQL com [Prisma](https://www.prisma.io/)
- **Autenticação:** [Better-auth](https://www.better-auth.com/)
- **Gerenciamento de Estado:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Tabelas:** [TanStack Table](https://tanstack.com/table/latest)
- **Estilização:** Tailwind CSS & [Shadcn UI](https://ui.shadcn.com/)
- **Formulários:** React Hook Form & Zod
- **Ferramentas de Desenvolvimento:** Biome (Linting & Formatting), Docker (PostgreSQL)

## Como Instalar e Usar o Projeto

### Pré-requisitos

- [Bun](https://bun.sh/) instalado
- [Docker](https://www.docker.com/) instalado (para o banco de dados)

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd base-exchange-test
   ```

2. Instale as dependências:
   ```bash
   bun install
   ```

3. Configure o ambiente:
   Crie um arquivo `.env` na raiz do projeto com as credenciais do banco de dados e URLs necessárias (use um arquivo `.env.example` se disponível como base).

4. Suba o banco de dados com Docker:
   ```bash
   docker compose up -d
   ```

5. Execute as migrações do Prisma:
   ```bash
   bun prisma migrate dev
   ```

6. Gere o client do Prisma e os modelos Prismabox:
   ```bash
   bun prisma generate
   ```

### Uso

Para rodar o projeto em modo de desenvolvimento:

```bash
bun dev
```

O projeto estará disponível em `http://localhost:3000`.

## Contribuição

> This is a challenge by [Coodesh](https://coodesh.com/)
