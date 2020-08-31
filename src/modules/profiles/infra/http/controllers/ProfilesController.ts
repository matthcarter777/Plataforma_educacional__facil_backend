import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProfileService from '@modules/profiles/services/CreateProfileService';
import ListUsersService from '@modules/profiles/services/ListProfilesService';
import ShowProfileService from '@modules/profiles/services/ShowProfileService';
import DeleteProfileService from '@modules/profiles/services/DeleteProfileService';
import UpdateProfileService from '@modules/profiles/services/UpdateProfileService';

export default class ProfilesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const allProfiles = container.resolve(ListUsersService);

    const profiles = await allProfiles.execute();

    return response.json(profiles);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, reference } = request.body;

    const createProfile = container.resolve(CreateProfileService);

    const profile = await createProfile.execute({
      name,
      reference,
    });

    return response.json(classToClass(profile));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findProfile = container.resolve(ShowProfileService);

    const profile = await findProfile.execute({ id });

    return response.json(classToClass(profile));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, reference } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      id,
      name,
      reference,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findProfile = container.resolve(DeleteProfileService);

    await findProfile.execute({
      id,
    });

    return response.json({ message: 'Profile delteted' });
  }

  /** Index, create, show, update, delete */
}
