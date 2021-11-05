import { IWSTableFieldDataRowItem } from "../interfaces/ws_table_field_data_row_item";
import { DateIndexData } from "./date_index_data";
import { IntIndexData } from "./int_index_data";
import { LogicalIndexData } from "./logical_index_data";
import { MoneyIndexData } from "./money_index_data";
import { SingleKeywordData } from "./single_keyword_Data";
import { StringIndexData } from "./string_index_data";
export declare class WSTableFieldDataRowItem implements IWSTableFieldDataRowItem {
    DateIndexData: DateIndexData | null;
    IntIndexData: IntIndexData | null;
    LogicalIndexData: LogicalIndexData | null;
    MoneyIndexData: MoneyIndexData | null;
    SingleKeywordData: SingleKeywordData | null;
    StringIndexData: StringIndexData | null;
    /**
     *
     * @param dateIndexData Date field data
     * @param intIndexData Int field data
     * @param logicalIndexData Logical field data
     * @param moneyIndexData Money field data
     * @param singleKeywordData Single keyword data
     * @param stringIndexData String data
     */
    constructor(dateIndexData: DateIndexData | null, intIndexData: IntIndexData | null, logicalIndexData: LogicalIndexData | null, moneyIndexData: MoneyIndexData | null, singleKeywordData: SingleKeywordData | null, stringIndexData: StringIndexData | null);
}
