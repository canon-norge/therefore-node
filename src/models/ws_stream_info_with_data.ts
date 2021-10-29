import { IWSStreamInfoWithData } from '../interfaces/ws_stream_info_with_data';

export class WSStreamInfoWithData implements IWSStreamInfoWithData {
  FileData: number[] | null;
  FileName: string | null;
  StreamNo: number | null;

  constructor(fileData: number[], fileName: string) {
    this.FileData = fileData;
    this.FileName = fileName;
    this.StreamNo = null;
  }
}
