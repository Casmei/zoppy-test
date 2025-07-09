# Backend - Desafio Técnico | Zoppy

| Pequeno desabafo: Não passei na vaga por não morar em Belo Horizonte.

Este é um projeto backend desenvolvido com [NestJS](https://nestjs.com/) para a Zoppy. O objetivo é demonstrar domínio em arquitetura escalável, boas práticas e tecnologias modernas.

## 📁 Estrutura

O backend está localizado na pasta:

```bash
./backend
```

As camadas estão **desacopladas**, com aplicação de princípios como **inversão de dependência** e **injeção de dependências**. A estrutura facilita manutenção, testes e escalabilidade.

---

## ✨ Funcionalidades

- ✅ Modelos implementados: `Product` e `Order`
- 🔄 Relacionamento N:N com entidade mediadora `OrderItem`
- 📄 Documentação da API disponível via Swagger em `/api/docs`
- ⚡ Cache implementado com Redis
- 🛡️ Limitação de requisições (Rate Limiting)
- 📃 Endpoints com suporte a paginação

---

## 🐳 Serviços em Docker

Os serviços externos necessários (como banco de dados e cache) estão configurados via Docker:

- PostgreSQL (banco de dados)
- Redis (cache)

Para iniciar os serviços:

```bash
cd ./backend
docker-compose up -d
```

---

## 🧪 Como rodar o backend

1. Acesse a pasta do projeto:

```bash
cd ./backend
```

2. Duplique o arquivo `.env.example` como `.env` e configure as variáveis:

```bash
cp .env.example .env
```

3. Instale as dependências:

```bash
pnpm install
```

4. Rode o projeto em modo desenvolvimento:

```bash
pnpm run start:dev
```

---

## 🏁 Observações

- O projeto não está containerizado (não possui Dockerfile).
- Infelizmente não implementei uma cobertura de testes, meu cachorro derrubou meu notebook e o mesmo passou um tempo no técnico (não é meme)
- O Redis é utilizado como cache auxiliar, por exemplo, para melhorar desempenho em listagens.
- A estrutura foi pensada com foco em clareza, manutenibilidade e boas práticas, visando compatibilidade com ambientes de produção.

---

## 🤝 Feito para a Zoppy

Este projeto foi desenvolvido com carinho e atenção aos detalhes como parte de um processo seletivo para a equipe da **Zoppy**. Obrigado pela oportunidade!
