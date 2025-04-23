import UserRepository from '../repositories/UserRepository';
import redis from '../config/redis';

class CreateUserUseCase {
  async execute(data: any) {
    // Criação do usuário no banco de dados
    const user = await UserRepository.create(data);

    // Invalidando o cache de usuários
    await redis.del('users:all');

    return user;
  }
}

export default new CreateUserUseCase();
