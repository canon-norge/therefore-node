export class TheDocument {
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
    constructor(categoryNo, indexDataItems, streams) {
        this.CategoryNo = categoryNo;
        this.IndexDataItems = indexDataItems;
        this.Streams = streams;
        this.DoFillDependentFields = this.WithAutoAppendMode = this.ConversionOptions = this.FileUploadSessions = null;
    }
}
