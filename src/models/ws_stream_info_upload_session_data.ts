import { IWSStreamInfoUploadSessionData } from '../interfaces/ws_stream_info_upload_session_data';

/**
 * @param UpoadSesionId - String containg uuidv4
 */
export class WSStreamInfoUploadSessionData implements IWSStreamInfoUploadSessionData {
  FileName: string | null = null;
  StreamNo: number | null = null;
  UploadSessionId: string | null = null;
}
