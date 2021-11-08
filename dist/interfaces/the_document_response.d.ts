import { RoleAccessMask } from "../models/role_access_mask";
import { ICheckOutStatus } from "./check_out_status";
import { IIndexData } from "./index_data";
import { IWSStreamInfo } from "./ws_stream_info";
export interface ITheDocumentResponse {
    CheckOutStatus: ICheckOutStatus | null;
    DocNo: number | undefined;
    IndexData: IIndexData | null;
    StreamsInfo: IWSStreamInfo;
    RoleAccessMask: RoleAccessMask | undefined;
}
