import { IDisplayProperties } from './display_properties';
import { IWSTabInfo } from './ws_tab_info';
export interface IWSCategoryField {
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
