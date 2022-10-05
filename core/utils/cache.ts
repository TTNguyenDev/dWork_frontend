import { ApiGetListInput } from '../types';

const DEFAULT_LIMIT_PER_CACHE_HIT = 5000;

export const cacheDataList = async ({
  dbClient,
  limitPerCacheHit = DEFAULT_LIMIT_PER_CACHE_HIT,
  firstRecordQuery,
  fetchList,
  compareKey,
}: {
  dbClient: PouchDB.Database;
  limitPerCacheHit?: number;
  firstRecordQuery: PouchDB.Find.FindRequest<any>;
  fetchList: (payload: ApiGetListInput) => Promise<any[]>;
  compareKey: string;
}) => {
  const firstRecord = (
    await dbClient.find({
      ...firstRecordQuery,
      skip: 0,
      limit: 1,
    })
  ).docs[0];

  let currentFromIndex = 0;
  let isCompleted = false;
  while (!isCompleted) {
    try {
      const res = await fetchList({
        from_index: currentFromIndex,
        limit: limitPerCacheHit,
      });

      if (res.length === 0) {
        isCompleted = true;
        break;
      }

      if (firstRecord) {
        const firstRecordIndex = res.findIndex(
          // @ts-ignore
          (item) => item[compareKey] === firstRecord[compareKey]
        );

        if (firstRecordIndex !== -1) {
          await dbClient.bulkDocs(res.slice(0, firstRecordIndex));
          isCompleted = true;
          break;
        }
      }

      await dbClient.bulkDocs(res);

      currentFromIndex += limitPerCacheHit;
    } catch (err) {
      console.error(err);
      isCompleted = true;
    }
  }
};
