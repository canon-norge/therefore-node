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

  /**
   * @param categoryNo
   * The number of the category the document belongs to.
   * @param indexDataItems
   * Index data items of the document.
   * @param streams
   * Represents list of files to store within the document.
   * @param doFillDependentFields
   * Set to true or false to explicitly execute or skip FillDependentFields step while writing index data.
   * If not set or null the old behavior will be used.
   * That means the FillDependentFields step will be executed.
   * Note: In order to update primary and dependent fields you can: 1. specify both values (for primary and dependent) or just for primary.
   * In this case primary field will be used to lookup related value(s) for dependent field(s).
   * Value of dependent field(s) from the request will be ignored. 2. specify value of dependent field(s) only.
   * In this case if a unique primary field (related to given dependent field(s)) can be found it will be used.
   * Otherwise, if there are many values found for primary field an error will be returned.
   * @param withAutoAppendMode 
   * Sets auto append mode for the document.
   * Null or omitted value means that auto append mode is Disabled.
   * With Enabled auto append mode use IndexDataItems to specify unique identifier of the document.
   * @param conversionOptions 
   * Specifies options to convert the files.
   * @param fileUploadSessions 
   * Represents list of file upload sessions to be used to store files within the document.
   * See the UploadSessionStart and UploadSessionAppendChunk methods for more details.
   */
  constructor(
    categoryNo: number,
    indexDataItems: WSIndexDataItem[],
    streams: WSStreamInfoWithData[] | null = null,
    doFillDependentFields: boolean | null = null,
    withAutoAppendMode: number | null = null,
    conversionOptions: ConversionOptions | null = null,
    fileUploadSessions: WSStreamInfoUploadSessionData[] | null,
  ) {
    this.CategoryNo = categoryNo;
    this.IndexDataItems = indexDataItems;
    this.Streams = streams;
    this.DoFillDependentFields = doFillDependentFields;
    this.WithAutoAppendMode = withAutoAppendMode;
    this.ConversionOptions = conversionOptions;
    this.FileUploadSessions = fileUploadSessions;
  }
}
