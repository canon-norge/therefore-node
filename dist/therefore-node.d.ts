declare enum QueryMode {
    'NormalQuery' = 0,
    'FileQuery' = 1,
    'WorkflowQuery' = 4,
    'CaseQuery' = 5
}

interface IWSCondition {
    Condition: String;
    FieldNoOrName: String;
}

declare class Query {
    CaseDefinitionNo?: number;
    CategoryNo?: number;
    Conditions: IWSCondition[];
    Mode?: QueryMode;
    constructor(conditions: IWSCondition[], caseDefNo?: number, categoryNo?: number, mode?: QueryMode);
}

interface ITreeItem {
    ChildItems: ITreeItem[];
    FolderType: number;
    Guid: string;
    ItemNo: number;
    ItemType: number;
    Name: string;
    ParentCaseDefNo: number;
    ParentFolderNo: number;
}

interface ICategoriesTree {
    TreeItems: ITreeItem[];
}

declare class CategoriesTree implements ICategoriesTree {
    TreeItems: TreeItem[];
    constructor(treeItems: TreeItem[]);
}

interface IDisplayProperties {
    BackgroundColor: number | undefined;
    Bold: boolean | undefined;
    FaceName: string | null;
    FontSize: number | undefined;
    HorizonalAlignment: number | undefined;
    Italic: boolean | undefined;
    Padding: number | undefined;
    TextColor: number | undefined;
    Underlined: boolean | undefined;
    VerticalALignment: number | undefined;
}

interface IWSTabInfo {
    BackgroundColor: number | undefined;
    Caption: string | null;
    Position: number | undefined;
    TabColor: number | undefined;
    TextColor: number | undefined;
    Visible: boolean | undefined;
}

interface IWSCategoryField {
    BelongsTo: number;
    BelongsToTable: number;
    Caption: string | null;
    CaseSensitive: boolean;
    ColName: string | null;
    CounterMode: number | undefined;
    DefaultVal: string | null;
    DependencyMode: number | undefined;
    DisplayOrderPos: number;
    DontLoadValues: boolean;
    FieldNo: number;
    FieldType: number | undefined;
    ForeignCol: string | null;
    Guid: string;
    Height: number;
    IndexDataFieldName: string | null;
    IndexType: number;
    IsForeignDatatype: boolean;
    IsMultipleKeyword: boolean;
    IsSingleKeyword: boolean;
    KeepRedundant: boolean;
    Length: number;
    Mandatory: boolean;
    PosX: number;
    PosY: number;
    RegularExpr: string | null;
    TabOrderPos: number;
    TypeGroup: number | undefined;
    TypeIndexColumn: string | null;
    TypeMultiInner: string | null;
    TypeMultiJoin: string | null;
    TypeMultiOuter: string | null;
    TypeNo: number;
    TypeTableName: string | null;
    Visible: boolean;
    Width: number;
    WorkflowField: string | null;
    SelectFromDropDownBox: boolean;
    DisplayProperties: IDisplayProperties | null;
    ImageDocNo: number | null;
    IsImageFieldType: boolean;
    IsTabControlFieldType: boolean;
    ParentFieldNo: number;
    ShowInTabNo: number;
    Tabs: IWSTabInfo[] | null[] | null;
    AccessMask: null;
    IsAutoAppendField: boolean;
    IsDateTimeFieldType: boolean;
    Scale: number;
    RegExSample: string | null;
    FieldID: string | null;
    Condition: string | null;
    ConditionalFormatting: number | null;
    Formula: string | null;
    IsCalculationTrigger: boolean;
    IsFormattingTrigger: boolean;
    RoleAccessMask: number | null;
    SortDescending: boolean | undefined;
}

