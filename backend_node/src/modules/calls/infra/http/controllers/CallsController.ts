import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListCallsService from '@modules/calls/services/ListCallsService';

export default class CallsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { origin, destination, minutes, plan } = request.body;

    console.log(origin, destination, minutes, plan);

    const listCalls = container.resolve(ListCallsService);

    const calls = await listCalls.execute({
      origin,
      destination,
      minutes,
      plan,
    });

    return response.json(classToClass(calls));
  }
}
