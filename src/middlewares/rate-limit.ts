import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

const redisClient = new Redis(
  process.env.REDIS_URL ?? 'redis://localhost:6379'
);

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10, // número de requisições
  duration: 60, // por 60 segundos por IP
});

const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  rateLimiter
    .consume(req.ip ?? 'unknown')
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({
        message: 'Too many requests. Please try again later.',
      });
    });
};

export default rateLimiterMiddleware;
