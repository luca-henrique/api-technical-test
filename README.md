# 🚀 API de Lista de Produtos com Node.js, PostgreSQL, Redis e TypeScript

Este projeto é uma API para gerenciar uma lista de produtos, construída com Node.js, PostgreSQL, Redis e TypeScript. Ele inclui funcionalidades como cache, controle de requisições (rate limiting) e boas práticas para produção.

---

## 🧱 Tecnologias Utilizadas

- **Node.js + Express**
- **PostgreSQL** (SQL puro via `pg`)
- **Redis** (`ioredis`)
- **TypeScript**
- **Rate Limiting** com `rate-limiter-flexible`
- **Cache** com Redis
- **Zod** para validação de dados
- **Docker Compose** para PostgreSQL e Redis
- **.env** para variáveis de ambiente

---

## 📦 Instalação

### 1. Clonar o repositório e instalar dependências

```bash
git clone <repo>
cd <projeto>
npm install
cp .env.example .env
```

### 2. Configurar o ambiente

Edite o arquivo `.env` com as configurações do banco de dados e Redis.

### 3. Rodar com Docker (PostgreSQL + Redis)

```bash
docker-compose up -d
```

---

## 📁 Estrutura do Projeto

```
src/
├── config/
│   ├── database.ts         # Configuração do banco de dados PostgreSQL
│   ├── init-db.ts          # Criação automática da tabela de produtos
│   └── redis.ts            # Configuração do Redis
├── controllers/
│   └── product-controller.ts # Controlador de produtos
├── middlewares/
│   ├── error-handle.ts     # Middleware de tratamento de erros
│   └── rate-limit.ts       # Middleware de rate limiting
├── repositories/
│   └── product-repository.ts # Repositório de produtos
├── routes/
│   └── product-routes.ts   # Rotas de produtos
├── use-cases/
│   ├── create-product-case.ts # Caso de uso para criar produtos
│   ├── list-product-use-case.ts # Caso de uso para listar produtos
│   └── change-marke-product-by-id.usecase.ts # Caso de uso para atualizar o campo "checked"
├── app.ts                  # Configuração principal do app
└── server.ts               # Inicialização do servidor
```

---

## 🧪 Funcionalidades

### ✅ Criar Produto

```http
POST /product
Content-Type: application/json

{
  "category": "Alimentos",
  "name": "Arroz",
  "quantity": 2,
  "unit": "kg",
  "checked": false
}
```

- Grava o produto no banco de dados.
- Após criação, o cache da listagem é invalidado.

---

### ✅ Listar Produtos (com paginação e cache)

```http
GET /product?page=1&limit=10
```

- Os resultados são cacheados no Redis por 60 segundos.
- Reduz chamadas ao banco de dados.

---

### ✅ Atualizar o campo "checked" de um Produto

```http
PATCH /product/:id/checked
Content-Type: application/json

{
  "checked": true
}
```

- Atualiza o campo `checked` de um produto específico.
- Após atualização, o cache da listagem é invalidado.

---

## 🛡️ Rate Limiting

- Implementado com `rate-limiter-flexible` usando Redis.
- Limite de 10 requisições por IP a cada 60 segundos.
- Configurado globalmente ou por rota.

---

## 🐘 PostgreSQL – Criação automática da tabela

Na inicialização do projeto, o arquivo `init-db.ts` cria a tabela `products` se ela não existir:

```sql
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  unit VARCHAR(50) NOT NULL,
  checked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🐳 Docker Compose

O projeto inclui um arquivo `docker-compose.yml` para configurar PostgreSQL e Redis. Para iniciar os serviços:

```bash
docker-compose up -d
```

---

## 🧠 Variáveis de Ambiente (.env)

Exemplo de configuração no arquivo `.env`:

```env
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=root
PG_DATABASE=shoppingmarketlist

PORT=3001

REDIS_URL=redis://localhost:6379
```

---

## ✅ Como Rodar

### 1. Rodar em desenvolvimento

```bash
npm run dev
```

### 2. Compilar para produção

```bash
npm run build
```

### 3. Rodar em produção

```bash
npm start
```

---

## 🧠 Cache com Redis

- Implementado cache no endpoint de listagem de produtos com TTL de 60 segundos.
- Após criação/atualização de produto, o cache é invalidado com `redis.del`.

---

## 🛠️ Testes e Monitoramento

- Estrutura preparada para integração com ferramentas de monitoramento como Grafana e Prometheus.
- Testes podem ser adicionados com bibliotecas como Jest ou Mocha.

---

Feito com 💻 + ☕ por Lucas Paes.
