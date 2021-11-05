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
    DateIndexData: DateIndexData | null;
    IntIndexData: IntIndexData | null;
    LogicalIndexData: LogicalIndexData | null;
    MoneyIndexData: MoneyIndexData | null;
    MultipleKeywordData: MultipleKeywordData | null;
    SingleKeywordData: SingleKeywordData | null;
    StringIndexData: StringIndexData | null;
    TableIndexData: TableIndexData | null;
    AccessMask: AccessMask | null;
    DateTimeIndexData: DateTimeIndexData | null;
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
    constructor(dateIndexData: DateIndexData | null, intIndexData: IntIndexData | null, logicalIndexData: LogicalIndexData | null, moneyIndexData: MoneyIndexData | null, multipleKeywordData: MultipleKeywordData | null, singleKeywordData: SingleKeywordData | null, stringIndexData: StringIndexData | null, tableIndexData: TableIndexData | null, accessMask: AccessMask | null, dateTimeIndexData: DateTimeIndexData | null);
}
