import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

// import AppError from '@shared/errors/AppError';
import Document from '@modules/documents/infra/typeorm/entities/Document';
import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';

interface IRequest {
  title: string;
  description: string;
  filename: string;
  friendly_filename: string;
  category: string;
}

@injectable()
class CreateDocumentService {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    title,
    description,
    filename,
    friendly_filename,
    category,
  }: IRequest): Promise<Document> {
    const documentFilename = await this.storageProvider.saveFile(filename);

    const document = await this.documentsRepository.create({
      title,
      description,
      filename: documentFilename,
      friendly_filename,
      category,
    });

    return document;
  }
}

export default CreateDocumentService;
