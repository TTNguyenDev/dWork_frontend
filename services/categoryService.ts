import { BlockChainConnector } from '../utils/blockchain';
import { Category } from '../models/types/categoryType';

export type CreateCategoryInput = {
    topicName: string;
};
export class CategoryService {
    static async createCategory(payload: CreateCategoryInput): Promise<void> {
        await BlockChainConnector.instance.contract.new_category({
            topic_name: payload.topicName,
        });
    }

    static async fetchCategories(): Promise<Category[]> {
        const res = await BlockChainConnector.instance.contract.categories({
            from_index: 0,
            limit: 20,
        });

        return res.map((raw: any) => CategoryService.mapToModel(raw));
    }

    private static mapToModel(raw: any): Category {
        return {
            id: raw.id,
            name: raw.name,
            numPosts: raw.num_posts,
            created: raw.created,
        };
    }
}
