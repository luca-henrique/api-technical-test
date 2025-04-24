import { NextFunction, Request, Response } from 'express';
import listUsersUseCase from '../use-cases/list-product-use-case';
import createUserCase from '../use-cases/create-product-case';
import changeMarkeProductByIdUsecase from '../use-cases/change-marke-product-by-id.usecase';
import { updateCheckedSchema } from '../validations/update-checked.schema';
import { createProductSchema } from '../validations/create-product.schema';
import { z } from 'zod';
import { deleteProductValidation } from '../validations/delete-product.schema';
import deleteProductUseCase from '../use-cases/delete-product-use-case';

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const users = await listUsersUseCase.execute(page, limit);

      res.status(200).json({
        ...users,
      });
    } catch (error) {
      next(error);
      res.status(500).json({ message: 'Erro ao listar usuários', error });
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData = createProductSchema.parse(req.body);

      const user = await createUserCase.execute(validatedData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Retorna erros de validação
        res.status(400).json({
          message: 'Erro de validação.',
          errors: error.errors,
        });
      }
      next(error);
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

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validated = deleteProductValidation.parse({
        id: req.params.id,
      });

      const product = await deleteProductUseCase.execute(validated.id);

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
