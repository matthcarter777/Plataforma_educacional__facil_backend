import { injectable, inject } from 'tsyringe';

import CashFlowEntry from '@modules/cashFlowEntries/infra/typeorm/entities/CashFlowEntry';
import ICashFlowEntrysRepository from '@modules/cashFlowEntries/repositories/ICashFlowEntriesRepository';

interface IRequest {
  start_date: Date;
  end_date: Date;
  budget_value: number;
  actual_value: number;
}

@injectable()
class CreateCashFlowEntryService {
  constructor(
    @inject('CashFlowEntriesRepository')
    private cashFlowEntriesRepository: ICashFlowEntrysRepository,
  ) {}

  public async execute({
    start_date,
    end_date,
    budget_value,
    actual_value,
  }: IRequest): Promise<CashFlowEntry> {
    const entry = await this.cashFlowEntriesRepository.create({
      start_date,
      end_date,
      budget_value,
      actual_value,
    });

    return entry;
  }
}

export default CreateCashFlowEntryService;