interface ICategoryInfo {
    AutoAppendMode: number | undefined;
    BelongsToCaseDefintion: number;
    CategoryFields: IWSCategoryField[] | null[] | null;
    CategoryNo: number | undefined;
    CheckInCommentsMode: number | undefined;
    Description: string | null;
    DocumentTitleLength: number | undefined;
    FieldCount: number | undefined;
    FolderNo: number | undefined;
    Guid: string | undefined;
    Height: number | undefined;
    IsFulltextEnabled: boolean | undefined;
    Name: string | null;
    NewVersionOnIndexDataChange: boolean | undefined;
    QueryTemplateNo: number | undefined;
    SubCtgryFieldIx: number | undefined;
    TableName: string | null;
    Title: string | null;
    Version: number | undefined;
    WatermarkDocNo: number | undefined;
    WatermarkHPos: number | undefined;
    WatermarkResolution: number | undefined;
    WatermarkVPos: number | undefined;
    Width: number | undefined;
    WorkflowFolder: string | null;
    WorkflowForm: string | null;
    WorkflowProcessNo: number | undefined;
    WorkflowProcessNoUpdate: number | undefined;
    BackgroundColor: number | undefined;
    CoverMode: number | undefined;
    DocumentPreview: boolean | undefined;
    EmptyDocMode: number | undefined;
    FullTextDate: string | undefined;
    FullTextMode: number | undefined;
    AccessMask: null;
    FieldNoSearchOrder: number[] | null[] | null;
    RoleAccessMask: number | null;
    AvailableLCIDs: number[] | null[] | null;
    CurrentLCID: number | undefined;
}

declare enum CounterMode {
    'Undefined' = 0,
    'ClientCounter' = 1,
    'ServerCounter' = 2
}

declare class TreeItem implements ITreeItem {
    ChildItems: TreeItem[];
    FolderType: number;
    Guid: string;
    ItemNo: number;
    ItemType: number;
    Name: string;
    ParentCaseDefNo: number;
    ParentFolderNo: number;
    constructor(childItems: TreeItem[], folderType: number, guid: string, itemNo: number, itemType: number, name: string, parentCaseDefNo: number, parentFolderNo: number);
}

interface IConversionOptions {
    AnnotationsMode: number | null;
    CertificateName: string | null;
    ConvertTo: number | undefined;
    SignatureMode: number | undefined;
    TimeStampPwd: string | null;
    TimeStampServer: string | null;
    TimeStampUser: string | null;
    MultipageStreamName: string | null;
}

interface IAccessMask {
    Value: number | null;
}

interface IDateIndexData {
    FieldNo: number;
    DataValue: string | null;
    DataISO8601Value: string | null;
    FieldName?: string;
}

interface IDateTimeIndexData {
    FieldNo: number;
    DataValue: string | null;
    DataISO8601Value: string | null;
    FieldName?: string;
}

interface IIntIndexData {
    FieldNo: number;
    DataValue: number | null;
    FieldName?: string;
}

interface ILogicalIndexData {
    FieldNo: number;
    DataValue: boolean | null;
    FieldName?: string;
}

interface IMoneyIndexData {
    FieldNo: number;
    DataValue: number | null;
    FieldName?: string;
    DecimalDataValue: number | null;
}

interface IMultipleKeywordData {
    FieldNo: number;
    DataValue: string[] | null;
    FieldName?: string;
    KeywordNos: number[] | null;
}

interface ISingleKeywordData {
    FieldNo: number;
    DataValue: string | null;
    FieldName: string | null;
}

interface IStringIndexData {
    FieldNo: number;
    DataValue: string | null;
    FieldName?: string;
}

interface IWSTableFieldDataRowItem {
    DateIndexData: IDateIndexData | null;
    IntIndexData: IIntIndexData | null;
    LogicalIndexData: ILogicalIndexData | null;
    MoneyIndexData: IMoneyIndexData | null;
    SingleKeywordData: ISingleKeywordData | null;
    StringIndexData: IStringIndexData | null;
}

interface IWSTableFieldDataRow {
    DataRowItems: IWSTableFieldDataRowItem[] | null;
    RowNo: number | null;
    AccessIsEditableRow: boolean | null;
}

interface ITableIndexData {
    FieldNo: number;
    DataValue: IWSTableFieldDataRow[] | null;
    FieldName?: string;
}

interface IWSIndexDataItem {
    DateIndexData?: IDateIndexData;
    IntIndexData?: IIntIndexData;
    LogicalIndexData?: ILogicalIndexData;
    MoneyIndexData?: IMoneyIndexData;
    MultipleKeywordData?: IMultipleKeywordData;
    SingleKeywordData?: ISingleKeywordData;
    StringIndexData?: IStringIndexData;
    TableIndexData?: ITableIndexData;
    AccessMask?: IAccessMask;
    DateTimeIndexData?: IDateTimeIndexData;
}

