import ProductRepository from '../repositories/product-repository';
import redis from '../config/redis';

class DeleteProductUseCase {
  async execute(id: number) {
    const updated = await ProductRepository.deleteProduct(id);

    const keys = await redis.keys('products:page:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }

    return updated;
  }
}

export default new DeleteProductUseCase();
