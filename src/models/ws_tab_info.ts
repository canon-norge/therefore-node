import { IWSTabInfo } from "../interfaces/ws_tab_info";

export class WSTabInfo implements IWSTabInfo{
    BackgroundColor: number | undefined;
    Caption: string | null;
    Position: number | undefined;
    TabColor: number | undefined;
    TextColor: number | undefined;
    Visible: boolean | undefined;

    constructor(
        backgroundColor: number | undefined,
        caption: string | null,
        position: number | undefined,
        tabColor: number | undefined,
        textColor: number | undefined,
        visible: boolean | undefined
    ){
        this.BackgroundColor = backgroundColor
        this.Caption = caption
        this.Position = position
        this.TabColor = tabColor
        this.TextColor = textColor
        this.Visible = visible
    }
}