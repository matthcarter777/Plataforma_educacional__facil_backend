import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import CashFlowEntry from '@modules/cashFlowEntries/infra/typeorm/entities/CashFlowEntry';
import ICashFlowEntrysRepository from '@modules/cashFlowEntries/repositories/ICashFlowEntriesRepository';

interface IRequest {
  id: string;
  start_date: Date;
  end_date: Date;
  budget_value: number;
  actual_value: number;
}

@injectable()
class UpdateCashFlowEntryService {
  constructor(
    @inject('CashFlowEntriesRepository')
    private cashFlowEntriesRepository: ICashFlowEntrysRepository,
  ) {}

  public async execute({
    id,
    start_date,
    end_date,
    budget_value,
    actual_value,
  }: IRequest): Promise<CashFlowEntry> {
    const findEntry = await this.cashFlowEntriesRepository.findById(id);

    if (!findEntry) {
      throw new AppError('Entry not found', 404);
    }

    const entry = Object.assign(findEntry, {
      start_date,
      end_date,
      budget_value,
      actual_value,
    });

    const updatedEntry = await this.cashFlowEntriesRepository.save(entry);

    return updatedEntry;
  }
}

export default UpdateCashFlowEntryService;
