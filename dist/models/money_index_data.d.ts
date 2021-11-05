import { IMoneyIndexData } from "../interfaces/money_index_data";
export declare class MoneyIndexData implements IMoneyIndexData {
    FieldNo: number;
    DataValue: number | null;
    FieldName: string | null;
    DecimalDataValue: number | null;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue DEPRECATED
     * @param fieldName
     * Gets or sets the name (actually column name) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     * @param decimalDataValue
     * Gets or sets the DECIMAL value of the field.
     * Value for the field sould be set either by DataValue or by DecimalDataValue proiperty.
     */
    constructor(fieldNo: number, dataValue: number | null, fieldName: string | null, decimalDataValue: number | null);
}
