import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IProfilesRepository {
  //findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<Profile | undefined>;
  findByName(name: string): Promise<Profile | undefined>;
  create(data: ICreateProfileDTO): Promise<Profile>;
  save(user: Profile): Promise<Profile>;
}
