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
    DateIndexData?: IDateIndexData;
    IntIndexData?: IIntIndexData;
    LogicalIndexData?: ILogicalIndexData;
    MoneyIndexData?: IMoneyIndexData;
    MultipleKeywordData?: IMultipleKeywordData;
    SingleKeywordData?: ISingleKeywordData;
    StringIndexData?: IStringIndexData;
    TableIndexData?: ITableIndexData;
    AccessMask?: IAccessMask;
    DateTimeIndexData?: IDateTimeIndexData;
}
