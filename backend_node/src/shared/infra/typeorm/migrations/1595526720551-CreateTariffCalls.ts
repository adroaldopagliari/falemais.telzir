import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTariffCalls1595526720551
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tariff_calls',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'origin',
            type: 'varchar',
          },
          {
            name: 'destination',
            type: 'varchar',
          },
          {
            name: 'minute_price',
            type: 'numeric',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tariff_calls');
  }
}
