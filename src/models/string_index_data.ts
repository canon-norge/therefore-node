import { IStringIndexData } from '../interfaces/string_index_data';

export class StringIndexData implements IStringIndexData {
  FieldNo: number;
  DataValue: string | null;
  FieldName: string | null;

  constructor(fieldNo: number, dataValue: string | null, fieldName: string | null) {
    this.FieldNo = fieldNo;
    this.DataValue = dataValue;
    this.FieldName = fieldName;
  }
}
