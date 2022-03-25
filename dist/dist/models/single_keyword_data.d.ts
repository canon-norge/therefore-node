import { ISingleKeywordData } from "../interfaces/single_keyword_data";
export declare class SingleKeywordData implements ISingleKeywordData {
    FieldNo: number;
    DataValue: string | null;
    FieldName: string | null;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue
     * Gets or sets a single keyword value of the field.
     * @param fieldName
     * Gets or sets the field name (when you set it use column name + "_Text" suffix.
     * example: for SK field "Department" use "Department_Text" for it's TEXT value) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     */
    constructor(fieldNo: number, dataValue: string | null, fieldName: string | null);
}
