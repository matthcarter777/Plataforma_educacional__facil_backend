import CashFlowEntry from '@modules/cashFlowEntries/infra/typeorm/entities/CashFlowEntry';
import ICreateCashFlowEntryDTO from '@modules/cashFlowEntries/dtos/ICreateCashFlowEntryDTO';

export default interface ICashFlowEntriesRepository {
  findAll(): Promise<CashFlowEntry[]>;
  findById(id: string): Promise<CashFlowEntry | undefined>;
  create(data: ICreateCashFlowEntryDTO): Promise<CashFlowEntry>;
  save(entry: CashFlowEntry): Promise<CashFlowEntry>;
  delete(id: string): Promise<void>;
}
