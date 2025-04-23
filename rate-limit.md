# Explicando o Rate Limiting com Redis

Neste arquivo, explicamos como implementar e o que faz cada parte do rate limiting com `rate-limiter-flexible` e Redis.

---

## 1. Instalação dos pacotes

```bash
npm install rate-limiter-flexible ioredis
```

- `rate-limiter-flexible`: biblioteca flexível para controle de acesso (rate limiting).
- `ioredis`: cliente Redis usado para conectar e armazenar os dados dos limites.

---

## 2. Configuração do middleware `rateLimiter.ts`

### a. Importações

```ts
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
```

Importa os pacotes necessários para conectar ao Redis e controlar as requisições.

### b. Criação do cliente Redis

```ts
const redisClient = new Redis(
  process.env.REDIS_URL || 'redis://localhost:6379'
);
```

Cria uma conexão com o Redis, usando a URL de ambiente ou localhost como fallback.

### c. Instância do `RateLimiterRedis`

```ts
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10,
  duration: 60,
});
```

- `storeClient`: cliente Redis que será usado para armazenar os dados.
- `keyPrefix`: prefixo para as chaves de registro no Redis.
- `points`: quantas requisições são permitidas.
- `duration`: tempo (em segundos) no qual os pontos são contados.

Exemplo: 10 requisições por IP a cada 60 segundos.

### d. Middleware de verificação

```ts
rateLimiter.consume(req.ip);
```

- `consume`: tenta consumir 1 ponto baseado no IP da requisição.
- Se tiver pontos disponíveis, chama o `next()`.
- Se não tiver (excedeu o limite), retorna erro 429.

---

## 3. Usando o middleware no app

### Em todas as rotas:

```ts
app.use(rateLimiterMiddleware);
```

Aplica o limite globalmente.

### Em rotas específicas:

```ts
router.get('/', rateLimiterMiddleware, UserController.getAll);
```

Aplica o limite apenas nessa rota.

---

## Benefícios

- Proteção contra DoS/DDoS.
- Controla uso abusivo da API.
- Redis permite armazenar isso de forma distribuída (escala horizontal).

Se precisar, podemos configurar regras diferentes para cada rota ou por token de autenticação também.
