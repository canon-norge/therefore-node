import "isomorphic-fetch";
import { CategoriesTree } from './models/categories_tree.js';
import { ICategoryInfo } from './interfaces/category_info.js';
import { CounterMode } from './enums/counter_mode.js';
import { TreeItem } from './models/tree_item.js';
import { TheDocument } from './models/the_document.js';
import { ItemType } from './enums/item_type.js';
import { FieldType } from './enums/field_type.js';
import { WSIndexDataItem } from './models/ws_index_data_item.js';
import { StringIndexData } from './models/string_index_data.js';
import { WSStreamInfoWithData } from './models/ws_stream_info_with_data.js';
import { TheCase } from './models/the_case.js';
import { IGetCaseDocumentsResponse } from './interfaces/get_case_documents_response.js';
import { DateIndexData } from './models/date_index_data.js';
import { IntIndexData } from './models/int_index_data.js';
import { QueryMode } from './enums/query_mode.js';
declare class Therefore {
    url: string;
    username: string;
    password: string;
    authHeader: string;
    apiVersion: string;
    tenant?: string;
    client_type?: number;
    constructor(url: string, username: string, password: string, tenant?: string, client_type?: number);
    createDocument: (this: Therefore, document: TheDocument) => Promise<any>;
    getDocument: (this: Therefore, docNo: number, isCheckOutStatusNeeded?: boolean | undefined, isIndexDataValuesNeeded?: boolean | undefined, isStreamsInfoAndDataNeeded?: boolean | undefined, isStreamsInfoNeeded?: boolean | undefined, versionNo?: number | undefined, isAccessMaskNeeded?: boolean | undefined, titleHideCategory?: boolean | undefined) => Promise<TheDocument>;
    getDocumentStream: (this: Therefore, docNo: number, streamNo: number, versionNo?: number | undefined) => Promise<WSStreamInfoWithData>;
    getCaseDefinition: (this: Therefore, caseDefinitionNo: number) => Promise<TheCase>;
    createCase: (this: Therefore, theCase: TheCase) => Promise<TheCase>;
    closeCase: (this: Therefore, caseNo: number) => Promise<void>;
    updateCase: (this: Therefore, theCase: TheCase) => Promise<TheCase>;
    deleteCase: (this: Therefore, caseNo: number) => Promise<void>;
    getCase: (this: Therefore, caseNo: number) => Promise<TheCase>;
    getCaseDocuments: (this: Therefore, CaseNo: number, CategoryNo?: number | undefined) => Promise<IGetCaseDocumentsResponse>;
    saveCaseIndexDataQuick: (this: Therefore, caseNo: number, updatedCase: TheCase) => Promise<void>;
    getCategoriesTree: (this: Therefore) => Promise<CategoriesTree>;
    getCategoryNo: (this: Therefore, CategoryName: string) => Promise<number | undefined>;
    getCategoryInfo: (this: Therefore, CategoryNo: number) => Promise<ICategoryInfo>;
    executeMultiQuery: (this: Therefore, queries: import("./models/query.js").Query[], fullText?: string | undefined) => Promise<any>;
    executeSingleQuery: (this: Therefore, query: import("./models/query.js").Query, fullText?: string | undefined) => Promise<any>;
    uploadSessionStart: (this: Therefore, fileSize: number, fileExtension?: string | undefined) => Promise<string>;
    uploadSessionAppendChunkRaw: (this: Therefore, sessionId: string, chunkPosition: number | undefined, filePath: string) => Promise<any>;
}
export { Therefore };
export { CategoriesTree };
export { TreeItem };
export { TheCase };
export { CounterMode };
export { TheDocument };
export { ItemType };
export { FieldType };
export { WSIndexDataItem };
export { StringIndexData };
export { WSStreamInfoWithData };
export { ICategoryInfo };
export { IGetCaseDocumentsResponse };
export { DateIndexData };
export { IntIndexData };
export { QueryMode };
