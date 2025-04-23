# Explicação do docker-compose.yml

```yaml
version: '3.8'
```

Define a versão do Docker Compose. A versão `3.8` é amplamente compatível com recursos modernos.

---

## Services (Serviços)

### 1. `postgres`

```yaml
postgres:
  image: postgres:15
```

Usa a imagem oficial do PostgreSQL versão 15.

```yaml
container_name: node_boilerplate_postgres
```

Nome do container.

```yaml
environment:
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres
  POSTGRES_DB: node_app
```

Define usuário, senha e nome do banco de dados.

```yaml
ports:
  - '5432:5432'
```

Mapeia a porta 5432 do container para a 5432 da máquina host.

```yaml
volumes:
  - pgdata:/var/lib/postgresql/data
```

Cria um volume persistente para armazenar os dados do banco.

```yaml
networks:
  - app-network
```

Coloca o container na rede interna `app-network`.

---

### 2. `redis`

```yaml
redis:
  image: redis:7
```

Imagem oficial do Redis versão 7.

```yaml
container_name: node_boilerplate_redis
ports:
  - '6379:6379'
```

Mapeia a porta padrão do Redis.

```yaml
networks:
  - app-network
```

Conecta ao mesmo network dos demais containers.

---

### 3. `app`

```yaml
app:
  build: .
```

Constrói a imagem usando o `Dockerfile` na raiz.

```yaml
container_name: node_boilerplate_app
ports:
  - '3000:3000'
```

Expõe a aplicação na porta 3000.

```yaml
environment:
  DATABASE_URL: postgres://postgres:postgres@postgres:5432/node_app
  REDIS_URL: redis://redis:6379
```

Passa as variáveis de ambiente para conectar com PostgreSQL e Redis.

```yaml
depends_on:
  - postgres
  - redis
```

Garante que PostgreSQL e Redis iniciem antes da aplicação.

```yaml
networks:
  - app-network
```

Conecta à mesma rede dos bancos.

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

Sincroniza os arquivos locais com o container.

```yaml
command: npm run dev
```

Comando para iniciar a aplicação em modo desenvolvimento.

---

## Volumes

```yaml
volumes:
  pgdata:
```

Volume nomeado para armazenar os dados do PostgreSQL.

---

## Networks

```yaml
networks:
  app-network:
    driver: bridge
```

Cria uma rede isolada onde os containers se comunicam entre si pelo nome do serviço (por ex: `postgres`, `redis`).
