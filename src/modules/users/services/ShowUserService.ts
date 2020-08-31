import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository } from 'typeorm';

interface IRequest {
  id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    console.log(id);

    const findUser = await userRepository.findOne({
      where: { id },
    });

    if (!findUser) {
      throw new AppError('Not user for mustered');
    }

    return findUser as User;
  }
}

export default ShowUserService;
