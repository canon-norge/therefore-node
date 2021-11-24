import { ICategoryInfo } from '../interfaces/category_info';
import { CategoriesTree, Therefore, TreeItem } from '../therefore-node';

require('isomorphic-fetch');

export class CategoryOperations {

  async getCategoriesTree(this: Therefore): Promise<CategoriesTree> {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
    };

    if(this.tenant != null){
      request.headers = {...request.headers, ...{'TenantName': this.tenant}}
    }
    
    console.log('Getting Categories tree...');
    const response = await fetch(this.url + this.apiVersion + 'GetCategoriesTree', request);
    if (response.status === 500) {
      let body = await response.text();
      console.error(body);
      throw new Error('Getting Categories tree failed');
    }
    const data: CategoriesTree = (await response.json()) as CategoriesTree;
    return data;
  }

  // async getCategoryNo(this: Therefore, CategoryName: string): Promise<number | undefined> {
  //   let categoriesTree = await this.getCategoriesTree();
  //   let results: number[] = [];

  //   let resultTreeItem: TreeItem | undefined = recursiveCategoriesTreeFindCategory(categoriesTree, CategoryName);
  //   if(resultTreeItem){
  //       return resultTreeItem.ItemNo
  //   } else {
  //       return undefined
  //   }
  // }

  async getCategoryInfo(this: Therefore, CategoryNo: number): Promise<ICategoryInfo> {
    const body = {
      CategoryNo: CategoryNo,
    };
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
      body: JSON.stringify(body),
    };

    if(this.tenant != null){
      request.headers = {...request.headers, ...{'TenantName': this.tenant}}
    }

    console.log(request)
    console.log(`Getting CategoryNo. ${CategoryNo} info...`);
    const response = await fetch(this.url + this.apiVersion + 'GetCategoryInfo', request);
    const data: ICategoryInfo = (await response.json()) as any;
    return data;
  }
}
