import { ICategoryInfo } from '../interfaces/category_info';
import { ITheDocumentResponse } from '../interfaces/the_document_response';
import { TheDocument } from '../models/the_document';
import { WSStreamInfoWithData } from '../models/ws_stream_info_with_data';
import { Therefore } from '../therefore-node';
export declare class DocumentOperations {
    createDocument(this: Therefore, document: TheDocument): Promise<ICategoryInfo>;
    getDocument(this: Therefore, docNo: number, isCheckOutStatusNeeded: boolean | undefined, isIndexDataValuesNeeded: boolean | undefined, isStreamsInfoAndDataNeeded: boolean | undefined, isStreamsInfoNeeded: boolean | undefined, versionNo: number | undefined, isAccessMaskNeeded: boolean | undefined, titleHideCategory: boolean | undefined): Promise<ITheDocumentResponse>;
    getDocumentStream(this: Therefore, docNo: number, streamNo: number, versionNo?: number): Promise<WSStreamInfoWithData>;
}
