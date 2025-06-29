import { IProductRepository } from '../core/repositories/product-repository';
import { ICacheProvider } from '../core/providers/cache-service';

export class DeleteProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private cacheProvider: ICacheProvider
  ) {}

  async execute(data:any) {
    const { id } = data;
    const deletedProduct = await this.productRepository.delete(id);
    await this.cacheProvider.invalidateByPattern('products:page:*');
    return deletedProduct;
  }
}