import { getRepository, Repository } from 'typeorm';

import ITariffsRepository from '@modules/tariffs/repositories/ITariffsRepository';
import ICreateTariffDTO from '@modules/tariffs/dtos/ICreateTariffDTO';
import IFindTariffDTO from '@modules/tariffs/dtos/IFindTariffDTO';

import Tariff from '../entities/Tariff';

class TariffsRepository implements ITariffsRepository {
  private ormRepository: Repository<Tariff>;

  constructor() {
    this.ormRepository = getRepository(Tariff);
  }

  public async create({
    origin,
    destination,
    minute_price,
  }: ICreateTariffDTO): Promise<Tariff> {
    const tariff = this.ormRepository.create({
      origin,
      destination,
      minute_price,
    });

    await this.ormRepository.save(tariff);

    return tariff;
  }

  public async findByKey({
    origin,
    destination,
  }: IFindTariffDTO): Promise<Tariff | undefined> {
    const tariff = await this.ormRepository.findOne({
      where: {
        origin,
        destination,
      },
    });

    return tariff;
  }
}

export default TariffsRepository;
