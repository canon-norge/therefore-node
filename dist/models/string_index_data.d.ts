import { IStringIndexData } from '../interfaces/string_index_data';
export declare class StringIndexData implements IStringIndexData {
    FieldNo: number;
    DataValue: string | null;
    FieldName: string | null;
    constructor(fieldNo: number, dataValue: string | null, fieldName: string | null);
}