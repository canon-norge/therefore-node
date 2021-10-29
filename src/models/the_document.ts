import { IWSIndexDataItem } from '../interfaces/ws_index_data_item';
import { IWSStreamInfoWithData } from '../interfaces/ws_stream_info_with_data';
import { ITheDocument } from '../interfaces/the_document';
import { WSStreamInfoWithData } from './ws_stream_info_with_data';
import { ConversionOptions } from './conversion_options';
import { WSStreamInfoUploadSessionData } from './ws_stream_info_upload_session_data';
import { WSIndexDataItem } from './ws_index_data_item';

export class TheDocument implements ITheDocument {
  CategoryNo: number;
  IndexDataItems: WSIndexDataItem[] | null;
  Streams: WSStreamInfoWithData[] | null;
  DoFillDependentFields: boolean | null;
  WithAutoAppendMode: number | null;
  ConversionOptions: ConversionOptions | null;
  LastChangeTime: string | undefined;
  DontResetCategoryDefaults: boolean | undefined;
  FileUploadSessions: WSStreamInfoUploadSessionData[] | null;

  // constructor(categoryNo: number, indexDataItems: IWSIndexDataItem[] | null, streams: IWSStreamInfoWithData[] | null, doFillDependentFields: boolean | null, withAutoAppendMode: number | null, conversionOptions: IConversionOptions | null, lastchangeTime: string | undefined, dontResetCategoryDefaults: boolean | undefined, fileUploadSessions: IWSStreamInfoUploadSessionData[] | null) {
  //     this.CategoryNo = categoryNo
  //     this.IndexDataItems = indexDataItems
  //     this.Streams = streams
  //     this.DoFillDependentFields = doFillDependentFields
  //     this.WithAutoAppendMode = withAutoAppendMode
  //     this.ConversionOptions = conversionOptions
  //     this.LastChangeTime = lastchangeTime
  //     this.DontResetCategoryDefaults = dontResetCategoryDefaults
  //     this.FileUploadSessions = fileUploadSessions
  // }

  constructor(categoryNo: number, indexDataItems: WSIndexDataItem[], streams: WSStreamInfoWithData[]) {
    this.CategoryNo = categoryNo;
    this.IndexDataItems = indexDataItems;
    this.Streams = streams;
    this.DoFillDependentFields = this.WithAutoAppendMode = this.ConversionOptions = this.FileUploadSessions = null;
  }
}
