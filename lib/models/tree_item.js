export class TreeItem {
    constructor(childItems, folderType, guid, itemNo, itemType, name, parentCaseDefNo, parentFolderNo) {
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
