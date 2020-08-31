import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDocumentService from '@modules/documents/services/CreateDocumentService';
import ListDocumentsService from '@modules/documents/services/ListDocumentsService';
import ShowDocumentService from '@modules/documents/services/ShowDocumentService';
import DeleteDocumentService from '@modules/documents/services/DeleteDocumentService';
import UpdateDocumentService from '@modules/documents/services/UpdateDocumentService';

export default class DocumentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const allDocuments = container.resolve(ListDocumentsService);

    const documents = await allDocuments.execute();

    return response.json(documents);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, friendly_filename, category } = request.body;

    const { filename } = request.file;

    const createDocument = container.resolve(CreateDocumentService);

    const document = await createDocument.execute({
      title,
      description,
      filename,
      friendly_filename,
      category,
    });

    return response.json(classToClass(document));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findDocument = container.resolve(ShowDocumentService);

    const document = await findDocument.execute({ id });

    return response.json(classToClass(document));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description, friendly_filename, category } = request.body;
    const { filename } = request.file;

    const updateDocument = container.resolve(UpdateDocumentService);

    const document = await updateDocument.execute({
      id,
      title,
      description,
      filename,
      friendly_filename,
      category,
    });

    return response.json(document);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findDocument = container.resolve(DeleteDocumentService);

    await findDocument.execute({
      id,
    });

    return response.json({ message: 'Profile delteted' });
  }

  /** Index, create, show, update, delete */
}
