import { IMultipleKeywordData } from "../interfaces/multiple_keyword_data";
export declare class MultipleKeywordData implements IMultipleKeywordData {
    FieldNo: number;
    DataValue: string[] | null;
    FieldName: string | null;
    KeywordNos: number[] | null;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue
     * Gets or sets multiple keyword values of the field.
     * @param fieldName
     * Gets or sets the name (actually column name) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     * @param keywordNos
     * Gets or sets multiple keyword numbers of the field.
     */
    constructor(fieldNo: number, dataValue: string[] | null, fieldName: string | null, keywordNos: number[] | null);
}
