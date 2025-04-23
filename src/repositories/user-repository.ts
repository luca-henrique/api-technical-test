import database from '../config/database';

interface User {
  name: string;
  email: string;
  password: string;
}

class UserRepository {
  // Método para criar um novo usuário
  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    // SQL para buscar usuários com paginação
    const query = `
      SELECT id, name, email, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const values = [limit, offset];

    try {
      const result = await database.query(query, values);
      return result.rows; // Retorna os usuários encontrados
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  }
}

export default new UserRepository();
