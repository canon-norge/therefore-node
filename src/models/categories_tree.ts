import { TreeItem } from '..';
import { ICategoriesTree } from '../interfaces/categories_tree';

export class CategoriesTree implements ICategoriesTree {
  TreeItems: TreeItem[];
  constructor(treeItems: TreeItem[]) {
    this.TreeItems = treeItems;
  }
}
