import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import { getRepository } from 'typeorm';

interface IRequest {
  id: string;
  name: string;
  reference: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ id, name, reference }: IRequest): Promise<Profile> {
    const profileRepository = getRepository(Profile);

    const findProfile = await profileRepository.findOne({
      where: { id },
    });

    if (!findProfile) {
      throw new AppError('Not profile for mustered');
    }

    findProfile.name = name;
    findProfile.reference = reference;

    await profileRepository.save(findProfile);

    return findProfile;
  }
}

export default UpdateUserService;
