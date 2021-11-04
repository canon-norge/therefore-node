import { CategoriesTree } from '../models/categories_tree.js';
import { TreeItem } from '../models/tree_item.js';
export declare const recursiveCategoriesTreePrint: (categoriesTree: CategoriesTree) => void;
export declare const recursiveTreeItemPrint: (treeItem: TreeItem) => void;
export declare const recursiveCategoriesTreeFindCategory: (categoriesTree: CategoriesTree, categoryName: string) => TreeItem | undefined;
export declare const recursiveTreeItemPrintFindCategory: (treeItem: TreeItem, categoryName: string, callback: (treeItem: TreeItem) => TreeItem | undefined) => void;
