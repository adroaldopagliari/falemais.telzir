import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePlanService from '@modules/plans/services/CreatePlanService';

export default class PlansController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, minutes } = request.body;

    const createPlan = container.resolve(CreatePlanService);

    const plan = await createPlan.execute({
      name,
      minutes,
    });

    return response.json(plan);
  }
}
