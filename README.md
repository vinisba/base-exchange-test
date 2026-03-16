# Base Exchange Test

Uma plataforma de negociação de ativos financeiros que permite criar, visualizar e cancelar ordens de compra e venda com execução automática.

## Tecnologias Utilizadas
- **Framework Web:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Backend API:** [ElysiaJS](https://elysiajs.com/) (integração de tipagem com Eden)
- **Banco de Dados:** PostgreSQL com [Prisma](https://www.prisma.io/)
- **Bibliotecas utilizadas:**
  - [Better-auth](https://www.better-auth.com/)
  - [Zustand](https://zustand-demo.pmnd.rs/)
  - [TanStack Query (react-query)](https://tanstack.com/query/latest)
  - [TanStack Table](https://tanstack.com/table/latest)
  - [Shadcn UI](https://ui.shadcn.com/)
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/)

## Site para preview
- **Site:** [https://base-exchange-test.vercel.app](https://base-exchange-test.vercel.app)
- **Documentação da API:** [https://base-exchange-test.vercel.app/api/openapi](https://base-exchange-test.vercel.app/api/openapi)
- **Usuários para teste:** 
  - E-mail: user1@email.com ou user2@email.com
  - Senha: 12341234

## Como Instalar e Usar o Projeto

### Pré-requisitos

- [Bun](https://bun.sh/) (NodeJS 20+)
- [Docker](https://www.docker.com/) (para o banco de dados)

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

### Testes

Para rodar os testes:

```bash
bun run test
```

Testes e2e com playwright

```bash
bun run test:e2e --project=chromium
```

## Melhorias

- Fila e backgrounds jobs para processar a execução da ordens de forma assíncrona
- Testes unitários para API

## Contribuição

> This is a challenge by [Coodesh](https://coodesh.com/)
