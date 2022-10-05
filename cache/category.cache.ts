import { CategoryApi } from '../apis';
import { cacheDataList } from '../core/utils';
import { DB } from '../db';

const LIMIT_PER_CACHE_HIT = 5000;

export const CategoryCache = Object.freeze({
  async cache() {
    const dbClient = DB.client.category.db;
    await cacheDataList({
      dbClient,
      limitPerCacheHit: LIMIT_PER_CACHE_HIT,
      firstRecordQuery: {
        sort: [{ created: 'desc' }],
        selector: {
          created: { $exists: true },
        },
      },
      fetchList: CategoryApi.getList,
      compareKey: 'id',
    });
    console.info('CategoryCache: cached!!');
  },
});
