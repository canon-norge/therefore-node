import { IConversionOptions } from './conversion_options';
import { IWSIndexDataItem } from './ws_index_data_item';
import { IWSStreamInfoUploadSessionData } from './ws_stream_info_upload_session_data';
import { IWSStreamInfoWithData } from './ws_stream_info_with_data';
export interface ITheDocument {
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
