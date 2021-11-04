import { TreeItem } from '../therefore-node';
import { ICategoriesTree } from '../interfaces/categories_tree';
export declare class CategoriesTree implements ICategoriesTree {
    TreeItems: TreeItem[];
    constructor(treeItems: TreeItem[]);
}
