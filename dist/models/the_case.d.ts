import { ITheCase } from "../interfaces/the_case";
import { WSIndexDataItem } from "./ws_index_data_item";
export declare class TheCase implements ITheCase {
    CaseDefNo: number;
    IndexDataItems: WSIndexDataItem[] | null;
    DoFillDependentFields: boolean | null;
    constructor(caseDefNo: number, indexDataItems: WSIndexDataItem[] | null, doFillDependentFields: boolean | null);
}
