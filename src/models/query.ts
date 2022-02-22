import { QueryMode } from '../enums/query_mode';
import { IWSCondition } from '../operations/query_operations';

export class Query {
  CaseDefinitionNo?: number;
  CategoryNo?: number;
  Conditions: IWSCondition[];
  Mode?: QueryMode;

  constructor(conditions: IWSCondition[], caseDefNo?: number, categoryNo?: number, mode?: QueryMode) {
    this.CaseDefinitionNo = caseDefNo;
    this.CategoryNo = categoryNo;
    this.Conditions = conditions;
    this.Mode = mode;
  }
}
