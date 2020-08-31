import { getRepository, Repository } from 'typeorm';

import IDocumentsRepository from '@modules/documents/repositories/IDocumentsRepository';

import ICreateDocumentDTO from '@modules/documents/dtos/ICreateDocumentDTO';

import Document from '@modules/documents/infra/typeorm/entities/Document';

class DocumentsRepository implements IDocumentsRepository {
  private ormRepository: Repository<Document>;

  constructor() {
    this.ormRepository = getRepository(Document);
  }

  public async findById(id: string): Promise<Document | undefined> {
    const document = await this.ormRepository.findOne(id);
    return document;
  }

  public async findByTitle(title: string): Promise<Document | undefined> {
    const document = await this.ormRepository.findOne({ where: { title } });
    return document;
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

  public async create(documentData: ICreateDocumentDTO): Promise<Document> {
    const document = this.ormRepository.create(documentData);
    await this.ormRepository.save(document);

    return document;
  }

  public async save(document: Document): Promise<Document> {
    return this.ormRepository.save(document);
  }
}

export default DocumentsRepository;
