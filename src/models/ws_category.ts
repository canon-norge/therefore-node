import { IWSCategory } from "../interfaces/ws_category";

export class WSCategory implements IWSCategory {
    CategoryNo: number;
    Guid: String | undefined;
    Name: String | null;
    ParentFolderNo: number;
    Title: String | null;
    Version: number;

    constructor(
        categoryNo: number,
        guid: String | undefined,
        name: String | null,
        parentFolderNo: number,
        title: String | null,
        version: number
    ){
        this.CategoryNo = categoryNo
        this.Guid = guid
        this.Name = name
        this.ParentFolderNo = parentFolderNo
        this.Title = title
        this.Version = version
    }
}