import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import Tariff from '@modules/tariffs/infra/typeorm/entities/Tariff';
import TariffSeed from '../seeds/TariffSeed';

export default class SeedTariff1595598203832 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getRepository(Tariff).save(TariffSeed);
  }

  public async down(_: QueryRunner): Promise<void> {
    await getRepository('tariff_calls').delete(TariffSeed);
  }
}
