import ProductRepository from '../repositories/product-repository';
import redis from '../config/redis';

class ChangeMarkeProductProductByIdUseCase {
  async execute(id: number, checked: boolean) {
    const updated = await ProductRepository.updateChecked(id, checked);

    const keys = await redis.keys('products:page:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }

    return updated;
  }
}

export default new ChangeMarkeProductProductByIdUseCase();
