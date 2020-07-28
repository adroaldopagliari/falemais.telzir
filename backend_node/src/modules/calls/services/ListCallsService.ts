import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import ITariffsRepository from '@modules/tariffs/repositories/ITariffsRepository';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

interface IRequest {
  origin: string;
  destination: string;
  minutes: number;
  plan: string;
}

interface IReponse {
  origin: string;
  destination: string;
  minutes: number;
  plan: string;
  plan_price: number;
  noplan_price: number;
}

@injectable()
class ListCallsService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

    @inject('TariffsRepository')
    private tariffsRepository: ITariffsRepository,
  ) {}

  public async execute({
    origin,
    destination,
    minutes,
    plan,
  }: IRequest): Promise<IReponse> {
    const cacheKey = `call:${origin}-${destination}-${minutes}-${plan}`;

    let calls; //= await this.cacheProvider.recover<IReponse>(cacheKey);

    if (!calls) {
      const planData = await this.plansRepository.findByName(plan);

      if (!planData) {
        throw new AppError(`Plan does not found: ${plan}`);
      }

      const tariffData = await this.tariffsRepository.findByKey({
        origin,
        destination,
      });

      if (!tariffData) {
        throw new AppError(`Tariff does not found with these parameters:
        origin: ${origin} - destination: ${destination}`);
      }

      let plan_price = 0;

      if (minutes - planData.minutes > 0) {
        plan_price =
          (minutes - planData.minutes) *
          (Number(tariffData.minute_price) + tariffData.minute_price * 0.1);
      }

      const noplan_price = minutes * tariffData.minute_price;

      calls = {
        origin,
        destination,
        minutes,
        plan,
        plan_price,
        noplan_price,
      };

      await this.cacheProvider.save(cacheKey, classToClass(calls));
    }

    return calls;
  }
}

export default ListCallsService;
