import ProductRepository from '../repositories/product-repository';
import redis from '../config/redis';

class CreateProductUseCase {
  async execute(data: any) {
    const user = await ProductRepository.create(data);

    //Invalidar cache caso seja criado novo produto
    const keys = await redis.keys('products:page:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }

    return user;
  }
}

export default new CreateProductUseCase();
