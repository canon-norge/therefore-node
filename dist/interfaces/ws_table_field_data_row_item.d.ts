import { IDateIndexData } from './date_index_data';
import { IIntIndexData } from './int_index_data';
import { ILogicalIndexData } from './logical_index_data';
import { IMoneyIndexData } from './money_index_data';
import { ISingleKeywordData } from './single_keyword_data';
import { IStringIndexData } from './string_index_data';
export interface IWSTableFieldDataRowItem {
    DateIndexData: IDateIndexData | null;
    IntIndexData: IIntIndexData | null;
    LogicalIndexData: ILogicalIndexData | null;
    MoneyIndexData: IMoneyIndexData | null;
    SingleKeywordData: ISingleKeywordData | null;
    StringIndexData: IStringIndexData | null;
}
