import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';

interface IRequest {
  name: string;
  reference: string;
}

@injectable()
class CreateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ name, reference }: IRequest): Promise<Profile> {
    const checkProfileExists = await this.profilesRepository.findByName(name);

    if (checkProfileExists) {
      throw new AppError('Email address already used');
    }

    const profile = await this.profilesRepository.create({
      name,
      reference,
    });

    return profile;
  }
}

export default CreateProfileService;
