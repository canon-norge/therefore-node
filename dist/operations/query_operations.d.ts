import { Query } from '../models/query';
import { Therefore } from '../therefore-node';
export interface IWSCondition {
    Condition: String;
    FieldNoOrName: String;
}
export declare class QueryOperations {
    executeMultiQuery(this: Therefore, queries: Query[], fullText?: string): Promise<any>;
    executeSingleQuery(this: Therefore, query: Query, fullText?: string): Promise<any>;
}
