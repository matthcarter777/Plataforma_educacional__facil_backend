import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import { getRepository } from 'typeorm';
// import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  reference: string;
}

@injectable()
class ListProfilesService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute(): Promise<Profile[]> {
    const userRepository = getRepository(Profile);

    const allProfiles = await userRepository.find();

    if (!allProfiles) {
      throw new AppError('Not users for mustered');
    }

    return allProfiles;
  }
}

export default ListProfilesService;
