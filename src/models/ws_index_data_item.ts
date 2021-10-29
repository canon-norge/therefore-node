import { IWSIndexDataItem } from '../interfaces/ws_index_data_item.js';
import { StringIndexData } from './string_index_data.js';

export class WSIndexDataItem implements IWSIndexDataItem {
  DateIndexData: null; //IDateIndexData |
  IntIndexData: null; // IIntIndexData |
  LogicalIndexData: null; // ILogicalIndexData |
  MoneyIndexData: null; // IMoneyIndexData |
  MultipleKeywordData: null; //IMultipleKeywordData |
  SingleKeywordData: null; // ISingleKeywordData |
  StringIndexData: StringIndexData | null;
  TableIndexData: null; // ITableIndexData |
  AccessMask: null; // IAccessMask |
  DateTimeIndexData: null; // IDateTimeIndexData |

  constructor(stringIndexData: StringIndexData) {
    this.DateIndexData =
      this.IntIndexData =
      this.LogicalIndexData =
      this.MoneyIndexData =
      this.MultipleKeywordData =
      this.SingleKeywordData =
      this.TableIndexData =
      this.AccessMask =
      this.DateTimeIndexData =
        null;

    this.StringIndexData = stringIndexData;
  }
}
