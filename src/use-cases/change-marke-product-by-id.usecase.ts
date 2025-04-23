import ProductRepository from '../repositories/product-repository';
import redis from '../config/redis';

class ChangeMarkeProductProductByIdUseCase {
  async execute(id: number, checked: boolean) {
    const updated = await ProductRepository.updateChecked(id, checked);

    if (updated) {
      await redis.set(`products:${id}`, JSON.stringify(updated), 'EX', 60);
      await redis.del('products:all');
    }

    return updated;
  }
}

export default new ChangeMarkeProductProductByIdUseCase();
