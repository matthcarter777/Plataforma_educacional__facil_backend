import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Document from '@modules/documents/infra/typeorm/entities/Document';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { getRepository } from 'typeorm';

interface IRequest {
  id: string;
  title: string;
  description: string;
  filename: string;
  friendly_filename: string;
  category: string;
}

@injectable()
class UpdateDocumentService {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    title,
    description,
    filename,
    friendly_filename,
    category,
  }: IRequest): Promise<Document> {
    const documentRepository = getRepository(Document);

    const findDocument = await documentRepository.findOne({
      where: { id },
    });

    if (!findDocument) {
      throw new AppError('Not profile for mustered');
    }

    if (findDocument.filename) {
      await this.storageProvider.deleteFile(findDocument.filename);
    }

    findDocument.title = title;
    findDocument.description = description;
    findDocument.filename = filename;
    findDocument.friendly_filename = friendly_filename;
    findDocument.category = category;

    await documentRepository.save(findDocument);

    return findDocument;
  }
}

export default UpdateDocumentService;
