import { IDateTimeIndexData } from "../interfaces/date_time_index_data";

export class DateTimeIndexData implements IDateTimeIndexData {
  FieldNo: number;
  DataValue: string | null;
  DataISO8601Value: string | null;
  FieldName?: string;

  /**
   * 
   * @param fieldNo 
   * Gets or sets the number of the field.
   * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
   * @param dataValue 
   * Gets or sets the string value of the field.
   * @param dataISO8601Value
   * Gets or sets date value of the field in ISO 8601 format (YYYY-MM-DD, example 2017-07-23).
   * See also the *DataValue* property.
   * The DataValue property is ignored if the DataISO8601Value property has a value.
   * @param fieldName 
   * Gets or sets the name (actually column name) of the field.
   * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
   */
  constructor(fieldNo: number, dataValue: string | null, dataISO8601Value: string | null, fieldName: string) {
    this.FieldNo = fieldNo;
    this.DataValue = dataValue;
    this.DataISO8601Value = dataISO8601Value
    this.FieldName = fieldName;
  }
}
