import { IAccessMask } from "../interfaces/access_mask";
export declare class AccessMask implements IAccessMask {
    Value: number | null;
    /**
     *
     * @param value Represents the access mask of the permissions. See also: operation GetPermissionConstants.
     */
    constructor(value: number | null);
}
