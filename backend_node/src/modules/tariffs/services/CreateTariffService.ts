import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Tariff from '../infra/typeorm/entities/Tariff';
import ITariffsRepository from '../repositories/ITariffsRepository';

interface IRequest {
  origin: string;
  destination: string;
  minute_price: number;
}

// dependency inversion (SOLID)
// Single responsability (separation of concerns)
@injectable()
class CreateTariffService {
  constructor(
    @inject('TariffsRepository')
    private tariffsRepository: ITariffsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    origin,
    destination,
    minute_price,
  }: IRequest): Promise<Tariff> {
    const tariff = await this.tariffsRepository.create({
      origin,
      destination,
      minute_price,
    });

    return tariff;
  }
}

export default CreateTariffService;
