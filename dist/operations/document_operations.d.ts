import { ICategoryInfo } from '../interfaces/category_info';
import { ITheDocumentResponse } from '../interfaces/the_document_response';
import { IUpdateDocumentResponse } from '../interfaces/update_document_response';
import { ConversionOptions } from '../models/conversion_options';
import { TheDocument } from '../models/the_document';
import { WSIndexDataItem } from '../models/ws_index_data_item';
import { WSStreamInfoUploadSessionData } from '../models/ws_stream_info_upload_session_data';
import { WSStreamInfoWithData } from '../models/ws_stream_info_with_data';
import { Therefore } from '../therefore-node';
export declare class DocumentOperations {
    createDocument(this: Therefore, document: TheDocument): Promise<ICategoryInfo>;
    getDocument(this: Therefore, docNo: number, isCheckOutStatusNeeded: boolean | undefined, isIndexDataValuesNeeded: boolean | undefined, isStreamsInfoAndDataNeeded: boolean | undefined, isStreamsInfoNeeded: boolean | undefined, versionNo: number | undefined, isAccessMaskNeeded: boolean | undefined, titleHideCategory: boolean | undefined): Promise<ITheDocumentResponse>;
    /**
     *
     * @param checkInComments
     * The Check-in comment.
     * @param docNo
     * Number of the document that will be updated.
     * @param indexData
     * Index data items to update/add/delete a document.
     * @param streamNosToDelete
     * The streams to delete out of the document.
     * @param streamsToUpdate
     * The streams to update/add a document.
     * @param conversionOptions
     * Specifies options to convert the files.
     * @param fileUploadSessions
     * Represents list of file upload sessions to be used to store files within the document.
     * See the UploadSessionStart and UploadSessionAppendChunk methods for more details.
     */
    updateDocument(this: Therefore, checkInComments: string | null, docNo: number, indexData: {
        IndexDataItems: WSIndexDataItem[] | null;
        LastChangeTime: string;
        DoFillDependentFields: boolean | null;
    } | null, streamNosToDelete: number[], streamsToUpdate: WSStreamInfoWithData[], conversionOptions: ConversionOptions | null, fileUploadSessions: WSStreamInfoUploadSessionData[] | null): Promise<IUpdateDocumentResponse>;
}
