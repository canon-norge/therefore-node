import { ICategoryInfo } from '../interfaces/category_info';
import { IGetCaseDocumentsResponse } from '../interfaces/get_case_documents_response';
import { recursiveCategoriesTreeFindCategory } from '../services/recursive_functions';
import { WebApi } from '../services/web_api.service';
import { CategoriesTree, Therefore, TreeItem } from '../therefore-node';

require('isomorphic-fetch');

export class CategoryOperations {

  async getCategoriesTree(this: Therefore): Promise<CategoriesTree> {
    console.log('Getting Categories Tree')
    
    const data = await WebApi.prototype.post.call(this,'GetCategoriesTree', {})
    return data;
  }

  async getCategoryNo(this: Therefore, CategoryName: string): Promise<number | undefined> {
    console.log('Getting Category No')
    let categoriesTree = await CategoryOperations.prototype.getCategoriesTree.call(this)

    let resultTreeItem: TreeItem | undefined = recursiveCategoriesTreeFindCategory(categoriesTree, CategoryName);

    if(resultTreeItem){
        return resultTreeItem.ItemNo
    } else {
        return undefined
    }
  }

  async getCategoryInfo(this: Therefore, CategoryNo: number): Promise<ICategoryInfo> {
    console.log('Getting Category Info')

    const body = {
      CategoryNo: CategoryNo,
    };

    const data = await WebApi.prototype.post.call(this,'GetCategoryInfo', body)
    return data;
  }
}
