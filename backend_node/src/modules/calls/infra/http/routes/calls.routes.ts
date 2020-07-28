import { Router } from 'express';

import CallsController from '../controllers/CallsController';

const callsRouter = Router();
const callsController = new CallsController();

callsRouter.post('/', callsController.index);

export default callsRouter;
