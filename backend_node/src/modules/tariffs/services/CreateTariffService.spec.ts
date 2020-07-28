import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeTariffsRepository from '../repositories/fakes/FakeTariffsRepository';
import CreateTariffService from './CreateTariffService';

let fakeTariffsRepository: FakeTariffsRepository;
let createTariffService: CreateTariffService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateTariff', () => {
  beforeEach(() => {
    fakeTariffsRepository = new FakeTariffsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createTariffService = new CreateTariffService(
      fakeTariffsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    const tariff = await createTariffService.execute({
      origin: '10 minutos',
      destination: '10',
      minute_price: 2,
    });

    expect(tariff).toHaveProperty('id');
  });
});
