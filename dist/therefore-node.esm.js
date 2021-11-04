class CategoriesTree {
    TreeItems;
    constructor(treeItems) {
        this.TreeItems = treeItems;
    }
}

var CounterMode;
(function (CounterMode) {
    CounterMode[CounterMode["Undefined"] = 0] = "Undefined";
    CounterMode[CounterMode["ClientCounter"] = 1] = "ClientCounter";
    CounterMode[CounterMode["ServerCounter"] = 2] = "ServerCounter";
})(CounterMode || (CounterMode = {}));

class TreeItem {
    ChildItems;
    FolderType;
    Guid;
    ItemNo;
    ItemType;
    Name;
    ParentCaseDefNo;
    ParentFolderNo;
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
    CategoryNo;
    IndexDataItems;
    Streams;
    DoFillDependentFields;
    WithAutoAppendMode;
    ConversionOptions;
    LastChangeTime;
    DontResetCategoryDefaults;
    FileUploadSessions;
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
        this.WithAutoAppendMode = 2;
        this.DoFillDependentFields = this.WithAutoAppendMode = this.ConversionOptions = this.FileUploadSessions = null;
    }
}

var ItemType;
(function (ItemType) {
    ItemType[ItemType["Root"] = 0] = "Root";
    ItemType[ItemType["Folder"] = 1] = "Folder";
    ItemType[ItemType["Category"] = 2] = "Category";
    ItemType[ItemType["CaseDefinition"] = 3] = "CaseDefinition";
})(ItemType || (ItemType = {}));

const recursiveCategoriesTreePrint = (categoriesTree) => {
    categoriesTree.TreeItems.forEach((treeItem) => recursiveTreeItemPrint(treeItem));
};
const recursiveTreeItemPrint = (treeItem) => {
    console.log(`ItemName: ${treeItem.Name}, ItemType: ${ItemType[treeItem.ItemType]}`);
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
    if (treeItem.Name === categoryName && treeItem.ItemType === ItemType.Category) {
        callback(treeItem);
        categoryFound = true;
    }
    if (!categoryFound && treeItem.ChildItems.length > 0)
        treeItem.ChildItems.forEach((childItem) => recursiveTreeItemPrintFindCategory(childItem, categoryName, callback));
};

var FieldType;
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
})(FieldType || (FieldType = {}));

class WSIndexDataItem {
    DateIndexData; //IDateIndexData |
    IntIndexData; // IIntIndexData |
    LogicalIndexData; // ILogicalIndexData |
    MoneyIndexData; // IMoneyIndexData |
    MultipleKeywordData; //IMultipleKeywordData |
    SingleKeywordData; // ISingleKeywordData |
    StringIndexData;
    TableIndexData; // ITableIndexData |
    AccessMask; // IAccessMask |
    DateTimeIndexData; // IDateTimeIndexData |
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
    FieldNo;
    DataValue;
    FieldName;
    constructor(fieldNo, dataValue, fieldName) {
        this.FieldNo = fieldNo;
        this.DataValue = dataValue;
        this.FieldName = fieldName;
    }
}

class WSStreamInfoWithData {
    FileData;
    FileName;
    StreamNo;
    constructor(fileData, fileName) {
        this.FileData = fileData;
        this.FileName = fileName;
        this.StreamNo = null;
    }
}

var Buffer = require('buffer/').Buffer;
require('isomorphic-fetch');
class Therefore {
    url;
    username;
    password;
    constructor(url, username, password) {
        url.slice(-1) == '/' ? (this.url = url) : (this.url = url + '/');
        this.username = username;
        this.password = password;
    }
    apiVersion = 'theservice/v0001/restun/';
    getAuthorization() {
        return 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    async getCategoriesTree() {
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
        const response = await fetch(this.url + this.apiVersion + 'GetCategoriesTree', request);
        if (response.status === 500) {
            let body = await response.text();
            console.error(body);
            throw new Error("Getting Categories tree failed");
        }
        const data = (await response.json());
        return data;
    }
    async getCategoryNo(CategoryName) {
        let categoriesTree = await this.getCategoriesTree();
        return categoriesTree.TreeItems.find((treeItem) => treeItem.Name === CategoryName)?.ItemNo;
    }
    // _recursiveCategoryNoSearch = (objectToSearch: TreeItem, categoryNoToFind: number,resultArray :number[]) => {
    //     objectToSearch.
    //     if (objectToSearch.ChildItems !== undefined){
    //     }
    // }
    async getCategoryInfo(CategoryNo) {
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
        const response = await fetch(this.url + this.apiVersion + 'GetCategoryInfo', request);
        const data = (await response.json());
        return data;
    }
    async createDocument(doucment) {
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
        const response = await fetch(this.url + this.apiVersion + 'CreateDocument', request);
        const data = (await response.json());
        return data;
    }
}

export { CategoriesTree, CounterMode, FieldType, ItemType, StringIndexData, TheDocument, Therefore, TreeItem, WSIndexDataItem, WSStreamInfoWithData, recursiveCategoriesTreeFindCategory, recursiveCategoriesTreePrint };
