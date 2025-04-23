import express from 'express';
import UserController from '../controllers/user-controller';

const router = express.Router();

// Rota para listar todos os usuários com paginação
router.get('/', UserController.getAll);

// Rota para criar um novo usuário
router.post('/', UserController.create);

export default router;
