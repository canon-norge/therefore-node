import { ICategoryInfo } from '../interfaces/category_info';
import { ITheDocumentResponse } from '../interfaces/the_document_response';
import { TheDocument } from '../models/the_document';
import { WSStreamInfoWithData } from '../models/ws_stream_info_with_data';
import { Therefore } from '../therefore-node';
export declare class DocumentOperations {
    createDocument(this: Therefore, document: TheDocument): Promise<ICategoryInfo>;
    /**
     * Retrieves document by DocNo from Therefore
     * @param this ThereforeClient
     * @param docNo Document Number for document to be retrieved
     * @param isCheckOutStatusNeeded
     * @param isIndexDataValuesNeeded Get Category IndexData
     * @param isStreamsInfoAndDataNeeded Get Streams info and files
     * @param isStreamsInfoNeeded Get Streams info only
     * @param versionNo Specify which document version to get
     * @param isAccessMaskNeeded
     * @param titleHideCategory
     * @returns TheDocument
     */
    getDocument(this: Therefore, docNo: number, isCheckOutStatusNeeded: boolean | undefined, isIndexDataValuesNeeded: boolean | undefined, isStreamsInfoAndDataNeeded: boolean | undefined, isStreamsInfoNeeded: boolean | undefined, versionNo: number | undefined, isAccessMaskNeeded: boolean | undefined, titleHideCategory: boolean | undefined): Promise<ITheDocumentResponse>;
    getDocumentStream(this: Therefore, docNo: number, streamNo: number, versionNo?: number): Promise<WSStreamInfoWithData>;
}
