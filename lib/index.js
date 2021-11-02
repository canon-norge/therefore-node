var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import { CategoriesTree } from './models/categories_tree.js';
import { CounterMode } from './enums/counter_mode.js';
import { TreeItem } from './models/tree_item.js';
import { TheDocument } from './models/the_document.js';
import { ItemType } from './enums/item_type.js';
import { recursiveCategoriesTreeFindCategory, recursiveCategoriesTreePrint } from './services/recursive_functions.js';
import { FieldType } from './enums/field_type.js';
import { WSIndexDataItem } from './models/ws_index_data_item.js';
import { StringIndexData } from './models/string_index_data.js';
import { WSStreamInfoWithData } from './models/ws_stream_info_with_data.js';
class Therefore {
    constructor(url, username, password) {
        this.apiVersion = 'theservice/v0001/restun/';
        url.slice(-1) == '/' ? (this.url = url) : (this.url = url + '/');
        this.username = username;
        this.password = password;
    }
    getAuthorization() {
        return 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    getCategoriesTree() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {};
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.getAuthorization(),
                },
                body: JSON.stringify(body),
            };
            console.log('Getting Categories tree...');
            const response = yield fetch(this.url + this.apiVersion + 'GetCategoriesTree', request);
            const data = (yield response.json());
            return data;
        });
    }
    getCategoryNo(CategoryName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let categoriesTree = yield this.getCategoriesTree();
            let results = [];
            return (_a = categoriesTree.TreeItems.find((treeItem) => treeItem.Name === CategoryName)) === null || _a === void 0 ? void 0 : _a.ItemNo;
        });
    }
    // _recursiveCategoryNoSearch = (objectToSearch: TreeItem, categoryNoToFind: number,resultArray :number[]) => {
    //     objectToSearch.
    //     if (objectToSearch.ChildItems !== undefined){
    //     }
    // }
    getCategoryInfo(CategoryNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                CategoryNo: CategoryNo,
            };
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.getAuthorization(),
                },
                body: JSON.stringify(body),
            };
            console.log(`Getting CategoryNo. ${CategoryNo} info...`);
            const response = yield fetch(this.url + this.apiVersion + 'GetCategoryInfo', request);
            const data = (yield response.json());
            return data;
        });
    }
    createDocument(doucment) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Creating Document...`);
            const body = doucment;
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.getAuthorization(),
                },
                body: JSON.stringify(body),
            };
            const response = yield fetch(this.url + this.apiVersion + 'CreateDocument', request);
            const data = (yield response.json());
            return data;
        });
    }
}
export default Therefore;
export { CategoriesTree };
export { TreeItem };
export { CounterMode };
export { TheDocument };
export { ItemType };
export { recursiveCategoriesTreePrint };
export { recursiveCategoriesTreeFindCategory };
export { FieldType };
export { WSIndexDataItem };
export { StringIndexData };
export { WSStreamInfoWithData };
