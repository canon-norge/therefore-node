import { IWSIndexDataItem } from '../interfaces/ws_index_data_item.js';
import { StringIndexData } from './string_index_data.js';
export declare class WSIndexDataItem implements IWSIndexDataItem {
    DateIndexData: null;
    IntIndexData: null;
    LogicalIndexData: null;
    MoneyIndexData: null;
    MultipleKeywordData: null;
    SingleKeywordData: null;
    StringIndexData: StringIndexData | null;
    TableIndexData: null;
    AccessMask: null;
    DateTimeIndexData: null;
    constructor(stringIndexData: StringIndexData);
}
