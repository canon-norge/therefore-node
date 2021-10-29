import { IWSTableFieldDataRow } from './ws_table_field_data_row';

export interface ITableIndexData {
  FieldNo: number;
  DataValue: IWSTableFieldDataRow | null;
  FieldName: string | null;
}
