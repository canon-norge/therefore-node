import { ICategoryInfo } from '../interfaces/category_info';
import { CategoriesTree, Therefore } from '../therefore-node';
export declare class CategoryOperations {
    client: Therefore;
    constructor(client: Therefore);
    getCategoriesTree(): Promise<CategoriesTree>;
    getCategoryNo(CategoryName: string): Promise<number | undefined>;
    getCategoryInfo(CategoryNo: number): Promise<ICategoryInfo>;
}
