import { Request, Response } from 'express';

class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = await CreateUserUseCase.execute(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }
}

export default new UserController();
