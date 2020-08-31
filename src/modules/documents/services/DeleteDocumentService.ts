import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Document from '@modules/documents/infra/typeorm/entities/Document';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import { getRepository } from 'typeorm';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProfileService {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const documentRepository = getRepository(Document);

    const findDocument = await documentRepository.findOne({
      where: { id },
    });

    if (!findDocument) {
      throw new AppError('Not profile for mustered');
    }

    await documentRepository.remove(findDocument);
  }
}

export default DeleteProfileService;
