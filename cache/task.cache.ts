import { TaskApi } from '../apis';
import { cacheDataList } from '../core/utils';
import { DB } from '../db';

const LIMIT_PER_CACHE_HIT = 500;

export const TaskCache = Object.freeze({
  async cache() {
    const dbClient = DB.client.task.db;
    await cacheDataList({
      dbClient,
      limitPerCacheHit: LIMIT_PER_CACHE_HIT,
      firstRecordQuery: {
        sort: [{ created_at: 'desc' }],
        selector: {
          created_at: { $exists: true },
        },
      },
      fetchList: TaskApi.queries.getList,
      compareKey: 'id',
    });
    console.info('TaskCache: cached!!');
  },
});
