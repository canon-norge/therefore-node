import { IWSIndexDataItem } from './ws_index_data_item';
export interface ITheCase {
    CaseDefNo: number;
    IndexDataItems: IWSIndexDataItem[] | null;
    DoFillDependentFields: boolean | null;
}
