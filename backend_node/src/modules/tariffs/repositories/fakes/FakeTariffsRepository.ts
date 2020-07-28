import { uuid } from 'uuidv4';

import ITariffsRepository from '@modules/tariffs/repositories/ITariffsRepository';
import ICreateTariffDTO from '@modules/tariffs/dtos/ICreateTariffDTO';

import Tariff from '../../infra/typeorm/entities/Tariff';

class TariffsRepository implements ITariffsRepository {
  private tariffs: Tariff[] = [];

  public async create({
    origin,
    destination,
    minute_price,
  }: ICreateTariffDTO): Promise<Tariff> {
    const tariff = new Tariff();

    Object.assign(tariff, { id: uuid(), origin, destination, minute_price });

    this.tariffs.push(tariff);

    return tariff;
  }
}

export default TariffsRepository;
