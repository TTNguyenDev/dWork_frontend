import PouchDB from 'pouchdb';
import { CategoryDto } from '../dtos';

export class CategoryDB {
  public readonly dbName = 'categories';

  private readonly _db;
  get db() {
    return this._db;
  }

  constructor() {
    this._db = new PouchDB<CategoryDto>(this.dbName);
  }

  async init() {
    await this._db.createIndex({
      index: {
        fields: ['created'],
      },
    });
  }
}
