import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Plan from '../infra/typeorm/entities/Plan';
import IPlansRepository from '../repositories/IPlansRepository';

interface IRequest {
  name: string;
  minutes: number;
}

// dependency inversion (SOLID)
// Single responsability (separation of concerns)
@injectable()
class CreatePlanService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, minutes }: IRequest): Promise<Plan> {
    const plan = await this.plansRepository.create({ name, minutes });

    return plan;
  }
}

export default CreatePlanService;
