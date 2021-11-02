import { IConversionOptions } from '../interfaces/conversion_options';
export declare class ConversionOptions implements IConversionOptions {
    AnnotationsMode: number | null;
    CertificateName: string | null;
    ConvertTo: number | undefined;
    SignatureMode: number | undefined;
    TimeStampPwd: string | null;
    TimeStampServer: string | null;
    TimeStampUser: string | null;
    MultipageStreamName: string | null;
}
