import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CashFlowEntriesController from '@modules/cashFlowEntries/infra/http/controllers/CashFlowEntriesController';

const cashFlowEntriesRouter = Router();
const cashFlowEntriesController = new CashFlowEntriesController();

cashFlowEntriesRouter.get(
  '/',
  ensureAuthenticated,
  cashFlowEntriesController.index,
);

cashFlowEntriesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      budget_value: Joi.number().required(),
      actual_value: Joi.number().required(),
    },
  }),
  cashFlowEntriesController.create,
);

cashFlowEntriesRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      budget_value: Joi.number().required(),
      actual_value: Joi.number().required(),
    },
  }),
  cashFlowEntriesController.update,
);

cashFlowEntriesRouter.delete(
  '/:id',
  ensureAuthenticated,
  cashFlowEntriesController.delete,
);

export default cashFlowEntriesRouter;
