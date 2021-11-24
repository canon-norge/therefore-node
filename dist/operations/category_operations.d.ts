import { ICategoryInfo } from '../interfaces/category_info';
import { CategoriesTree, Therefore } from '../therefore-node';
export declare class CategoryOperations {
    getCategoriesTree(this: Therefore): Promise<CategoriesTree>;
    getCategoryInfo(this: Therefore, CategoryNo: number): Promise<ICategoryInfo>;
}
