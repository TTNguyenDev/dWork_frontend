import { Container } from '../core';
import { ApiGetListInput } from '../core/types';
import { CategoryDto } from '../dtos';

enum ContractMethods {
  categories = 'categories',
  new_category = 'new_category',
}

export const CategoryApi = Object.freeze({
  async create(payload: { topic_name: string }): Promise<void> {
    await Container.bcConnector.callChangeMethod({
      methodName: ContractMethods.new_category,
      args: payload,
    });
  },
  ///
  async getList(payload: ApiGetListInput): Promise<CategoryDto[]> {
    const res = await Container.bcConnector.callViewMethod({
      methodName: ContractMethods.categories,
      args: payload,
    });
    return res;
  },
});
