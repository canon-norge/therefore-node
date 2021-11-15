(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["therefore-node"] = {}));
})(this, (function (exports) { 'use strict';

  class CategoriesTree {
      TreeItems;
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
      // DateIndexData: DateIndexData | null;
      // IntIndexData: IntIndexData | null;
      // LogicalIndexData: LogicalIndexData | null;
      // MoneyIndexData: MoneyIndexData | null;
      // MultipleKeywordData: MultipleKeywordData | null;
      // SingleKeywordData: SingleKeywordData | null;
      // StringIndexData: StringIndexData | null;
      // TableIndexData: TableIndexData | null; // ITableIndexData |
      // AccessMask: AccessMask | null; // IAccessMask |
      // DateTimeIndexData: DateTimeIndexData | null; // IDateTimeIndexData |
      FieldNo;
      DataValue;
      FieldName;
      constructor(fieldNo, dataValue, fieldName) {
          this.FieldNo = fieldNo;
          this.DataValue = dataValue;
          this.FieldName = fieldName;
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

  require('isomorphic-fetch');
  class DocumentOperations {
      async createDocument(document) {
          console.log(`Creating Document...`);
          const body = document;
          const request = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.authHeader,
              },
              body: JSON.stringify(body),
          };
          const response = await fetch(this.url + this.apiVersion + 'CreateDocument', request);
          if (!response.ok) {
              console.error(response.body);
          }
          const data = (await response.json());
          return data;
      }
      async getDocument(docNo, isCheckOutStatusNeeded, isIndexDataValuesNeeded, isStreamsInfoAndDataNeeded, isStreamsInfoNeeded, versionNo, isAccessMaskNeeded, titleHideCategory) {
          console.log(`Getting Document...`);
          const body = {
              "DocNo": docNo,
              "IsCheckOutStatusNeeded": isCheckOutStatusNeeded,
              "IsIndexDataValuesNeeded": isIndexDataValuesNeeded,
              "IsStreamsInfoAndDataNeeded": isStreamsInfoAndDataNeeded,
              "IsStreamsInfoNeeded": isStreamsInfoNeeded,
              "VersionNo": versionNo,
              "IsAccessMaskNeeded": isAccessMaskNeeded,
              "TitleHideCategory": titleHideCategory,
          };
          const request = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.authHeader,
              },
              body: JSON.stringify(body),
          };
          if (this.tenant != null) {
              request.headers = { ...request.headers, ...{ 'TenantName': this.tenant } };
          }
          const response = await fetch(this.url + this.apiVersion + 'GetDocument', request);
          const data = (await response.json());
          return data;
      }
      /**
       *
       * @param checkInComments
       * The Check-in comment.
       * @param docNo
       * Number of the document that will be updated.
       * @param indexData
       * Index data items to update/add/delete a document.
       * @param streamNosToDelete
       * The streams to delete out of the document.
       * @param streamsToUpdate
       * The streams to update/add a document.
       * @param conversionOptions
       * Specifies options to convert the files.
       * @param fileUploadSessions
       * Represents list of file upload sessions to be used to store files within the document.
       * See the UploadSessionStart and UploadSessionAppendChunk methods for more details.
       */
      async updateDocument(checkInComments, docNo, indexData, streamNosToDelete, streamsToUpdate, conversionOptions, fileUploadSessions) {
          console.log(`Updating Document...`);
          const body = {
              "CheckInComments": checkInComments,
              "DocNo": docNo,
              "IndexData": indexData,
              "StreamNosToDelete": streamNosToDelete,
              "StreamsToUpdate": streamsToUpdate,
              "ConversionOptions": conversionOptions,
              "FileUploadSessions": fileUploadSessions
          };
          const request = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.authHeader,
              },
              body: JSON.stringify(body),
          };
          if (this.tenant != null) {
              request.headers = { ...request.headers, ...{ 'TenantName': this.tenant } };
          }
          const response = await fetch(this.url + this.apiVersion + 'UpdateDocument', request);
          const data = (await response.json());
          return data;
      }
  }

  require('isomorphic-fetch');
  class CategoryOperations {
      async getCategoriesTree() {
          const body = {};
          const request = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.authHeader,
              },
              body: JSON.stringify(body),
          };
          console.log('Getting Categories tree...');
          const response = await fetch(this.url + this.apiVersion + 'GetCategoriesTree', request);
          if (response.status === 500) {
              let body = await response.text();
              console.error(body);
              throw new Error('Getting Categories tree failed');
          }
          const data = (await response.json());
          return data;
      }
      async getCategoryNo(CategoryName) {
          let categoriesTree = await this.getCategoriesTree();
          let resultTreeItem = recursiveCategoriesTreeFindCategory(categoriesTree, CategoryName);
          if (resultTreeItem) {
              return resultTreeItem.ItemNo;
          }
          else {
              return undefined;
          }
      }
      async getCategoryInfo(CategoryNo) {
          const body = {
              CategoryNo: CategoryNo,
          };
          const request = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.authHeader,
              },
              body: JSON.stringify(body),
          };
          if (this.tenant != null) {
              request.headers = { ...request.headers, ...{ 'TenantName': this.tenant } };
          }
          console.log(request);
          console.log(`Getting CategoryNo. ${CategoryNo} info...`);
          const response = await fetch(this.url + this.apiVersion + 'GetCategoryInfo', request);
          const data = (await response.json());
          return data;
      }
  }

  class CaseOperations {
      async closeCase(caseNo) {
          const body = {
              CaseNo: caseNo,
          };
          const request = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.authHeader,
              },
              body: JSON.stringify(body),
          };
          const response = await fetch(this.url + this.apiVersion + 'CloseCase', request);
          if (response.status === 500) {
              let body = await response.text();
              console.error(body);
              throw new Error('Getting Categories tree failed');
          }
          return;
      }
  }
  // async createCase(theCase: TheCase): Promise<TheCase> {
  //   const body = theCase;
  //     const request = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: this.client.authHeader,
  //       },
  //       body: JSON.stringify(body),
  //     };
  //     const response = await fetch(this.client.url + this.client.apiVersion + 'CreateCase', request);
  //     if (response.status === 500) {
  //       let body = await response.text();
  //       console.error(body);
  //       throw new Error('Getting Categories tree failed');
  //     }
  //     const data: TheCase = (await response.json()) as TheCase;
  //     return data;
  // }
  // async deleteCase(caseNo: number): Promise<void> {
  //   const body = {
  //       CaseNo: caseNo,
  //     };
  //     const request = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: this.client.authHeader,
  //       },
  //       body: JSON.stringify(body),
  //     };
  //     const response = await fetch(this.client.url + this.client.apiVersion + 'DeleteCase', request);
  //     if (response.status === 500) {
  //       let body = await response.text();
  //       console.error(body);
  //       throw new Error('Getting Categories tree failed');
  //     }
  //     return;
  // }
  // async getCase(caseNo: number): Promise<TheCase> {
  //   const body = {
  //       CaseNo: caseNo,
  //     };
  //     const request = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: this.client.authHeader,
  //       },
  //       body: JSON.stringify(body),
  //     };
  //     const response = await fetch(this.client.url + this.client.apiVersion + 'GetCase', request);
  //     if (response.status === 500) {
  //       let body = await response.text();
  //       console.error(body);
  //       throw new Error('Getting Categories tree failed');
  //     }
  //     const data: TheCase = (await response.json()) as TheCase;
  //     return data;
  // }
  // async getCaseDefinition(caseDeifinitionNo: number, isAccessMaskNeeded: boolean | undefined, isSearchFieldOrderNeeded?: boolean): Promise<TheCaseDefinition>{
  //   const body = {
  //       CaseDefinitionNo: caseDeifinitionNo,
  //       IsAccessMaskNeeded: isAccessMaskNeeded,
  //       IsSearchFieldOrderNeeded: isSearchFieldOrderNeeded,
  //     };
  //     const request = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: this.client.authHeader,
  //       },
  //       body: JSON.stringify(body),
  //     };
  //     const response = await fetch(this.client.url + this.client.apiVersion + 'GetCaseDefinition', request);
  //     if (response.status === 500) {
  //       let body = await response.text();
  //       console.error(body);
  //       throw new Error('Getting Categories tree failed');
  //     }
  //     const data: TheCaseDefinition = (await response.json()) as TheCaseDefinition;
  //     return data;

  var Buffer = require('buffer/').Buffer;
  require('isomorphic-fetch');
  class Therefore {
      url;
      username;
      password;
      tenant;
      authHeader;
      apiVersion;
      constructor(url, username, password, tenant) {
          url.slice(-1) == '/' ? (this.url = url) : (this.url = url + '/');
          this.username = username;
          this.password = password;
          this.tenant = tenant;
          this.authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
          this.apiVersion = 'theservice/v0001/restun/';
      }
      //Document Operations
      getDocument = DocumentOperations.prototype.getDocument;
      updateDocument = DocumentOperations.prototype.updateDocument;
      //Case Operations
      closeCase = CaseOperations.prototype.closeCase;
      //Category Operations
      getCategoriesTree = CategoryOperations.prototype.getCategoriesTree;
      getCategoryNo = CategoryOperations.prototype.getCategoryNo;
      getCategoryInfo = CategoryOperations.prototype.getCategoryInfo;
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