/**
 * @param UpoadSesionId - String containg uuidv4
 */
interface IWSStreamInfoUploadSessionData {
    FileName: string | null;
    StreamNo: number | null;
    UploadSessionId: string | null;
}

interface IWSStreamInfoWithData {
    FileData: number[] | null;
    FileName: string | null;
    StreamNo: number | null;
}

interface ITheDocument {
    CategoryNo: number;
    IndexDataItems: IWSIndexDataItem[] | null;
    Streams: IWSStreamInfoWithData[] | null;
    DoFillDependentFields: boolean | null;
    WithAutoAppendMode: number | null;
    ConversionOptions: IConversionOptions | null;
    LastChangeTime: string | undefined;
    DontResetCategoryDefaults: boolean | undefined;
    FileUploadSessions: IWSStreamInfoUploadSessionData[] | null;
}

declare class WSStreamInfoWithData implements IWSStreamInfoWithData {
    FileData: number[] | null;
    FileName: string | null;
    StreamNo: number | null;
    constructor(fileData: number[], fileName: string);
}

declare class ConversionOptions implements IConversionOptions {
    AnnotationsMode: number | null;
    CertificateName: string | null;
    ConvertTo: number | undefined;
    SignatureMode: number | undefined;
    TimeStampPwd: string | null;
    TimeStampServer: string | null;
    TimeStampUser: string | null;
    MultipageStreamName: string | null;
}

/**
 * @param UpoadSesionId - String containg uuidv4
 */
declare class WSStreamInfoUploadSessionData implements IWSStreamInfoUploadSessionData {
    FileName: string | null;
    StreamNo: number | null;
    UploadSessionId: string | null;
}

declare class AccessMask implements IAccessMask {
    Value: number | null;
    /**
     *
     * @param value Represents the access mask of the permissions. See also: operation GetPermissionConstants.
     */
    constructor(value: number | null);
}

declare class DateIndexData implements IDateIndexData {
    FieldNo: number;
    DataValue: string | null;
    DataISO8601Value: string | null;
    FieldName?: string;
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
    constructor(fieldNo: number, dataValue: string | null, dataISO8601Value: string | null, fieldName: string);
}

declare class DateTimeIndexData implements IDateTimeIndexData {
    FieldNo: number;
    DataValue: string | null;
    DataISO8601Value: string | null;
    FieldName?: string;
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
    constructor(fieldNo: number, dataValue: string | null, dataISO8601Value: string | null, fieldName: string);
}

declare class IntIndexData implements IIntIndexData {
    FieldNo: number;
    DataValue: number | null;
    FieldName?: string;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue
     * Gets or sets the integer value of the field.
     * @param fieldName
     * Gets or sets the name (actually column name) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     */
    constructor(fieldNo: number, dataValue: number | null, fieldName: string);
}

declare class LogicalIndexData implements ILogicalIndexData {
    FieldNo: number;
    DataValue: boolean | null;
    FieldName?: string;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue
     * Gets or sets the boolean value of the field.
     * @param fieldName
     * Gets or sets the name (actually column name) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     */
    constructor(fieldNo: number, dataValue: boolean | null, fieldName: string);
}

declare class MoneyIndexData implements IMoneyIndexData {
    FieldNo: number;
    DataValue: number | null;
    FieldName?: string;
    DecimalDataValue: number | null;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue DEPRECATED
     * @param fieldName
     * Gets or sets the name (actually column name) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     * @param decimalDataValue
     * Gets or sets the DECIMAL value of the field.
     * Value for the field sould be set either by DataValue or by DecimalDataValue proiperty.
     */
    constructor(fieldNo: number, dataValue: number | null, fieldName: string, decimalDataValue: number | null);
}

declare class MultipleKeywordData implements IMultipleKeywordData {
    FieldNo: number;
    DataValue: string[] | null;
    FieldName?: string;
    KeywordNos: number[] | null;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue
     * Gets or sets multiple keyword values of the field.
     * @param fieldName
     * Gets or sets the name (actually column name) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     * @param keywordNos
     * Gets or sets multiple keyword numbers of the field.
     */
    constructor(fieldNo: number, dataValue: string[] | null, fieldName: string, keywordNos: number[] | null);
}

