import { WebApi } from "../services/web_api.service";
import { Therefore } from "../therefore-node";
import * as fs from "fs"

export class OtherOperations {

    async uploadSessionStart(this: Therefore, fileSize: number, fileExtension?: string): Promise<string> {
      
        const body = {
            "FileSize": fileSize,
            "FileExstension": fileExtension
        }
      
        const data = await WebApi.prototype.post.call(this,'UploadSessionSTart', body)
        return data;
    }

    async uploadSessionAppendChunkRaw(this: Therefore, sessionId: string, chunkPosition: number = 0, filePath: string) {
        const body = fs.readFileSync(filePath)

        const headers = {
            "Content-Type": "application/octet-stream",
            "X-The-UploadSession-ChunkPosition": chunkPosition,
            "X-The-UploadSession-Id": sessionId
        }

        const data = await WebApi.prototype.post.call(this,'UploadSessionAppendChunkRaw', undefined, body, headers)
        return data;
    }
}