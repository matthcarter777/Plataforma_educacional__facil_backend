import Document from '@modules/documents/infra/typeorm/entities/Document';
import ICreateDocumentDTO from '@modules/documents/dtos/ICreateDocumentDTO';
// import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IDocumentsRepository {
  // findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<Document | undefined>;
  findByTitle(title: string): Promise<Document | undefined>;
  create(data: ICreateDocumentDTO): Promise<Document>;
  save(user: Document): Promise<Document>;
}
