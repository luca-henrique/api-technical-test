import UserRepository from '../repositories/user-repository';

import redis from '../config/redis';

const CACHE_KEY = 'users:all';
const CACHE_TTL = 60; // segundos

const execute = async () => {
  const cached = await redis.get(CACHE_KEY);
  if (cached) return JSON.parse(cached);

  const users = await UserRepository.findAll();
  await redis.set(CACHE_KEY, JSON.stringify(users), 'EX', CACHE_TTL);

  return users;
};

export default { execute };
