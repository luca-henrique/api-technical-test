import { IPagination } from "./pagination";
import { Product } from "../interfaces/product";

export interface IProductRepository {
  findAll(page: number, limit: number): Promise<IPagination>;
  findById(id: number): Promise<Product | null>;
  create(data: Product): Promise<void>;
  toggleProductChecked(id: number, checked: boolean): Promise<void>;
  delete(id: number): Promise<void>;
}