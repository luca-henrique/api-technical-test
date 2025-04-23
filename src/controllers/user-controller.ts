import { Request, Response, NextFunction } from 'express';
import ListUsersUseCase from '../useCases/list-users-use-case';

const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await ListUsersUseCase.execute();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export default { getAll };
