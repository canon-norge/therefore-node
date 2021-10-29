import { IConversionOptions } from '../interfaces/conversion_options';

export class ConversionOptions implements IConversionOptions {
  AnnotationsMode: number | null = null;
  CertificateName: string | null = null;
  ConvertTo: number | undefined = undefined;
  SignatureMode: number | undefined = undefined;
  TimeStampPwd: string | null = null;
  TimeStampServer: string | null = null;
  TimeStampUser: string | null = null;
  MultipageStreamName: string | null = null;
}
