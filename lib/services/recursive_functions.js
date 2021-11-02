import { ItemType } from '../enums/item_type.js';
export const recursiveCategoriesTreePrint = (categoriesTree) => {
    categoriesTree.TreeItems.forEach((treeItem) => recursiveTreeItemPrint(treeItem));
};
export const recursiveTreeItemPrint = (treeItem) => {
    console.log(`ItemName: ${treeItem.Name}, ItemType: ${ItemType[treeItem.ItemType]}`);
    if (treeItem.ChildItems.length > 0)
        treeItem.ChildItems.forEach((childItem) => recursiveTreeItemPrint(childItem));
};
export const recursiveCategoriesTreeFindCategory = (categoriesTree, categoryName) => {
    let result;
    const setResult = (treeItem) => (result = treeItem);
    categoriesTree.TreeItems.forEach((treeItem) => recursiveTreeItemPrintFindCategory(treeItem, categoryName, setResult));
    return result;
};
export const recursiveTreeItemPrintFindCategory = (treeItem, categoryName, callback) => {
    let categoryFound = false;
    if (treeItem.Name === categoryName && treeItem.ItemType === ItemType.Category) {
        callback(treeItem);
        categoryFound = true;
    }
    if (!categoryFound && treeItem.ChildItems.length > 0)
        treeItem.ChildItems.forEach((childItem) => recursiveTreeItemPrintFindCategory(childItem, categoryName, callback));
};
