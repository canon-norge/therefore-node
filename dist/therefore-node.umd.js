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

  class WebApi {
      async post(endPoint, body) {
          let request = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.authHeader,
              },
          };
          if (body) {
              request = { ...request, ...{ body: JSON.stringify(body) } };
          }
          if (this.tenant) {
              request.headers = { ...request.headers, ...{ TenantName: this.tenant } };
          }
          console.log(request);
          const response = await fetch(this.url + this.apiVersion + endPoint, request);
          if (response.status === 500) {
              let body = await response.text();
              console.error(body);
              throw new Error(`POST ${endPoint} failed`);
          }
          return response.json();
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
                  'TenantName': this.tenant ?? ''
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
      /**
       * Retrieves document by DocNo from Therefore
       * @param this ThereforeClient
       * @param docNo Document Number for document to be retrieved
       * @param isCheckOutStatusNeeded
       * @param isIndexDataValuesNeeded Get Category IndexData
       * @param isStreamsInfoAndDataNeeded Get Streams info and files
       * @param isStreamsInfoNeeded Get Streams info only
       * @param versionNo Specify which document version to get
       * @param isAccessMaskNeeded
       * @param titleHideCategory
       * @returns TheDocument
       */
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
          const data = await WebApi.prototype.post.call(this, 'GetDocument', body);
          return data;
      }
      async getDocumentStream(docNo, streamNo, versionNo) {
          console.log(`Getting Document Stream...`);
          const body = {
              "DocNo": docNo,
              "StreamNo": streamNo,
              "VersionNo": versionNo
          };
          const data = await WebApi.prototype.post.call(this, 'GetDocumentStream', body);
          return data;
      }
  }

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

  require('isomorphic-fetch');
  class CategoryOperations {
      async getCategoriesTree() {
          console.log('Getting Categories Tree');
          const data = await WebApi.prototype.post.call(this, 'GetCategoriesTree', {});
          return data;
      }
      async getCategoryNo(CategoryName) {
          console.log('Getting Category No');
          let categoriesTree = await CategoryOperations.prototype.getCategoriesTree.call(this);
          let resultTreeItem = recursiveCategoriesTreeFindCategory(categoriesTree, CategoryName);
          if (resultTreeItem) {
              return resultTreeItem.ItemNo;
          }
          else {
              return undefined;
          }
      }
      async getCategoryInfo(CategoryNo) {
          console.log('Getting Category Info');
          const body = {
              CategoryNo: CategoryNo,
          };
          const data = await WebApi.prototype.post.call(this, 'GetCategoryInfo', body);
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
          if (this.tenant != null) {
              request.headers = { ...request.headers, ...{ TenantName: this.tenant } };
          }
          const response = await fetch(this.url + this.apiVersion + 'CloseCase', request);
          if (response.status === 500) {
              let body = await response.text();
              console.error(body);
              throw new Error('Getting Categories tree failed');
          }
          return;
      }
      async createCase(theCase) {
          console.log('Creating Case...');
          const data = await WebApi.prototype.post.call(this, 'CreateCase', theCase);
          return data;
      }
      async updateCase(theCase) {
          console.log('Updating Case...');
          const data = await WebApi.prototype.post.call(this, 'SaveCaseIndexData', theCase);
          return data;
      }
      async getCaseDefinition(caseDefinitionNo) {
          console.log('Getting CaseDefinition...');
          const body = {
              CaseDefinitionNo: caseDefinitionNo
          };
          const data = await WebApi.prototype.post.call(this, 'GetCaseDefinition', body);
          return data;
      }
      async deleteCase(caseNo) {
          console.log('Deleting Case...');
          const body = {
              CaseNo: caseNo,
          };
          await WebApi.prototype.post.call(this, 'DeleteCase', body);
          return;
      }
      async getCase(caseNo) {
          console.log('Getting Case...');
          const body = {
              CaseNo: caseNo,
          };
          const data = await WebApi.prototype.post.call(this, 'GetCase', body);
          return data;
      }
      async getCaseDocuments(CaseNo, CategoryNo) {
          console.log('Getting Case Documents');
          const body = {
              CaseNo: CaseNo,
              CategoryNo: CategoryNo
          };
          const data = await WebApi.prototype.post.call(this, 'GetCaseDocuments', body);
          return data;
      }
      async saveCaseIndexDataQuick(caseNo, updatedCase) {
          await WebApi.prototype.post.call(this, 'SaveCaseIndexDataQuick', {
              CaseNo: caseNo,
              IndexData: {
                  IndexDataItems: updatedCase.IndexDataItems
              }
          });
      }
  }

  class TheCase {
      CaseDefNo;
      IndexDataItems;
      DoFillDependentFields;
      constructor(caseDefNo, indexDataItems, doFillDependentFields) {
          this.CaseDefNo = caseDefNo,
              this.IndexDataItems = indexDataItems,
              this.DoFillDependentFields = doFillDependentFields;
      }
  }

  class QueryOperations {
      async executeMultiQuery(queries, fullText) {
          console.log('Executing MultiQuery...');
          let body = {
              FullText: fullText,
              Queries: queries
          };
          const data = await WebApi.prototype.post.call(this, 'ExecuteMultiQuery', body);
          return data;
      }
  }

  class DateIndexData {
      FieldNo;
      DataValue;
      DataISO8601Value;
      FieldName;
      /**
       *
       * @param fieldNo
       * Gets or sets the number of the field.
       * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
       * @param dataValue
       * Gets or sets the string value of the field.
       * @param dataISO8601Value
       * Gets or sets date value of the field in ISO 8601 format (YYYY-MM-DD, example 2017-07-23).
       * See also the *DataValue* property.
       * The DataValue property is ignored if the DataISO8601Value property has a value.
       * @param fieldName
       * Gets or sets the name (actually column name) of the field.
       * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
       */
      constructor(fieldNo, dataValue, dataISO8601Value, fieldName) {
          this.FieldNo = fieldNo;
          this.DataValue = dataValue;
          this.DataISO8601Value = dataISO8601Value;
          this.FieldName = fieldName;
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
      tenant;
      constructor(url, username, password, tenant) {
          url.slice(-1) == '/' ? (this.url = url) : (this.url = url + '/');
          this.username = username;
          this.password = password;
          this.authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
          this.apiVersion = 'theservice/v0001/restun/';
          this.tenant = tenant;
      }
      //Document operations
      getDocument = DocumentOperations.prototype.getDocument;
      getDocumentStream = DocumentOperations.prototype.getDocumentStream;
      //Case Operations
      getCaseDefinition = CaseOperations.prototype.getCaseDefinition;
      createCase = CaseOperations.prototype.createCase;
      closeCase = CaseOperations.prototype.closeCase;
      updateCase = CaseOperations.prototype.updateCase;
      deleteCase = CaseOperations.prototype.deleteCase;
      getCase = CaseOperations.prototype.getCase;
      getCaseDocuments = CaseOperations.prototype.getCaseDocuments;
      saveCaseIndexDataQuick = CaseOperations.prototype.saveCaseIndexDataQuick;
      //Category Operations
      getCategoriesTree = CategoryOperations.prototype.getCategoriesTree;
      getCategoryNo = CategoryOperations.prototype.getCategoryNo;
      getCategoryInfo = CategoryOperations.prototype.getCategoryInfo;
      //Query Operations
      executeMultiQuery = QueryOperations.prototype.executeMultiQuery;
  }

  exports.CategoriesTree = CategoriesTree;
  exports.DateIndexData = DateIndexData;
  exports.StringIndexData = StringIndexData;
  exports.TheCase = TheCase;
  exports.TheDocument = TheDocument;
  exports.Therefore = Therefore;
  exports.TreeItem = TreeItem;
  exports.WSIndexDataItem = WSIndexDataItem;
  exports.WSStreamInfoWithData = WSStreamInfoWithData;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=therefore-node.umd.js.map
