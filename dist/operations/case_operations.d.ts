import { TheCase } from '../models/the_case';
import { TheCaseDefinition } from '../models/the_case_definition';
import { Therefore } from '../therefore-node';
export declare class CaseOperations {
    client: Therefore;
    constructor(client: Therefore);
    closeCase(caseNo: number): Promise<void>;
    createCase(theCase: TheCase): Promise<TheCase>;
    deleteCase(caseNo: number): Promise<void>;
    getCase(caseNo: number): Promise<TheCase>;
    getCaseDefinition(caseDeifinitionNo: number, isAccessMaskNeeded: boolean | undefined, isSearchFieldOrderNeeded?: boolean): Promise<TheCaseDefinition>;
}
