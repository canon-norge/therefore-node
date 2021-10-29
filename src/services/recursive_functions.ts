import { ItemType } from '../enums/item_type.js';
import { CategoriesTree } from '../models/categories_tree.js';
import { TreeItem } from '../models/tree_item.js';

export const recursiveCategoriesTreePrint = (categoriesTree: CategoriesTree) => {
  categoriesTree.TreeItems.forEach((treeItem) => recursiveTreeItemPrint(treeItem));
};

export const recursiveTreeItemPrint = (treeItem: TreeItem) => {
  console.log(`ItemName: ${treeItem.Name}, ItemType: ${ItemType[treeItem.ItemType]}`);
  if (treeItem.ChildItems.length > 0) treeItem.ChildItems.forEach((childItem) => recursiveTreeItemPrint(childItem));
};

export const recursiveCategoriesTreeFindCategory = (
  categoriesTree: CategoriesTree,
  categoryName: string,
): TreeItem | undefined => {
  let result: TreeItem | undefined;
  const setResult = (treeItem: TreeItem) => (result = treeItem);
  categoriesTree.TreeItems.forEach((treeItem) => recursiveTreeItemPrintFindCategory(treeItem, categoryName, setResult));
  return result;
};

export const recursiveTreeItemPrintFindCategory = (
  treeItem: TreeItem,
  categoryName: string,
  callback: (treeItem: TreeItem) => TreeItem | undefined,
) => {
  let categoryFound = false;
  if (treeItem.Name === categoryName && treeItem.ItemType === ItemType.Category) {
    callback(treeItem);
    categoryFound = true;
  }
  if (!categoryFound && treeItem.ChildItems.length > 0)
    treeItem.ChildItems.forEach((childItem) => recursiveTreeItemPrintFindCategory(childItem, categoryName, callback));
};
