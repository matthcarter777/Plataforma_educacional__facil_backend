import { Router } from 'express';
import multer from 'multer';
// import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DocumentsController from '@modules/documents/infra/http/controllers/DocumentsController';

const documentsRouter = Router();
const upload = multer(uploadConfig.multer);
const documentsController = new DocumentsController();

documentsRouter.get('/', ensureAuthenticated, documentsController.index);
documentsRouter.get('/:id', ensureAuthenticated, documentsController.show);
documentsRouter.delete('/:id', ensureAuthenticated, documentsController.delete);

documentsRouter.patch(
  '/:id',
  ensureAuthenticated,
  upload.single('filename'),
  documentsController.update,
);

documentsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('filename'),
  documentsController.create,
);

export default documentsRouter;
