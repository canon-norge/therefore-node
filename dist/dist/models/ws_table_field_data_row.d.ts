import { IWSTableFieldDataRow } from "../interfaces/ws_table_field_data_row";
import { WSTableFieldDataRowItem } from "./ws_table_field_data_row_item";
export declare class WSTableFieldDataRow implements IWSTableFieldDataRow {
    DataRowItems: WSTableFieldDataRowItem[] | null;
    RowNo: number | null;
    AccessIsEditableRow: boolean | null;
    /**
     *
     * @param dataRowItems Gets or sets the items of the row. If it is set to null for update operation - record with given row number (see RowNo parameter) will be deleted.
     * @param rowNo Gets or sets the number of the row. While updating the data - null value means creating new row. Starts at 0 (zero).
     * @param accessIsEditableRow  Gets access status for the row for connected user.
     */
    constructor(dataRowItems: WSTableFieldDataRowItem[] | null, rowNo: number | null, accessIsEditableRow: boolean | null);
}
