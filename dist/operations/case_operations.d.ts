import { IGetCaseDocumentsResponse } from '../interfaces/get_case_documents_response';
import { TheCase } from '../models/the_case';
import { Therefore } from '../therefore-node';
export declare class CaseOperations {
    closeCase(this: Therefore, caseNo: number): Promise<void>;
    createCase(this: Therefore, theCase: TheCase): Promise<TheCase>;
    updateCase(this: Therefore, theCase: TheCase): Promise<TheCase>;
    getCaseDefinition(this: Therefore, caseDefinitionNo: number): Promise<TheCase>;
    deleteCase(this: Therefore, caseNo: number): Promise<void>;
    getCase(this: Therefore, caseNo: number): Promise<TheCase>;
    getCaseDocuments(this: Therefore, CaseNo: number, CategoryNo?: number): Promise<IGetCaseDocumentsResponse>;
}
