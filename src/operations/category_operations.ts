import { ICategoryInfo } from '../interfaces/category_info';
import { CategoriesTree, recursiveCategoriesTreeFindCategory, Therefore, TreeItem } from '../therefore-node';

require('isomorphic-fetch');

export class CategoryOperations {
  client: Therefore;
  constructor(client: Therefore) {
    this.client = client;
  }
  async getCategoriesTree(): Promise<CategoriesTree> {
    const body = {};
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.client.authHeader,
      },
      body: JSON.stringify(body),
    };
    console.log('Getting Categories tree...');
    const response = await fetch(this.client.url + this.client.apiVersion + 'GetCategoriesTree', request);
    if (response.status === 500) {
      let body = await response.text();
      console.error(body);
      throw new Error('Getting Categories tree failed');
    }
    const data: CategoriesTree = (await response.json()) as CategoriesTree;
    return data;
  }

  async getCategoryNo(CategoryName: string): Promise<number | undefined> {
    let categoriesTree = await this.getCategoriesTree();
    let results: number[] = [];

    let resultTreeItem: TreeItem | undefined = recursiveCategoriesTreeFindCategory(categoriesTree, CategoryName);
    if(resultTreeItem){
        return resultTreeItem.ItemNo
    } else {
        return undefined
    }
  }

  async getCategoryInfo(CategoryNo: number): Promise<ICategoryInfo> {
    const body = {
      CategoryNo: CategoryNo,
    };
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.client.authHeader,
      },
      body: JSON.stringify(body),
    };
    console.log(`Getting CategoryNo. ${CategoryNo} info...`);
    const response = await fetch(this.client.url + this.client.apiVersion + 'GetCategoryInfo', request);
    const data: ICategoryInfo = (await response.json()) as any;
    return data;
  }
}
