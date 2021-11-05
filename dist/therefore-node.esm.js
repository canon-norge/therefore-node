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
    /**
     * @param categoryNo
     * The number of the category the document belongs to.
     * @param indexDataItems
     * Index data items of the document.
     * @param streams
     * Represents list of files to store within the document.
     * @param doFillDependentFields
     * Set to true or false to explicitly execute or skip FillDependentFields step while writing index data.
     * If not set or null the old behavior will be used.
     * That means the FillDependentFields step will be executed.
     * Note: In order to update primary and dependent fields you can: 1. specify both values (for primary and dependent) or just for primary.
     * In this case primary field will be used to lookup related value(s) for dependent field(s).
     * Value of dependent field(s) from the request will be ignored. 2. specify value of dependent field(s) only.
     * In this case if a unique primary field (related to given dependent field(s)) can be found it will be used.
     * Otherwise, if there are many values found for primary field an error will be returned.
     * @param withAutoAppendMode
     * Sets auto append mode for the document.
     * Null or omitted value means that auto append mode is Disabled.
     * With Enabled auto append mode use IndexDataItems to specify unique identifier of the document.
     * @param conversionOptions
     * Specifies options to convert the files.
     * @param fileUploadSessions
     * Represents list of file upload sessions to be used to store files within the document.
     * See the UploadSessionStart and UploadSessionAppendChunk methods for more details.
     */
    constructor(categoryNo, indexDataItems, streams = null, doFillDependentFields = null, withAutoAppendMode = null, conversionOptions = null, fileUploadSessions) {
        this.CategoryNo = categoryNo;
        this.IndexDataItems = indexDataItems;
        this.Streams = streams;
        this.DoFillDependentFields = doFillDependentFields;
        this.WithAutoAppendMode = withAutoAppendMode;
        this.ConversionOptions = conversionOptions;
        this.FileUploadSessions = fileUploadSessions;
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
    DateIndexData;
    IntIndexData;
    LogicalIndexData;
    MoneyIndexData;
    MultipleKeywordData;
    SingleKeywordData;
    StringIndexData;
    TableIndexData; // ITableIndexData |
    AccessMask; // IAccessMask |
    DateTimeIndexData; // IDateTimeIndexData |
    /**
     *
     * @param dateIndexData
     * @param intIndexData
     * @param logicalIndexData
     * @param moneyIndexData
     * @param multipleKeywordData
     * @param singleKeywordData
     * @param stringIndexData
     * @param tableIndexData
     * @param accessMask Gets access mask for index data field (column) for connected user.
     * @param dateTimeIndexData
     */
    constructor(dateIndexData, intIndexData, logicalIndexData, moneyIndexData, multipleKeywordData, singleKeywordData, stringIndexData, tableIndexData, accessMask, dateTimeIndexData) {
        this.DateIndexData = dateIndexData;
        this.IntIndexData = intIndexData;
        this.LogicalIndexData = logicalIndexData;
        this.MoneyIndexData = moneyIndexData,
            this.MultipleKeywordData = multipleKeywordData,
            this.SingleKeywordData = singleKeywordData;
        this.StringIndexData = stringIndexData,
            this.TableIndexData = tableIndexData,
            this.AccessMask = accessMask,
            this.DateTimeIndexData = dateTimeIndexData;
    }
}

class StringIndexData {
    FieldNo;
    DataValue;
    FieldName;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue
     * Gets or sets the string value of the field.
     * @param fieldName
     * Gets or sets the name (actually column name) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     */
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
    authHeader;
    apiVersion;
    constructor(url, username, password) {
        url.slice(-1) == '/' ? (this.url = url) : (this.url = url + '/');
        this.username = username;
        this.password = password;
        this.authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        this.apiVersion = 'theservice/v0001/restun/';
    }
}

export { CategoriesTree, CounterMode, FieldType, ItemType, StringIndexData, TheDocument, Therefore, TreeItem, WSIndexDataItem, WSStreamInfoWithData, recursiveCategoriesTreeFindCategory, recursiveCategoriesTreePrint };
