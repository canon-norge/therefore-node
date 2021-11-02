import { TreeItem } from '..';
import { ICategoriesTree } from '../interfaces/categories_tree';
export declare class CategoriesTree implements ICategoriesTree {
    TreeItems: TreeItem[];
    constructor(treeItems: TreeItem[]);
}
