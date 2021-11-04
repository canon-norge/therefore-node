import { IWSTableFieldDataRowItem } from './ws_table_field_data_row_item';
export interface IWSTableFieldDataRow {
    DataRowItems: IWSTableFieldDataRowItem[] | null;
    RowNo: number | null;
    AccessIsEditableRow: boolean | null;
}
