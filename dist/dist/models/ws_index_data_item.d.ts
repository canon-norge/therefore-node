import { IWSIndexDataItem } from '../interfaces/ws_index_data_item.js';
import { AccessMask } from './access_mask.js';
import { DateIndexData } from './date_index_data.js';
import { DateTimeIndexData } from './date_time_index_data.js';
import { IntIndexData } from './int_index_data.js';
import { LogicalIndexData } from './logical_index_data.js';
import { MoneyIndexData } from './money_index_data.js';
import { MultipleKeywordData } from './multiple_keyword_data.js';
import { SingleKeywordData } from './single_keyword_data.js';
import { StringIndexData } from './string_index_data.js';
import { TableIndexData } from './table_index_data.js';
export declare class WSIndexDataItem implements IWSIndexDataItem {
    DateIndexData?: DateIndexData;
    IntIndexData?: IntIndexData;
    LogicalIndexData?: LogicalIndexData;
    MoneyIndexData?: MoneyIndexData;
    MultipleKeywordData?: MultipleKeywordData;
    SingleKeywordData?: SingleKeywordData;
    StringIndexData?: StringIndexData;
    TableIndexData?: TableIndexData;
    AccessMask?: AccessMask;
    DateTimeIndexData?: DateTimeIndexData;
    /**
     *
     * @param dateIndexData
     * @param intIndexData
     * @param logicalIndexData
     * @param moneyIndexData
     * @param multipleKeywordData
     * @param singleKeywordData
     * @param stringIndexData
     * @param tableIndexData
     * @param accessMask Gets access mask for index data field (column) for connected user.
     * @param dateTimeIndexData
     */
    constructor(dateIndexData: DateIndexData, intIndexData: IntIndexData, logicalIndexData: LogicalIndexData, moneyIndexData: MoneyIndexData, multipleKeywordData: MultipleKeywordData, singleKeywordData: SingleKeywordData, stringIndexData: StringIndexData, tableIndexData: TableIndexData, accessMask: AccessMask, dateTimeIndexData: DateTimeIndexData);
}
