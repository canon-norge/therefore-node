var Buffer = require('buffer/').Buffer;
require('isomorphic-fetch');
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
import { DocumentOperations } from './operations/document_operations.js';
import { CategoryOperations } from './operations/category_operations.js';
import { CaseOperations } from './operations/case_operations.js';
import { TheCase } from './models/the_case.js';
import { IGetCaseDocumentsResponse } from './interfaces/get_case_documents_response.js';
import { QueryOperations } from './operations/query_operations.js';
import { DateIndexData } from './models/date_index_data.js';
import { IntIndexData } from './models/int_index_data.js';
class Therefore {
  url: string;
  username: string;
  password: string;
  authHeader: string;
  apiVersion: string;
  tenant?: string;

  constructor(url: string, username: string, password: string, tenant?: string) {
    url.slice(-1) == '/' ? (this.url = url) : (this.url = url + '/');
    this.username = username;
    this.password = password;
    this.authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    this.apiVersion = 'theservice/v0001/restun/';
    this.tenant = tenant
  }

  //Document operations
  public getDocument = DocumentOperations.prototype.getDocument
  public getDocumentStream = DocumentOperations.prototype.getDocumentStream
  //Case Operations
  public getCaseDefinition = CaseOperations.prototype.getCaseDefinition
  public createCase = CaseOperations.prototype.createCase
  public closeCase = CaseOperations.prototype.closeCase
  public updateCase = CaseOperations.prototype.updateCase
  public deleteCase = CaseOperations.prototype.deleteCase
  public getCase = CaseOperations.prototype.getCase
  public getCaseDocuments = CaseOperations.prototype.getCaseDocuments
  public saveCaseIndexDataQuick = CaseOperations.prototype.saveCaseIndexDataQuick
  //Category Operations
  public getCategoriesTree = CategoryOperations.prototype.getCategoriesTree
  public getCategoryNo = CategoryOperations.prototype.getCategoryNo
  public getCategoryInfo = CategoryOperations.prototype.getCategoryInfo
  //Query Operations
  public executeMultiQuery = QueryOperations.prototype.executeMultiQuery
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
export { ICategoryInfo }
export { IGetCaseDocumentsResponse }
export { DateIndexData }
export { IntIndexData }
