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
class Therefore {
  url: string;
  username: string;
  password: string;
  authHeader: string;
  apiVersion: string;
  tenant: string | null;

  constructor(url: string, username: string, password: string, tenant: string | null) {
    url.slice(-1) == '/' ? (this.url = url) : (this.url = url + '/');
    this.username = username;
    this.password = password;
    this.authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    this.apiVersion = 'theservice/v0001/restun/';
    this.tenant = tenant
  }

  public getDocument = DocumentOperations.prototype.getDocument;
  public getDocumentStream = DocumentOperations.prototype.getDocumentStream

  public getCaseDefinition = CaseOperations.prototype.getCaseDefinition;
  public createCase = CaseOperations.prototype.createCase

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
