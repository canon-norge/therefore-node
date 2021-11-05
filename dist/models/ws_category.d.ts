import { IWSCategory } from "../interfaces/ws_category";
export declare class WSCategory implements IWSCategory {
    CategoryNo: number;
    Guid: String | undefined;
    Name: String | null;
    ParentFolderNo: number;
    Title: String | null;
    Version: number;
    constructor(categoryNo: number, guid: String | undefined, name: String | null, parentFolderNo: number, title: String | null, version: number);
}
