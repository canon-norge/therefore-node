import { MultiQuery } from '../models/multi_query';
import { Therefore } from '../therefore-node';
export interface IWSCondition {
    Condition: String;
    FieldNoOrName: String;
}
export declare class QueryOperations {
    executeMultiQuery(this: Therefore, queries: MultiQuery[], fullText?: string): Promise<any>;
}
