import { ITableIndexData } from "../interfaces/table_index_data";
import { WSTableFieldDataRow } from "./ws_table_field_data_row";
export declare class TableIndexData implements ITableIndexData {
    FieldNo: number;
    DataValue: WSTableFieldDataRow[] | null;
    FieldName?: string;
    /**
   *
   * @param fieldNo
   * Gets or sets the number of the field.
   * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
   * @param dataValue
   * Gets or sets row with data in table field
   * @param fieldName
   * Gets or sets the name (actually column name) of the field.
   * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
   */
    constructor(fieldNo: number, dataValue: WSTableFieldDataRow[] | null, fieldName: string);
}
