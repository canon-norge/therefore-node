import { IWSCondition } from '../operations/query_operations';

export class MultiQuery {
  CaseDefinitionNo?: number;
  CategoryNo?: number;
  Conditions: IWSCondition[];

  constructor(conditions: IWSCondition[], caseDefNo?: number, categoryNo?: number) {
    this.CaseDefinitionNo = caseDefNo;
    this.CategoryNo = categoryNo;
    this.Conditions = conditions;
  }
}
