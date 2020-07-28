import { container } from 'tsyringe';

import './providers';

import IPlansRepository from '@modules/plans/repositories/IPlansRepository';
import PlansRepository from '@modules/plans/infra/typeorm/repositories/PlansRepository';
import ITariffsRepository from '@modules/tariffs/repositories/ITariffsRepository';
import TariffsRepository from '@modules/tariffs/infra/typeorm/repositories/TariffsRepository';

container.registerSingleton<IPlansRepository>(
  'PlansRepository',
  PlansRepository,
);

container.registerSingleton<ITariffsRepository>(
  'TariffsRepository',
  TariffsRepository,
);
