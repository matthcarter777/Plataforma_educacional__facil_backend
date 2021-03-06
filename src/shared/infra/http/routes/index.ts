import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import cashFlowEntriesRouter from '@modules/cashFlowEntries/infra/http/routes/cashFlowEntries.routes';

import setupRouter from '@modules/setup/infra/http/routes/setup.routes';
import profilesRouter from '@modules/profiles/infra/http/routes/profiles.routes';
import documentsRouter from '@modules/documents/infra/http/routes/documents.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/profiles', profilesRouter);
routes.use('/documents', documentsRouter);

routes.use('/cash-flow-entries', cashFlowEntriesRouter);

routes.use('/setup', setupRouter);

export default routes;
