import PouchDB from 'pouchdb';
import { TaskDto } from '../dtos';

export class TaskDB {
  public readonly dbName = 'tasks';

  private readonly _db;
  get db() {
    return this._db;
  }

  constructor() {
    this._db = new PouchDB<TaskDto>(this.dbName);
  }

  async init() {
    Promise.all([
      this._db.createIndex({
        index: {
          fields: ['created_at'],
        },
      }),
      this._db.createIndex({
        index: {
          fields: ['price'],
        },
      }),
    ]);
  }
}
