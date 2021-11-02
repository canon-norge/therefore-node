export interface ITreeItem {
    ChildItems: ITreeItem[];
    FolderType: number;
    Guid: string;
    ItemNo: number;
    ItemType: number;
    Name: string;
    ParentCaseDefNo: number;
    ParentFolderNo: number;
}
