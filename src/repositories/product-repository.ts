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
      ORDER BY id ASC
      LIMIT $1 OFFSET $2
    `;
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM products
    `;
    const values = [limit, offset];

    try {
      const result = await database.query(query, values);

      const countResult = await database.query(countQuery);
      const total = parseInt(countResult.rows[0].total, 10);
      const totalPages = Math.ceil(total / limit);

      return {
        data: result.rows,
        total,
        totalPages,
        currentPage: page,
      };
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

  async findById(id: number) {
    const query = `
      SELECT id, category, name, quantity, unit, checked
      FROM products
      WHERE id = $1
    `;

    try {
      const result = await database.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      throw error;
    }
  }

  async updateChecked(id: number, checked: boolean) {
    const query = `
      UPDATE products
      SET checked = $1
      WHERE id = $2
      RETURNING id, category, name, quantity, unit, checked
    `;

    try {
      const result = await database.query(query, [checked, id]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar campo checked:', error);
      throw error;
    }
  }

  async deleteProduct(id: number) {
    const query = `
      DELETE FROM products
      WHERE id = $1
      RETURNING id, category, name, quantity, unit, checked
    `;

    try {
      const result = await database.query(query, [id]);
      return result.rows[0] || null; // Retorna o produto deletado ou null se não encontrado
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  }
}

export default new ProductRepository();
