import { IWSStreamInfoUploadSessionData } from '../interfaces/ws_stream_info_upload_session_data';
/**
 * @param UpoadSesionId - String containg uuidv4
 */
export declare class WSStreamInfoUploadSessionData implements IWSStreamInfoUploadSessionData {
    FileName: string | null;
    StreamNo: number | null;
    UploadSessionId: string | null;
}
