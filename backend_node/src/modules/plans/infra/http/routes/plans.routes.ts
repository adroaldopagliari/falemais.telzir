import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PlansController from '../controllers/PlansController';

const plansRouter = Router();
const plansController = new PlansController();

plansRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      minutes: Joi.number(),
    },
  }),
  plansController.create,
);

export default plansRouter;
