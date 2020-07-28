import { Router } from 'express';
import plansRouter from '@modules/plans/infra/http/routes/plans.routes';
import tariffsRouter from '@modules/tariffs/infra/http/routes/tariffs.routes';
import callsRouter from '@modules/calls/infra/http/routes/calls.routes';

const routes = Router();

routes.use('/plans', plansRouter);
routes.use('/tariffs', tariffsRouter);
routes.use('/calls', callsRouter);

export default routes;
