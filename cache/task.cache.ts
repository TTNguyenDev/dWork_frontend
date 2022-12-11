import { TaskApi } from '../apis';
import { cacheDataList } from '../core/utils';
import { DB } from '../db';
import { AccountState } from '../store';

const LIMIT_PER_CACHE_HIT = 1000;

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
      fetchList: TaskApi.getList,
      compareKey: 'id',
    });
    console.info('TaskCache: cached!!');
  },
  async refresh() {
    const dbClient = DB.client.task.db;
    console.info('TaskCache: refresh!!');
  },
});
