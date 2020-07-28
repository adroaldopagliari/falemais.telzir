import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import Plan from '@modules/plans/infra/typeorm/entities/Plan';
import PlanSeed from '../seeds/PlanSeed';

export default class SeedPlan1595598189669 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    await getRepository(Plan).save(PlanSeed);
  }

  public async down(_: QueryRunner): Promise<void> {
    await getRepository('plans').delete(PlanSeed);
  }
}
