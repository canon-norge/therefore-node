import { ITreeItem } from '../interfaces/tree_item';
export declare class TreeItem implements ITreeItem {
    ChildItems: TreeItem[];
    FolderType: number;
    Guid: string;
    ItemNo: number;
    ItemType: number;
    Name: string;
    ParentCaseDefNo: number;
    ParentFolderNo: number;
    constructor(childItems: TreeItem[], folderType: number, guid: string, itemNo: number, itemType: number, name: string, parentCaseDefNo: number, parentFolderNo: number);
}
