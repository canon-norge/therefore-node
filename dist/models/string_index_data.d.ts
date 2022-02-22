import { IStringIndexData } from '../interfaces/string_index_data';
export declare class StringIndexData implements IStringIndexData {
    FieldNo: number;
    DataValue: string | null;
    FieldName?: string;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue
     * Gets or sets the string value of the field.
     * @param fieldName
     * Gets or sets the name (actually column name) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     */
    constructor(fieldNo: number, dataValue: string | null, fieldName: string);
}
