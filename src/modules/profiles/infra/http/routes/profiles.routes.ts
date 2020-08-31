import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfilesController from '@modules/profiles/infra/http/controllers/ProfilesController';

const profilesRouter = Router();
const profilesController = new ProfilesController();

profilesRouter.get('/', ensureAuthenticated, profilesController.index);
profilesRouter.get('/:id', ensureAuthenticated, profilesController.show);
profilesRouter.delete('/:id', ensureAuthenticated, profilesController.delete);
profilesRouter.patch('/:id', ensureAuthenticated, profilesController.update);

profilesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      reference: Joi.string().required(),
    },
  }),
  profilesController.create,
);

export default profilesRouter;
