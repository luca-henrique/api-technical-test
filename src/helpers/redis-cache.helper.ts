
import redis from '../config/redis';

/**
 * Invalida as chaves do redis que correspondem ao padrão passado.
 */
export const invalidateCacheByPattern = async (pattern: string): Promise<void> => {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};