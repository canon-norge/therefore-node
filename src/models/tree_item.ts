// @ts-ignore
import { ItemType } from '../enums/item_type.js';
import { ITreeItem } from '../interfaces/tree_item';

export class TreeItem implements ITreeItem {
  ChildItems: TreeItem[];
  FolderType: number;
  Guid: string;
  ItemNo: number;
  ItemType: number;
  Name: string;
  ParentCaseDefNo: number;
  ParentFolderNo: number;

  constructor(
    childItems: TreeItem[],
    folderType: number,
    guid: string,
    itemNo: number,
    itemType: number,
    name: string,
    parentCaseDefNo: number,
    parentFolderNo: number,
  ) {
    this.ChildItems = childItems;
    this.FolderType = folderType;
    this.Guid = guid;
    this.ItemNo = itemNo;
    this.ItemType = itemType;
    this.Name = name;
    this.ParentCaseDefNo = parentCaseDefNo;
    this.ParentFolderNo = parentFolderNo;
  }
}
