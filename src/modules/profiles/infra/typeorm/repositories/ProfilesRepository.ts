import { getRepository, Repository } from 'typeorm';

import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';

import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';

import Profile from '@modules/profiles/infra/typeorm/entities/Profile';

class ProfilesRepository implements IProfilesRepository {
  private ormRepository: Repository<Profile>;

  constructor() {
    this.ormRepository = getRepository(Profile);
  }

  public async findById(id: string): Promise<Profile | undefined> {
    const profile = await this.ormRepository.findOne(id);
    return profile;
  }

  public async findByName(name: string): Promise<Profile | undefined> {
    const profile = await this.ormRepository.findOne({ where: { name } });
    return profile;
  }

  /*
  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[] = [];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: { id: Not(except_user_id) },
      });

      return users;
    }

    users = await this.ormRepository.find();

    return users;
  } */

  public async create(profileData: ICreateProfileDTO): Promise<Profile> {
    const profile = this.ormRepository.create(profileData);
    await this.ormRepository.save(profile);

    return profile;
  }

  public async save(profile: Profile): Promise<Profile> {
    return this.ormRepository.save(profile);
  }
}

export default ProfilesRepository;
