// import 'whatwg-fetch'
var Buffer = require('buffer/').Buffer
import { CategoriesTree } from './models/categories_tree.js';
import { ICategoryInfo } from './interfaces/category_info.js';
import { CounterMode } from './enums/counter_mode.js';
import { TreeItem } from './models/tree_item.js';
import { TheDocument } from './models/the_document.js';
import { ItemType } from './enums/item_type.js';
import { recursiveCategoriesTreeFindCategory, recursiveCategoriesTreePrint } from './services/recursive_functions.js';
import { FieldType } from './enums/field_type.js';
import { WSIndexDataItem } from './models/ws_index_data_item.js';
import { StringIndexData } from './models/string_index_data.js';
import { WSStreamInfoWithData } from './models/ws_stream_info_with_data.js';

class Therefore {
  url: string;
  username: string;
  password: string;

  constructor(url: string, username: string, password: string) {
    url.slice(-1) == '/' ? (this.url = url) : (this.url = url + '/');
    this.username = username;
    this.password = password;
  }

  apiVersion: string = 'theservice/v0001/restun/';

  getAuthorization(): string {
    return 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');
  }

  async getCategoriesTree(): Promise<CategoriesTree> {
    const body = {};
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorization(),
      },
      body: JSON.stringify(body),
    };
    console.log('Getting Categories tree...');
    console.log(this.url)
    console.log(request.body)
    const response = await window.fetch(this.url + this.apiVersion + 'GetCategoriesTree', request);
    if(response.status === 500){
      let body = await response.text();
      console.error(body)
      throw new Error("Getting Categories tree failed");
    }
    const data: CategoriesTree = (await response.json()) as CategoriesTree;
    return data;
  }

  async getCategoryNo(CategoryName: string): Promise<number | undefined> {
    let categoriesTree = await this.getCategoriesTree();
    let results: number[] = [];

    return categoriesTree.TreeItems.find((treeItem) => treeItem.Name === CategoryName)?.ItemNo;
  }

  // _recursiveCategoryNoSearch = (objectToSearch: TreeItem, categoryNoToFind: number,resultArray :number[]) => {
  //     objectToSearch.
  //     if (objectToSearch.ChildItems !== undefined){

  //     }
  // }

  async getCategoryInfo(CategoryNo: number): Promise<ICategoryInfo> {
    const body = {
      CategoryNo: CategoryNo,
    };
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorization(),
      },
      body: JSON.stringify(body),
    };
    console.log(`Getting CategoryNo. ${CategoryNo} info...`);
    const response = await fetch(this.url + this.apiVersion + 'GetCategoryInfo', request);
    const data: ICategoryInfo = (await response.json()) as any;
    return data;
  }

  async createDocument(doucment: TheDocument) {
    console.log(`Creating Document...`);

    const body = doucment;
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorization(),
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(this.url + this.apiVersion + 'CreateDocument', request);
    const data: ICategoryInfo = (await response.json()) as any;
    return data;
  }
}

export { Therefore };
export { CategoriesTree };
export { TreeItem };
export { CounterMode };
export { TheDocument };
export { ItemType };
export { recursiveCategoriesTreePrint };
export { recursiveCategoriesTreeFindCategory };
export { FieldType };
export { WSIndexDataItem };
export { StringIndexData };
export { WSStreamInfoWithData };
