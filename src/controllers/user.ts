import { Request, Response } from 'express';
import UserRepository from '../repositories/product-repository';

class UserController {
  // Método para listar os usuários com paginação
  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1; // Página padrão 1
      const limit = parseInt(req.query.limit as string) || 10; // Limite padrão 10 usuários

      const users = await UserRepository.findAll(page, limit);

      return res.status(200).json({
        page,
        limit,
        data: users,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao listar usuários', error });
    }
  }

  // Método para criar um novo usuário
  async create(req: Request, res: Response) {
    try {
      const user = await UserRepository.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  }
}

export default new UserController();
