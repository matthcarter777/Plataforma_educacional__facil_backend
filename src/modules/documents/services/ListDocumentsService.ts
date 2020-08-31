import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Document from '@modules/documents/infra/typeorm/entities/Document';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import { getRepository } from 'typeorm';
// import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  reference: string;
}

@injectable()
class ListDocumentsService {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,
  ) {}

  public async execute(): Promise<Document[]> {
    const documentRepository = getRepository(Document);

    const allDocuments = await documentRepository.find();

    if (!allDocuments) {
      throw new AppError('Not documents for mustered');
    }

    return allDocuments;
  }
}

export default ListDocumentsService;
