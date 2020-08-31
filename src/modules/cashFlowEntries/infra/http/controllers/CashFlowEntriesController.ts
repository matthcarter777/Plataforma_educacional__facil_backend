import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindAllCashFlowEntriesService from '@modules/cashFlowEntries/services/FindAllCashFlowEntriesService';
import CreateCashFlowEntryService from '@modules/cashFlowEntries/services/CreateCashFlowEntryService';
import UpdateCashFlowEntryService from '@modules/cashFlowEntries/services/UpdateCashFlowEntryService';
import DeleteCashFlowEntryService from '@modules/cashFlowEntries/services/DeleteCashFlowEntryService';

export default class CashFlowEntriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findAllCashFlowEntries = container.resolve(
      FindAllCashFlowEntriesService,
    );

    const entries = await findAllCashFlowEntries.execute();

    return response.json(classToClass(entries));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date, budget_value, actual_value } = request.body;

    const createCashFlowEntry = container.resolve(CreateCashFlowEntryService);

    const entry = await createCashFlowEntry.execute({
      start_date,
      end_date,
      budget_value,
      actual_value,
    });

    return response.json(classToClass(entry));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date, budget_value, actual_value } = request.body;
    const { id } = request.params;

    const updateCashFlowEntry = container.resolve(UpdateCashFlowEntryService);

    const entry = await updateCashFlowEntry.execute({
      id,
      start_date,
      end_date,
      budget_value,
      actual_value,
    });

    return response.json(classToClass(entry));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCashFlowEntry = container.resolve(DeleteCashFlowEntryService);

    await deleteCashFlowEntry.execute(id);

    return response.status(200).send();
  }
}
