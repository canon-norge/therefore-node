import { ILogicalIndexData } from "../interfaces/logical_index_data";
export declare class LogicalIndexData implements ILogicalIndexData {
    FieldNo: number;
    DataValue: boolean | null;
    FieldName?: string;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue
     * Gets or sets the boolean value of the field.
     * @param fieldName
     * Gets or sets the name (actually column name) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     */
    constructor(fieldNo: number, dataValue: boolean | null, fieldName: string);
}
