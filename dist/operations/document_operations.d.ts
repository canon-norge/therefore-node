import { ICategoryInfo } from '../interfaces/category_info';
import { TheDocument } from '../models/the_document';
import { Therefore } from '../therefore-node';
export declare class DocumentOperations {
    client: Therefore;
    constructor(client: Therefore);
    createDocument(document: TheDocument): Promise<ICategoryInfo>;
}
