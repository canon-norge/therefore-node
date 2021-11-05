import { IRoleAccessMask } from "../interfaces/role_access_mask";
import { ITheCaseDefinition } from "../interfaces/the_case_definition";
import { IWSCategory } from "../interfaces/ws_category";
import { IWSCategoryField } from "../interfaces/ws_category_field";
import { RoleAccessMask } from "./role_access_mask";
import { WSCategory } from "./ws_category";
import { WSCategoryField } from "./ws_category_field";

export class TheCaseDefinition implements ITheCaseDefinition {
    CaseDefNo: number;
    Categories: IWSCategory | null;
    Fields: IWSCategoryField | null;
    Guid: String | undefined;
    IsFullTextEnabled: boolean | undefined;
    Name: String | null;
    ParentFolderNo: number;
    Version: number;
    WorkflowProcessNo: number | undefined;
    AccessMask: null;
    Description: String | null;
    Height: number | undefined;
    SubCaseFieldIx: number | undefined;
    TableName: String | null;
    Title: String | null;
    TitleLength: number | undefined;
    TypeNo: number | undefined;
    Width: number | undefined;
    FieldNoSearchOrder: number[] | null;
    RoleAccessMask: IRoleAccessMask | null;
    AvailableLCIDs: number[] | null;
    CurrentLCID: number | undefined;

    constructor(
        caseDefNo: number,
        categories: WSCategory | null,
        fields: WSCategoryField | null,
        guid: String | undefined,
        isFullTextEnabled: boolean | undefined,
        name: String | null,
        parentFolderNo: number,
        version: number ,
        workFlowProcessNo: number | undefined,
        accessMask = null,
        description: String | null,
        height: number | undefined,
        subCaseFieldIx: number | undefined,
        tableName: String | null,
        title: String | null,
        titleLength: number | undefined,
        typeNo: number | undefined,
        width: number | undefined,
        fieldNoSearchOrder: number[] | null,
        roleAccessMask: RoleAccessMask | null,
        availableLCIDs: number[] | null,
        currentLCID: number | undefined
    ){
        this.CaseDefNo = caseDefNo
        this.Categories = categories
        this.Fields = fields
        this.Guid = guid
        this.IsFullTextEnabled = isFullTextEnabled
        this.Name = name
        this.ParentFolderNo = parentFolderNo
        this.Version = version
        this.WorkflowProcessNo = workFlowProcessNo
        this.AccessMask = accessMask
        this.Description = description
        this.Height = height
        this.SubCaseFieldIx = subCaseFieldIx
        this.TableName = tableName
        this.Title = title
        this.TitleLength = titleLength
        this.TypeNo = typeNo
        this.Width = width
        this.FieldNoSearchOrder = fieldNoSearchOrder
        this.RoleAccessMask = roleAccessMask
        this.AvailableLCIDs = availableLCIDs
        this.CurrentLCID = currentLCID
    }

}