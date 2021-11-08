import { WSIndexDataItem } from "../therefore-node";

export interface IIndexData {
    CategoryNo: number
    CtgryName: String | null
    DocNo: number | undefined
    IndexDataItems: WSIndexDataItem[] | null
}