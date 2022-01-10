import { IWSCondition } from '../operations/query_operations';
export declare class MultiQuery {
    CaseDefinitionNo?: number;
    CategoryNo?: number;
    Conditions: IWSCondition[];
    constructor(conditions: IWSCondition[], caseDefNo?: number, categoryNo?: number);
}
