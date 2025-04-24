const CACHE_KEY = 'products:all';
const CACHE_TTL = 60; // segundos

import ProductRepository from '../repositories/product-repository';
import redis from '../config/redis';

class ListProductUseCase {
  async execute(page: number, limit: number) {
    const cacheKey = `products:page:${page}:limit:${limit}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const products = await ProductRepository.findAll(page, limit);
    await redis.set(cacheKey, JSON.stringify(products), 'EX', 60); // 60 segundos de cache

    return products;
  }
}

export default new ListProductUseCase();
