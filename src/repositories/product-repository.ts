import database from '../config/database';

interface Product {
  category: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
}

class ProductRepository {
  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const query = `
      SELECT id, category, name, quantity, unit, checked
      FROM products
      ORDER BY id DESC
      LIMIT $1 OFFSET $2
    `;
    const values = [limit, offset];

    try {
      const result = await database.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw error;
    }
  }

  async create(data: Product) {
    const { category, name, quantity, unit, checked } = data;

    const query = `
      INSERT INTO products (category, name, quantity, unit, checked)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, category, name, quantity, unit, checked
    `;
    const values = [category, name, quantity, unit, checked];

    try {
      const result = await database.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }
}

export default new ProductRepository();
