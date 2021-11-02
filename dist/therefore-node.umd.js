(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["therefore-node"] = {}));
})(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class CategoriesTree {
        constructor(treeItems) {
            this.TreeItems = treeItems;
        }
    }

    exports.CounterMode = void 0;
    (function (CounterMode) {
        CounterMode[CounterMode["Undefined"] = 0] = "Undefined";
        CounterMode[CounterMode["ClientCounter"] = 1] = "ClientCounter";
        CounterMode[CounterMode["ServerCounter"] = 2] = "ServerCounter";
    })(exports.CounterMode || (exports.CounterMode = {}));

    class TreeItem {
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

    class TheDocument {
        // constructor(categoryNo: number, indexDataItems: IWSIndexDataItem[] | null, streams: IWSStreamInfoWithData[] | null, doFillDependentFields: boolean | null, withAutoAppendMode: number | null, conversionOptions: IConversionOptions | null, lastchangeTime: string | undefined, dontResetCategoryDefaults: boolean | undefined, fileUploadSessions: IWSStreamInfoUploadSessionData[] | null) {
        //     this.CategoryNo = categoryNo
        //     this.IndexDataItems = indexDataItems
        //     this.Streams = streams
        //     this.DoFillDependentFields = doFillDependentFields
        //     this.WithAutoAppendMode = withAutoAppendMode
        //     this.ConversionOptions = conversionOptions
        //     this.LastChangeTime = lastchangeTime
        //     this.DontResetCategoryDefaults = dontResetCategoryDefaults
        //     this.FileUploadSessions = fileUploadSessions
        // }
        constructor(categoryNo, indexDataItems, streams) {
            this.CategoryNo = categoryNo;
            this.IndexDataItems = indexDataItems;
            this.Streams = streams;
            this.DoFillDependentFields = this.WithAutoAppendMode = this.ConversionOptions = this.FileUploadSessions = null;
        }
    }

    exports.ItemType = void 0;
    (function (ItemType) {
        ItemType[ItemType["Root"] = 0] = "Root";
        ItemType[ItemType["Folder"] = 1] = "Folder";
        ItemType[ItemType["Category"] = 2] = "Category";
        ItemType[ItemType["CaseDefinition"] = 3] = "CaseDefinition";
    })(exports.ItemType || (exports.ItemType = {}));

    const recursiveCategoriesTreePrint = (categoriesTree) => {
        categoriesTree.TreeItems.forEach((treeItem) => recursiveTreeItemPrint(treeItem));
    };
    const recursiveTreeItemPrint = (treeItem) => {
        console.log(`ItemName: ${treeItem.Name}, ItemType: ${exports.ItemType[treeItem.ItemType]}`);
        if (treeItem.ChildItems.length > 0)
            treeItem.ChildItems.forEach((childItem) => recursiveTreeItemPrint(childItem));
    };
    const recursiveCategoriesTreeFindCategory = (categoriesTree, categoryName) => {
        let result;
        const setResult = (treeItem) => (result = treeItem);
        categoriesTree.TreeItems.forEach((treeItem) => recursiveTreeItemPrintFindCategory(treeItem, categoryName, setResult));
        return result;
    };
    const recursiveTreeItemPrintFindCategory = (treeItem, categoryName, callback) => {
        let categoryFound = false;
        if (treeItem.Name === categoryName && treeItem.ItemType === exports.ItemType.Category) {
            callback(treeItem);
            categoryFound = true;
        }
        if (!categoryFound && treeItem.ChildItems.length > 0)
            treeItem.ChildItems.forEach((childItem) => recursiveTreeItemPrintFindCategory(childItem, categoryName, callback));
    };

    exports.FieldType = void 0;
    (function (FieldType) {
        FieldType[FieldType["StringField"] = 1] = "StringField";
        FieldType[FieldType["IntField "] = 2] = "IntField ";
        FieldType[FieldType["DateField"] = 3] = "DateField";
        FieldType[FieldType["LabelField"] = 4] = "LabelField";
        FieldType[FieldType["MoneyField"] = 5] = "MoneyField";
        FieldType[FieldType["LogicalField"] = 6] = "LogicalField";
        FieldType[FieldType["NumericCounter"] = 8] = "NumericCounter";
        FieldType[FieldType["TextCounter"] = 9] = "TextCounter";
        FieldType[FieldType["TableField"] = 10] = "TableField";
        FieldType[FieldType["CustomField"] = 99] = "CustomField";
    })(exports.FieldType || (exports.FieldType = {}));

    class WSIndexDataItem {
        constructor(stringIndexData) {
            this.DateIndexData =
                this.IntIndexData =
                    this.LogicalIndexData =
                        this.MoneyIndexData =
                            this.MultipleKeywordData =
                                this.SingleKeywordData =
                                    this.TableIndexData =
                                        this.AccessMask =
                                            this.DateTimeIndexData =
                                                null;
            this.StringIndexData = stringIndexData;
        }
    }

    class StringIndexData {
        constructor(fieldNo, dataValue, fieldName) {
            this.FieldNo = fieldNo;
            this.DataValue = dataValue;
            this.FieldName = fieldName;
        }
    }

    class WSStreamInfoWithData {
        constructor(fileData, fileName) {
            this.FileData = fileData;
            this.FileName = fileName;
            this.StreamNo = null;
        }
    }

    // import 'whatwg-fetch'
    var Buffer = require('buffer/').Buffer;
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
                console.log(this.url);
                console.log(request.body);
                const response = yield window.fetch(this.url + this.apiVersion + 'GetCategoriesTree', request);
                if (response.status === 500) {
                    let body = yield response.text();
                    console.error(body);
                    throw new Error("Getting Categories tree failed");
                }
                const data = (yield response.json());
                return data;
            });
        }
        getCategoryNo(CategoryName) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                let categoriesTree = yield this.getCategoriesTree();
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

    exports.CategoriesTree = CategoriesTree;
    exports.StringIndexData = StringIndexData;
    exports.TheDocument = TheDocument;
    exports.Therefore = Therefore;
    exports.TreeItem = TreeItem;
    exports.WSIndexDataItem = WSIndexDataItem;
    exports.WSStreamInfoWithData = WSStreamInfoWithData;
    exports.recursiveCategoriesTreeFindCategory = recursiveCategoriesTreeFindCategory;
    exports.recursiveCategoriesTreePrint = recursiveCategoriesTreePrint;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
