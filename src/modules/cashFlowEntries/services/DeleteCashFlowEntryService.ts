import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICashFlowEntrysRepository from '@modules/cashFlowEntries/repositories/ICashFlowEntriesRepository';

@injectable()
class DeleteCashFlowEntryService {
  constructor(
    @inject('CashFlowEntriesRepository')
    private cashFlowEntriesRepository: ICashFlowEntrysRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const entry = await this.cashFlowEntriesRepository.findById(id);

    if (!entry) {
      throw new AppError('Entry not found', 404);
    }

    this.cashFlowEntriesRepository.delete(id);
  }
}

export default DeleteCashFlowEntryService;
