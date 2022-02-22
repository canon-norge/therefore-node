import { Query } from '../models/query';
import { WebApi } from '../services/web_api.service';
import { Therefore } from '../therefore-node';

export interface IWSCondition {
  Condition: String,
  FieldNoOrName: String,
}

export class QueryOperations {
 
  async executeMultiQuery (this: Therefore, queries: Query[], fullText?: string) {
    console.log('Executing MultiQuery...')
    let body = {
      FullText: fullText,
      Queries: queries
    }
    const data = await WebApi.prototype.post.call(this, 'ExecuteMultiQuery', body)
    return data
  }

  async executeSingleQuery (this: Therefore, query: Query, fullText?: string) {
    console.log('Executing SingleQuery...')
    const data = await WebApi.prototype.post.call(this, 'ExecuteSingleQUery', {Query: query, FullText: fullText})
    return data
  }

}

