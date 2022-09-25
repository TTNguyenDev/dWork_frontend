import { GetListInput } from '../core/types';
import { DB } from '../db';
import { CategoryDto } from '../dtos';

export class CategoryRepo {
  static async getList(
    input: GetListInput<CategoryDto>
  ): Promise<CategoryDto[]> {
    const { docs } = await DB.client.category.db.find({
      ...input,
      selector: input.selector ?? {},
    });

    return docs;
  }
}
