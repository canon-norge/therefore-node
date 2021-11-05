import { IDisplayProperties } from "../interfaces/display_properties";
import { IWSCategoryField } from "../interfaces/ws_category_field";
import { IWSTabInfo } from "../interfaces/ws_tab_info";
import { DisplayProperties } from "./display_properties";
import { WSTabInfo } from "./ws_tab_info";

export class WSCategoryField implements IWSCategoryField{
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
    DisplayProperties: DisplayProperties | null;
    ImageDocNo: number | null;
    IsImageFieldType: boolean;
    IsTabControlFieldType: boolean;
    ParentFieldNo: number;
    ShowInTabNo: number;
    Tabs: WSTabInfo[] | null[] | null;
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

    constructor(
        belongsTo: number,
        belongsToTable: number,
        caption: string | null,
        caseSensitive: boolean,
        colName: string | null,
        counterMode: number | undefined,
        defaultVal: string | null,
        dependencyMode: number | undefined,
        displayOrderPos: number,
        dontLoadValues: boolean,
        fieldNo: number,
        fieldType: number | undefined,
        foreignCol: string | null,
        guid: string,
        height: number,
        indexDataFieldName: string | null,
        indexType: number,
        isForeignDatatype: boolean,
        isMultipleKeyword: boolean,
        isSingleKeyword: boolean,
        keepRedundant: boolean,
        length: number,
        mandatory: boolean,
        posX: number,
        posY: number,
        regularExpr: string | null,
        tabOrderPos: number,
        typeGroup: number | undefined,
        typeIndexColumn: string | null,
        typeMultiInner: string | null,
        typeMultiJoin: string | null,
        typeMultiOuter: string | null,
        typeNo: number,
        typeTableName: string | null,
        visible: boolean,
        width: number,
        workflowField: string | null,
        selectFromDropDownBox: boolean,
        displayProperties: IDisplayProperties | null,
        imageDocNo: number | null,
        isImageFieldType: boolean,
        isTabControlFieldType: boolean,
        parentFieldNo: number,
        showInTabNo: number,
        tabs: WSTabInfo[] | null[] | null,
        accessMask: null,
        isAutoAppendField: boolean,
        isDateTimeFieldType: boolean,
        scale: number,
        regExSample: string | null,
        fieldID: string | null,
        condition: string | null,
        conditionalFormatting: number | null,
        formula: string | null,
        isCalculationTrigger: boolean,
        isFormattingTrigger: boolean,
        roleAccessMask: number | null,
        sortDescending: boolean | undefined
    ){
        this.BelongsTo = belongsTo;
        this.BelongsToTable = belongsToTable;
        this.Caption = caption;
        this.CaseSensitive = caseSensitive;
        this.ColName = colName;
        this.CounterMode = counterMode;
        this.DefaultVal = defaultVal;
        this.DependencyMode = dependencyMode;
        this.DisplayOrderPos = displayOrderPos;
        this.DontLoadValues = dontLoadValues;
        this.FieldNo = fieldNo;
        this.FieldType = fieldType;
        this.ForeignCol = foreignCol;
        this.Guid = guid;
        this.Height = height;
        this.IndexDataFieldName = indexDataFieldName;
        this.IndexType = indexType;
        this.IsForeignDatatype = isForeignDatatype;
        this.IsMultipleKeyword= isMultipleKeyword;
        this.IsSingleKeyword = isSingleKeyword;
        this.KeepRedundant = keepRedundant;
        this.Length = length;
        this.Mandatory = mandatory;
        this.PosX = posX;
        this.PosY = posY;
        this.RegularExpr = regularExpr;
        this.TabOrderPos = tabOrderPos;
        this.TypeGroup = typeGroup;
        this.TypeIndexColumn = typeIndexColumn;
        this.TypeMultiInner = typeMultiInner;
        this.TypeMultiJoin = typeMultiJoin;
        this.TypeMultiOuter = typeMultiOuter;
        this.TypeNo = typeNo;
        this.TypeTableName = typeTableName;
        this.Visible = visible;
        this.Width = width;
        this.WorkflowField = workflowField;
        this.SelectFromDropDownBox = selectFromDropDownBox;
        this.DisplayProperties = displayProperties;
        this.ImageDocNo = imageDocNo;
        this.IsImageFieldType = isImageFieldType;
        this.IsTabControlFieldType = isTabControlFieldType;
        this.ParentFieldNo = parentFieldNo;
        this.ShowInTabNo = showInTabNo;
        this.Tabs = tabs;
        this.AccessMask = accessMask;
        this.IsAutoAppendField = isAutoAppendField;
        this.IsDateTimeFieldType = isDateTimeFieldType;
        this.Scale = scale;
        this.RegExSample = regExSample;
        this.FieldID = fieldID;
        this.Condition = condition;
        this.ConditionalFormatting = conditionalFormatting;
        this.Formula = formula;
        this.IsCalculationTrigger = isCalculationTrigger;
        this.IsFormattingTrigger = isFormattingTrigger;
        this.RoleAccessMask = roleAccessMask;
        this.SortDescending = sortDescending;
    }
}