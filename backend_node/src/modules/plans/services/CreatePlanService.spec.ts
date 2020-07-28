import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakePlansRepository from '../repositories/fakes/FakePlansRepository';
import CreatePlanService from './CreatePlanService';

let fakePlansRepository: FakePlansRepository;
let createPlanService: CreatePlanService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreatePlan', () => {
  beforeEach(() => {
    fakePlansRepository = new FakePlansRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createPlanService = new CreatePlanService(
      fakePlansRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const plan = await createPlanService.execute({
      name: '10 minutos',
      minutes: 10,
    });

    expect(plan).toHaveProperty('id');
    expect(plan.minutes).toBe('10');
  });
});
