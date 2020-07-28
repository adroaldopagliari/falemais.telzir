import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tariff_calls')
class Tariff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  minute_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tariff;
