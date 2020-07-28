import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TariffsController from '../controllers/TariffsController';

const tariffsRouter = Router();
const tariffsController = new TariffsController();

tariffsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      origin: Joi.string().required(),
      destination: Joi.string().required(),
      minute_price: Joi.number().required(),
    },
  }),
  tariffsController.create,
);

export default tariffsRouter;
