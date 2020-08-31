import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import { getRepository } from 'typeorm';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const profileRepository = getRepository(Profile);

    const findProfile = await profileRepository.findOne({
      where: { id },
    });

    if (!findProfile) {
      throw new AppError('Not profile for mustered');
    }

    await profileRepository.remove(findProfile);
  }
}

export default DeleteProfileService;
