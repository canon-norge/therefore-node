import { ICategoryInfo } from '../interfaces/category_info';
import { ITheDocumentResponse } from '../interfaces/the_document_response';
import { ConversionOptions } from '../models/conversion_options';
import { TheDocument } from '../models/the_document';
import { WSIndexDataItem } from '../models/ws_index_data_item';
import { WSStreamInfoUploadSessionData } from '../models/ws_stream_info_upload_session_data';
import { WSStreamInfoWithData } from '../models/ws_stream_info_with_data';
import { Therefore } from '../therefore-node';

require('isomorphic-fetch');

export class DocumentOperations {
  
  async createDocument(this: Therefore, document: TheDocument) {
    console.log(`Creating Document...`);

    const body = document;
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(this.url + this.apiVersion + 'CreateDocument', request);
    if(!response.ok){
      console.error(response.body);
    }
    const data: ICategoryInfo = (await response.json()) as any;
    return data;
  }

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
  async getDocument(
    this: Therefore, 
    docNo: number, 
    isCheckOutStatusNeeded: boolean | undefined,
    isIndexDataValuesNeeded: boolean | undefined,
    isStreamsInfoAndDataNeeded: boolean | undefined,
    isStreamsInfoNeeded: boolean | undefined,
    versionNo: number | undefined,
    isAccessMaskNeeded: boolean | undefined,
    titleHideCategory: boolean | undefined
    ){
      console.log(`Getting Document...`);

      const body = {
        "DocNo": docNo,
        "IsCheckOutStatusNeeded": isCheckOutStatusNeeded,
        "IsIndexDataValuesNeeded": isIndexDataValuesNeeded,
        "IsStreamsInfoAndDataNeeded": isStreamsInfoAndDataNeeded,
        "IsStreamsInfoNeeded": isStreamsInfoNeeded,
        "VersionNo": versionNo,
        "IsAccessMaskNeeded": isAccessMaskNeeded,
        "TitleHideCategory": titleHideCategory,
      };
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authHeader,
          'TenantName': this.tenant ?? ''
        },
        body: JSON.stringify(body),
      };
  
      const response = await fetch(this.url + this.apiVersion + 'GetDocument', request);
      const data: ITheDocumentResponse = (await response.json()) as ITheDocumentResponse;
      return data;
    }

    async getDocumentStream(
      this: Therefore,
      docNo: number,
      streamNo: number,
      versionNo?: number
      ){
        console.log(`Getting Document...`);
  
        const body = {
          "DocNo": docNo,
          "StreamNo": streamNo,
          "VersionNo": versionNo
        };
        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.authHeader,
            'TenantName': this.tenant ?? ''
          },
          body: JSON.stringify(body),
        };
    
        const response = await fetch(this.url + this.apiVersion + 'GetDocumentStream', request);
        const data: WSStreamInfoWithData = (await response.json());
        return data;
      }

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
  // async updateDocument(
  //   this: Therefore,
  //   checkInComments: string | null,
  //   docNo: number,
  //   indexData: {
  //     IndexDataItems: WSIndexDataItem[] | null,
  //     LastChangeTime: string,
  //     DoFillDependentFields: boolean | null
  //   } | null,
  //   streamNosToDelete: number[],
  //   streamsToUpdate: WSStreamInfoWithData[],
  //   conversionOptions: ConversionOptions | null,
  //   fileUploadSessions: WSStreamInfoUploadSessionData[] | null,
  // ){
  //   console.log(`Updating Document...`);

  //     const body = {
  //       "CheckInComments": checkInComments,
  //       "DocNo": docNo,
  //       "IndexData": indexData,
  //       "StreamNosToDelete": streamNosToDelete,
  //       "StreamsToUpdate": streamsToUpdate,
  //       "ConversionOptions": conversionOptions,
  //       "FileUploadSessions": fileUploadSessions
  //     };
  //     const request = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: this.authHeader,
  //       },
  //       body: JSON.stringify(body),
  //     };

  //     if(this.tenant != null){
  //       request.headers = {...request.headers, ...{'TenantName': this.tenant}}
  //     }
  
  //     const response = await fetch(this.url + this.apiVersion + 'UpdateDocument', request);
  //     const data: IUpdateDocumentResponse = (await response.json()) as IUpdateDocumentResponse;
  //     return data;
  // }
}
