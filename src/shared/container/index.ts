import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import ProfilesRepository from '@modules/profiles/infra/typeorm/repositories/ProfilesRepository';

import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import DocumentsRepository from '@modules/documents/infra/typeorm/repositories/DocumentsRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICashFlowEntriesRepository from '@modules/cashFlowEntries/repositories/ICashFlowEntriesRepository';
import CashFlowEntriesRepository from '@modules/cashFlowEntries/infra/typeorm/repositories/CashFlowEntriesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDocumentsRepository>(
  'DocumentsRepository',
  DocumentsRepository,
);

container.registerSingleton<IProfilesRepository>(
  'ProfilesRepository',
  ProfilesRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICashFlowEntriesRepository>(
  'CashFlowEntriesRepository',
  CashFlowEntriesRepository,
);
