import { CategoryDB } from './category.db';
import { TaskDB } from './task.db';

export class DB {
  private static _client: {
    category: CategoryDB;
    task: TaskDB;
  };

  static get client() {
    if (!this._client) throw new Error('DB client not initialize');
    return this._client;
  }

  static async init() {
    const category = new CategoryDB();
    const task = new TaskDB();

    await Promise.all([category.init(), task.init()]);

    this._client = {
      category,
      task,
    };
  }

  static async destroy() {
    await Promise.all([
      this.client.category.db.destroy(),
      this.client.task.db.destroy(),
    ]);
  }
}
