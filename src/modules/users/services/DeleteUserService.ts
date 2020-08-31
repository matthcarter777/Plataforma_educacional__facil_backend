import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository } from 'typeorm';

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getRepository(User);

    const findUser = await userRepository.findOne({
      where: { id },
    });

    if (!findUser) {
      throw new AppError('Not users for mustered');
    }

    await userRepository.remove(findUser);
  }
}

export default DeleteUserService;