declare class SingleKeywordData implements ISingleKeywordData {
    FieldNo: number;
    DataValue: string | null;
    FieldName: string | null;
    /**
     *
     * @param fieldNo
     * Gets or sets the number of the field.
     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
     * @param dataValue
     * Gets or sets a single keyword value of the field.
     * @param fieldName
     * Gets or sets the field name (when you set it use column name + "_Text" suffix.
     * example: for SK field "Department" use "Department_Text" for it's TEXT value) of the field.
     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
     */
    constructor(fieldNo: number, dataValue: string | null, fieldName: string | null);
}

declare class StringIndexData implements IStringIndexData {
    FieldNo: number;
    DataValue: string | null;
    FieldName?: string;
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
    constructor(fieldNo: number, dataValue: string | null, fieldName: string);
}

declare class WSTableFieldDataRowItem implements IWSTableFieldDataRowItem {
    DateIndexData: DateIndexData | null;
    IntIndexData: IntIndexData | null;
    LogicalIndexData: LogicalIndexData | null;
    MoneyIndexData: MoneyIndexData | null;
    SingleKeywordData: SingleKeywordData | null;
    StringIndexData: StringIndexData | null;
    /**
     *
     * @param dateIndexData Date field data
     * @param intIndexData Int field data
     * @param logicalIndexData Logical field data
     * @param moneyIndexData Money field data
     * @param singleKeywordData Single keyword data
     * @param stringIndexData String data
     */
    constructor(dateIndexData: DateIndexData | null, intIndexData: IntIndexData | null, logicalIndexData: LogicalIndexData | null, moneyIndexData: MoneyIndexData | null, singleKeywordData: SingleKeywordData | null, stringIndexData: StringIndexData | null);
}

declare class WSTableFieldDataRow implements IWSTableFieldDataRow {
    DataRowItems: WSTableFieldDataRowItem[] | null;
    RowNo: number | null;
    AccessIsEditableRow: boolean | null;
    /**
     *
     * @param dataRowItems Gets or sets the items of the row. If it is set to null for update operation - record with given row number (see RowNo parameter) will be deleted.
     * @param rowNo Gets or sets the number of the row. While updating the data - null value means creating new row. Starts at 0 (zero).
     * @param accessIsEditableRow  Gets access status for the row for connected user.
     */
    constructor(dataRowItems: WSTableFieldDataRowItem[] | null, rowNo: number | null, accessIsEditableRow: boolean | null);
}

declare class TableIndexData implements ITableIndexData {
    FieldNo: number;
    DataValue: WSTableFieldDataRow[] | null;
    FieldName?: string;
    /**
   *
   * @param fieldNo
   * Gets or sets the number of the field.
   * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
   * @param dataValue
   * Gets or sets row with data in table field
   * @param fieldName
   * Gets or sets the name (actually column name) of the field.
   * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
   */
    constructor(fieldNo: number, dataValue: WSTableFieldDataRow[] | null, fieldName: string);
}

declare class WSIndexDataItem implements IWSIndexDataItem {
    DateIndexData?: DateIndexData;
    IntIndexData?: IntIndexData;
    LogicalIndexData?: LogicalIndexData;
    MoneyIndexData?: MoneyIndexData;
    MultipleKeywordData?: MultipleKeywordData;
    SingleKeywordData?: SingleKeywordData;
    StringIndexData?: StringIndexData;
    TableIndexData?: TableIndexData;
    AccessMask?: AccessMask;
    DateTimeIndexData?: DateTimeIndexData;
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
    constructor(dateIndexData: DateIndexData, intIndexData: IntIndexData, logicalIndexData: LogicalIndexData, moneyIndexData: MoneyIndexData, multipleKeywordData: MultipleKeywordData, singleKeywordData: SingleKeywordData, stringIndexData: StringIndexData, tableIndexData: TableIndexData, accessMask: AccessMask, dateTimeIndexData: DateTimeIndexData);
}

