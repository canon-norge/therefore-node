import { IDisplayProperties } from "../interfaces/display_properties";

export class DisplayProperties implements IDisplayProperties{
    BackgroundColor: number | undefined;
    Bold: boolean | undefined;
    FaceName: string | null;
    FontSize: number | undefined;
    HorizonalAlignment: number | undefined;
    Italic: boolean | undefined;
    Padding: number | undefined;
    TextColor: number | undefined;
    Underlined: boolean | undefined;
    VerticalALignment: number | undefined;

    constructor(
        backgroundColor: number | undefined,
        bold: boolean | undefined,
        faceName: string | null,
        fontSize: number | undefined,
        horizonalAlignment: number | undefined,
        italic: boolean | undefined,
        padding: number | undefined,
        textColor: number | undefined,
        underlined: boolean | undefined,
        verticalALignment: number | undefined,
    ){
        this.BackgroundColor = backgroundColor
        this.Bold = bold
        this.FaceName = faceName
        this.FontSize = fontSize
        this.HorizonalAlignment = horizonalAlignment
        this.Italic = italic
        this.Padding = padding
        this.TextColor = textColor
        this.Underlined = underlined
        this.VerticalALignment = verticalALignment
    }
}