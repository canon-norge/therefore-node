import { Therefore } from "../therefore-node";
export declare class OtherOperations {
    uploadSessionStart(this: Therefore, fileSize: number, fileExtension?: string): Promise<string>;
    uploadSessionAppendChunkRaw(this: Therefore, sessionId: string, chunkPosition: number | undefined, filePath: string): Promise<any>;
}
