import ProductRepository from '../repositories/product-repository';
import redis from '../config/redis';

class CreateProductUseCase {
  async execute(data: any) {
    const user = await ProductRepository.create(data);

    //Invalidar cache caso seja criado novo produto
    await redis.del('users:all');

    return user;
  }
}

export default new CreateProductUseCase();
