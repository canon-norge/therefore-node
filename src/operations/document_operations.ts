import { ICategoryInfo } from '../interfaces/category_info';
import { ITheDocumentResponse } from '../interfaces/the_document_response';
import { TheDocument } from '../models/the_document';
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
    const data: ICategoryInfo = (await response.json()) as any;
    return data;
  }

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
        },
        body: JSON.stringify(body),
      };
  
      const response = await fetch(this.url + this.apiVersion + 'GetDocument', request);
      const data: ITheDocumentResponse = (await response.json()) as ITheDocumentResponse;
      return data;
    }
}
