import Tariff from '../infra/typeorm/entities/Tariff';
import ICreateTariffDTO from '../dtos/ICreateTariffDTO';
import IFindTariffDTO from '../dtos/IFindTariffDTO';

export default interface ITariffsRepository {
  create(data: ICreateTariffDTO): Promise<Tariff>;
  findByKey(data: IFindTariffDTO): Promise<Tariff | undefined>;
}
