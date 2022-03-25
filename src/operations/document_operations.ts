import { ICategoryInfo } from '../interfaces/category_info';
import { ITheDocumentResponse } from '../interfaces/the_document_response';
import { ConversionOptions } from '../models/conversion_options';
import { TheDocument } from '../models/the_document';
import { WSIndexDataItem } from '../models/ws_index_data_item';
import { WSStreamInfoUploadSessionData } from '../models/ws_stream_info_upload_session_data';
import { WSStreamInfoWithData } from '../models/ws_stream_info_with_data';
import { WebApi } from '../services/web_api.service';
import { Therefore } from '../therefore-node';
export class DocumentOperations {
  
  async createDocument(this: Therefore, document: TheDocument) {

    const body = document

    const data = await WebApi.prototype.post.call(this,'CreateDocument', body)

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
    isCheckOutStatusNeeded?: boolean,
    isIndexDataValuesNeeded?: boolean,
    isStreamsInfoAndDataNeeded?: boolean,
    isStreamsInfoNeeded?: boolean,
    versionNo?: number,
    isAccessMaskNeeded?: boolean,
    titleHideCategory?: boolean
    ): Promise<TheDocument>{
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
      
      const data = await WebApi.prototype.post.call(this,'GetDocument', body)

      return data;
    }

    async getDocumentStream(
      this: Therefore,
      docNo: number,
      streamNo: number,
      versionNo?: number
      ): Promise<WSStreamInfoWithData>{
        console.log(`Getting Document Stream...`);
  
        const body = {
          "DocNo": docNo,
          "StreamNo": streamNo,
          "VersionNo": versionNo
        };

        const data = await WebApi.prototype.post.call(this,'GetDocumentStream', body)

        return data;
      }
}
