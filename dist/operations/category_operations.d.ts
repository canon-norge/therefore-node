import { ICategoryInfo } from '../interfaces/category_info';
import { CategoriesTree, Therefore } from '../therefore-node';
export declare class CategoryOperations {
    getCategoriesTree(this: Therefore): Promise<CategoriesTree>;
    getCategoryNo(this: Therefore, CategoryName: string): Promise<number | undefined>;
    getCategoryInfo(this: Therefore, CategoryNo: number): Promise<ICategoryInfo>;
}
