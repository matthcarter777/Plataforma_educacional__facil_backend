import { getRepository, Repository } from 'typeorm';

import ICashFlowEntriesRepository from '@modules/cashFlowEntries/repositories/ICashFlowEntriesRepository';
import ICreateCashFlowEntryDTO from '@modules/cashFlowEntries/dtos/ICreateCashFlowEntryDTO';

import CashFlowEntry from '@modules/cashFlowEntries/infra/typeorm/entities/CashFlowEntry';

class CashFlowEntriesRepository implements ICashFlowEntriesRepository {
  private ormRepository: Repository<CashFlowEntry>;

  constructor() {
    this.ormRepository = getRepository(CashFlowEntry);
  }

  public async findById(id: string): Promise<CashFlowEntry | undefined> {
    const entry = await this.ormRepository.findOne(id);
    return entry;
  }

  public async findAll(): Promise<CashFlowEntry[]> {
    let entries: CashFlowEntry[] = [];

    entries = await this.ormRepository.find({
      order: {
        start_date: 'ASC',
      },
    });

    return entries;
  }

  public async create(
    entryData: ICreateCashFlowEntryDTO,
  ): Promise<CashFlowEntry> {
    const entry = this.ormRepository.create(entryData);
    await this.ormRepository.save(entry);

    return entry;
  }

  public async save(entry: CashFlowEntry): Promise<CashFlowEntry> {
    return this.ormRepository.save(entry);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default CashFlowEntriesRepository;
