import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTariffService from '@modules/tariffs/services/CreateTariffService';

export default class TariffsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { origin, destination, minute_price } = request.body;

    const createTariff = container.resolve(CreateTariffService);

    const tariff = await createTariff.execute({
      origin,
      destination,
      minute_price,
    });

    return response.json(tariff);
  }
}
