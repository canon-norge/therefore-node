import { ITheDocument } from '../interfaces/the_document';
import { WSStreamInfoWithData } from './ws_stream_info_with_data';
import { ConversionOptions } from './conversion_options';
import { WSStreamInfoUploadSessionData } from './ws_stream_info_upload_session_data';
import { WSIndexDataItem } from './ws_index_data_item';
export declare class TheDocument implements ITheDocument {
    CategoryNo: number;
    IndexDataItems: WSIndexDataItem[] | null;
    Streams: WSStreamInfoWithData[] | null;
    DoFillDependentFields: boolean | null;
    WithAutoAppendMode: number | null;
    ConversionOptions: ConversionOptions | null;
    LastChangeTime: string | undefined;
    DontResetCategoryDefaults: boolean | undefined;
    FileUploadSessions: WSStreamInfoUploadSessionData[] | null;
    constructor(categoryNo: number, indexDataItems: WSIndexDataItem[], streams: WSStreamInfoWithData[]);
}
