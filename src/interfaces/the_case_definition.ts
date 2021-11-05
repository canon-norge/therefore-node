import { IRoleAccessMask } from './role_access_mask';
import { IWSCategory } from './ws_category';
import { IWSCategoryField } from './ws_category_field';

export interface ITheCaseDefinition {
  CaseDefNo: number;
  Categories: IWSCategory | null
  Fields: IWSCategoryField | null
  Guid: String | undefined
  IsFullTextEnabled: boolean | undefined
  Name: String | null
  ParentFolderNo: number
  Version: number
  WorkflowProcessNo: number | undefined
  AccessMask: null,
  Description: String | null
  Height: number | undefined
  SubCaseFieldIx: number | undefined,
  TableName: String | null
  Title: String | null
  TitleLength: number | undefined
  TypeNo: number | undefined
  Width: number | undefined
  FieldNoSearchOrder: number[] | null
  RoleAccessMask: IRoleAccessMask | null
  AvailableLCIDs: number[] | null,
  CurrentLCID: number | undefined
}
