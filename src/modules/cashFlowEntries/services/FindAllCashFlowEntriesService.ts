import { injectable, inject } from 'tsyringe';

import CashFlowEntry from '@modules/cashFlowEntries/infra/typeorm/entities/CashFlowEntry';
import ICashFlowEntrysRepository from '@modules/cashFlowEntries/repositories/ICashFlowEntriesRepository';

@injectable()
class FindAllCashFlowEntriesService {
  constructor(
    @inject('CashFlowEntriesRepository')
    private cashFlowEntriesRepository: ICashFlowEntrysRepository,
  ) {}

  public async execute(): Promise<CashFlowEntry[]> {
    const entries = await this.cashFlowEntriesRepository.findAll();

    return entries;
  }
}

export default FindAllCashFlowEntriesService;
