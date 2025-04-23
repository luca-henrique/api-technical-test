# 🚀 Node.js API Boilerplate com PostgreSQL, Redis, Rate Limiting e Cache

Este projeto é um boilerplate completo com uma estrutura robusta para APIs em Node.js, utilizando PostgreSQL com SQL puro (sem ORM), Redis para cache e controle de requisições (rate limiting), e diversas boas práticas para produção.

---

## 🧱 Tecnologias Utilizadas

- **Node.js + Express**
- **PostgreSQL** (SQL puro via `pg`)
- **Redis** (`ioredis`)
- **TypeScript**
- **Rate Limiting** com `rate-limiter-flexible`
- **Cache** com Redis
- **PM2** para gerenciamento do processo
- **Docker Compose** para PostgreSQL e Redis
- **.env** para variáveis de ambiente

---

## 📦 Instalação

```bash
git clone <repo>
cd <projeto>
npm install
cp .env.example .env
```

### Rodar com Docker (PostgreSQL + Redis)

```bash
docker-compose up -d
```

---

## 📁 Estrutura do Projeto

```
src/
├── config/
│   ├── initDB.ts         # Criação automática da tabela users
│   ├── postgres.ts       # Conexão com PostgreSQL
│   └── redis.ts          # Conexão com Redis
├── middlewares/
│   └── rateLimiter.ts    # Middleware de Rate Limiting
├── useCases/
│   ├── CreateUser.ts     # Criação de usuário
│   ├── ListUsers.ts      # Listagem paginada com cache
│   └── UpdateUser.ts     # Atualização (se aplicável)
├── routes/
│   └── users.routes.ts   # Rotas de usuários
├── index.ts              # Ponto de entrada, inicializa DB e servidor
└── ...
```

---

## 🧪 Funcionalidades

### ✅ Criar Usuário

```http
POST /users
Content-Type: application/json

{
  "name": "João",
  "email": "joao@email.com"
}
```

- Grava direto no PostgreSQL com SQL puro.
- Após criação, o cache da listagem é invalidado.

---

### ✅ Listar Usuários (com paginação e cache)

```http
GET /users?page=1&limit=10
```

- Os resultados são cacheados no Redis por 60 segundos.
- Reduz chamadas ao banco.

---

## 🛡️ Rate Limiting

- Middleware com `rate-limiter-flexible` usando Redis.
- Exemplo: 10 requisições por IP por minuto.
- Configurado globalmente ou por rota.

---

## ⚙️ PM2

Para executar a aplicação em produção:

```bash
pm2 start dist/index.js --name "my-app"
pm2 logs
pm2 restart my-app
```

---

## 📊 Observabilidade (Grafana + Prometheus)

> Em breve – estrutura base preparada para integração com `prom-client` e monitoramento via Grafana/Prometheus.

---

## 🐘 PostgreSQL – Criação automática da tabela

Na inicialização do projeto, o arquivo `initDB.ts` cria a tabela `users` se ela não existir:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📄 .gitignore

```gitignore
node_modules
.env
dist
```

---

## 🐳 docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - '6379:6379'

volumes:
  pgdata:
```

---

## 🧠 Variáveis de Ambiente (.env)

```env
PORT=3000
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DATABASE=app

REDIS_URL=redis://localhost:6379
```

---

## ✅ Como Rodar

```bash
# Instalar dependências
npm install

# Compilar
npm run build

# Rodar com node
npm start
```

Ou com PM2:

```bash
pm2 start dist/index.js --name "api"
```

---

## 🧠 Cache com Redis

- Implementado cache no endpoint de listagem de usuários com TTL de 60s.
- Após criação/atualização de usuário, o cache é invalidado com `redis.del`.

---

## 🧠 Rate Limiting com Redis

- Implementado com `rate-limiter-flexible`.
- 10 requisições por IP a cada 60s.
- Protege contra abuso e DDoS.

---

Feito com 💻 + ☕
