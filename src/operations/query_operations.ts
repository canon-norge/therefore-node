import { MultiQuery } from '../models/multi_query';
import { WebApi } from '../services/web_api.service';
import { Therefore } from '../therefore-node';

export interface IWSCondition {
  Condition: String,
  FieldNoOrName: String,
}

export class QueryOperations {
 
  async executeMultiQuery (this: Therefore, queries: MultiQuery[], fullText?: string) {
    console.log('Executing MultiQuery...')
    let body = {
      FullText: fullText,
      Queries: queries
    }
    const data = await WebApi.prototype.post.call(this, 'ExecuteMultiQuery', body)
    return data
  }

}

