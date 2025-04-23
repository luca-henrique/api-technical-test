import { NextFunction, Request, Response } from 'express';
import listUsersUseCase from '../use-cases/list-product-use-case';
import createUserCase from '../use-cases/create-product-case';
import changeMarkeProductByIdUsecase from '../use-cases/change-marke-product-by-id.usecase';
import { z } from 'zod';

export const updateCheckedSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number), // vem da URL como string
  body: z.object({
    checked: z.boolean(),
  }),
});
class UserController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1; // Página padrão 1
      const limit = parseInt(req.query.limit as string) || 10; // Limite padrão 10 usuários

      const users = await listUsersUseCase.execute(page, limit);

      res.status(200).json({
        page,
        limit,
        data: users,
      });
    } catch (error) {
      next(error);
      res.status(500).json({ message: 'Erro ao listar usuários', error });
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await createUserCase.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
      res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  }

  async updateChecked(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validated = updateCheckedSchema.parse({
        id: req.params.id,
        body: req.body,
      });

      const product = await changeMarkeProductByIdUsecase.execute(
        validated.id,
        validated.body.checked
      );

      if (!product) {
        res.status(404).json({ message: 'Produto não encontrado.' });
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
      res.status(400).json({
        message: 'Erro de validação.',
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}

export default new UserController();
