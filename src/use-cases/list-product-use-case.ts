const CACHE_KEY = 'products:all';
const CACHE_TTL = 60; // segundos

import ProductRepository from '../repositories/product-repository';
import redis from '../config/redis';

class ListProductUseCase {
  async execute(page: number, limit: number) {
    const cached = await redis.get(CACHE_KEY);
    if (cached) return JSON.parse(cached);

    const users = await ProductRepository.findAll(page, limit);
    await redis.set(CACHE_KEY, JSON.stringify(users), 'EX', CACHE_TTL);

    return users;
  }
}

export default new ListProductUseCase();
