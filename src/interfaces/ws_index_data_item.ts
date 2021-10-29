import { IAccessMask } from './access_mask';
import { IDateIndexData } from './date_index_data';
import { IDateTimeIndexData } from './date_time_index_data';
import { IIntIndexData } from './int_index_data';
import { ILogicalIndexData } from './logical_index_data';
import { IMoneyIndexData } from './money_index_data';
import { IMultipleKeywordData } from './multiple_keyword_data';
import { ISingleKeywordData } from './single_keyword_data';
import { IStringIndexData } from './string_index_data';
import { ITableIndexData } from './table_index_data';

export interface IWSIndexDataItem {
  DateIndexData: IDateIndexData | null;
  IntIndexData: IIntIndexData | null;
  LogicalIndexData: ILogicalIndexData | null;
  MoneyIndexData: IMoneyIndexData | null;
  MultipleKeywordData: IMultipleKeywordData | null;
  SingleKeywordData: ISingleKeywordData | null;
  StringIndexData: IStringIndexData | null;
  TableIndexData: ITableIndexData | null;
  AccessMask: IAccessMask | null;
  DateTimeIndexData: IDateTimeIndexData | null;
}
