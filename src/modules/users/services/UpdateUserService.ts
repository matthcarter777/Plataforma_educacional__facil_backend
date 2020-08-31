import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { getRepository } from 'typeorm';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const findUser = await userRepository.findOne({
      where: { id },
    });

    if (!findUser) {
      throw new AppError('Not users for mustered');
    }

    findUser.name = name;
    findUser.email = email;
    findUser.password = password;

    await userRepository.save(findUser);

    return findUser;
  }
}

export default UpdateUserService;
