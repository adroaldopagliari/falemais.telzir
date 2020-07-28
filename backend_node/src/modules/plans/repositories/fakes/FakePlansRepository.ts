import { uuid } from 'uuidv4';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import ICreatePlanDTO from '@modules/plans/dtos/ICreatePlanDTO';

import Plan from '../../infra/typeorm/entities/Plan';

class PlansRepository implements IPlansRepository {
  private plans: Plan[] = [];

  public async create({ name, minutes }: ICreatePlanDTO): Promise<Plan> {
    const plan = new Plan();

    Object.assign(plan, { id: uuid(), name, minutes });

    this.plans.push(plan);

    return plan;
  }
}

export default PlansRepository;
