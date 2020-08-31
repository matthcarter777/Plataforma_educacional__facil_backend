import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository } from 'typeorm';
// import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const userRepository = getRepository(User);

    const allUsers = await userRepository.find();

    if (!allUsers) {
      throw new AppError('Not users for mustered');
    }

    return allUsers;
  }
}

export default ListUsersService;
