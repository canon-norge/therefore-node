import { IRoleAccessMask } from "../interfaces/role_access_mask";

export class RoleAccessMask implements IRoleAccessMask {
    Value: number | undefined;

    constructor(value: number | undefined){
        this.Value = value
    }
}