declare class TheDocument implements ITheDocument {
    CategoryNo: number;
    IndexDataItems: WSIndexDataItem[] | null;
    Streams: WSStreamInfoWithData[] | null;
    DoFillDependentFields: boolean | null;
    WithAutoAppendMode: number | null;
    ConversionOptions: ConversionOptions | null;
    LastChangeTime: string | undefined;
    DontResetCategoryDefaults: boolean | undefined;
    FileUploadSessions: WSStreamInfoUploadSessionData[] | null;
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
    constructor(categoryNo: number, indexDataItems: WSIndexDataItem[], streams: WSStreamInfoWithData[] | null | undefined, doFillDependentFields: boolean | null | undefined, withAutoAppendMode: number | null | undefined, conversionOptions: ConversionOptions | null | undefined, fileUploadSessions: WSStreamInfoUploadSessionData[] | null);
}

declare enum ItemType {
    'Root' = 0,
    'Folder' = 1,
    'Category' = 2,
    'CaseDefinition' = 3
}

declare enum FieldType {
    'StringField' = 1,
    'IntField ' = 2,
    'DateField' = 3,
    'LabelField' = 4,
    'MoneyField' = 5,
    'LogicalField' = 6,
    'NumericCounter' = 8,
    'TextCounter' = 9,
    'TableField' = 10,
    'CustomField' = 99
}

interface ITheCase {
    CaseDefNo: number;
    IndexDataItems: IWSIndexDataItem[] | null;
    DoFillDependentFields: boolean | null;
}

declare class TheCase implements ITheCase {
    CaseDefNo: number;
    IndexDataItems: WSIndexDataItem[] | null;
    DoFillDependentFields: boolean | null;
    constructor(caseDefNo: number, indexDataItems: any[] | null, doFillDependentFields: boolean | null);
}

interface IGetCaseDocumentsResponse {
    DocumentNos: number[];
}

declare class Therefore {
    url: string;
    username: string;
    password: string;
    authHeader: string;
    apiVersion: string;
    tenant?: string;
    client_type?: number;
    constructor(url: string, username: string, password: string, tenant?: string, client_type?: number);
    createDocument: (this: Therefore, document: TheDocument) => Promise<any>;
    getDocument: (this: Therefore, docNo: number, isCheckOutStatusNeeded?: boolean | undefined, isIndexDataValuesNeeded?: boolean | undefined, isStreamsInfoAndDataNeeded?: boolean | undefined, isStreamsInfoNeeded?: boolean | undefined, versionNo?: number | undefined, isAccessMaskNeeded?: boolean | undefined, titleHideCategory?: boolean | undefined) => Promise<TheDocument>;
    getDocumentStream: (this: Therefore, docNo: number, streamNo: number, versionNo?: number | undefined) => Promise<WSStreamInfoWithData>;
    getCaseDefinition: (this: Therefore, caseDefinitionNo: number) => Promise<TheCase>;
    createCase: (this: Therefore, theCase: TheCase) => Promise<TheCase>;
    closeCase: (this: Therefore, caseNo: number) => Promise<void>;
    updateCase: (this: Therefore, theCase: TheCase) => Promise<TheCase>;
    deleteCase: (this: Therefore, caseNo: number) => Promise<void>;
    getCase: (this: Therefore, caseNo: number) => Promise<TheCase>;
    getCaseDocuments: (this: Therefore, CaseNo: number, CategoryNo?: number | undefined) => Promise<IGetCaseDocumentsResponse>;
    saveCaseIndexDataQuick: (this: Therefore, caseNo: number, updatedCase: TheCase) => Promise<void>;
    getCategoriesTree: (this: Therefore) => Promise<CategoriesTree>;
    getCategoryNo: (this: Therefore, CategoryName: string) => Promise<number | undefined>;
    getCategoryInfo: (this: Therefore, CategoryNo: number) => Promise<ICategoryInfo>;
    executeMultiQuery: (this: Therefore, queries: Query[], fullText?: string | undefined) => Promise<any>;
    executeSingleQuery: (this: Therefore, query: Query, fullText?: string | undefined) => Promise<any>;
    uploadSessionStart: (this: Therefore, fileSize: number, fileExtension?: string | undefined) => Promise<string>;
    uploadSessionAppendChunkRaw: (this: Therefore, sessionId: string, chunkPosition: number | undefined, filePath: string) => Promise<any>;
}

export { CategoriesTree, CounterMode, DateIndexData, FieldType, ICategoryInfo, IGetCaseDocumentsResponse, IntIndexData, ItemType, QueryMode, StringIndexData, TheCase, TheDocument, Therefore, TreeItem, WSIndexDataItem, WSStreamInfoWithData };
