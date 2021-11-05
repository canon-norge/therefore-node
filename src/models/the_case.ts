import { ITheCase } from "../interfaces/the_case";
import { WSIndexDataItem } from "./ws_index_data_item";

export class TheCase implements ITheCase{
    CaseDefNo: number;
    IndexDataItems: WSIndexDataItem[] | null;
    DoFillDependentFields: boolean | null;
    constructor(caseDefNo: number, indexDataItems: WSIndexDataItem[] | null, doFillDependentFields: boolean | null){
        this.CaseDefNo = caseDefNo,
        this.IndexDataItems = indexDataItems,
        this.DoFillDependentFields = doFillDependentFields
    }
}