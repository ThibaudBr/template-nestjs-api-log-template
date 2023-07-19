import { LoggingTypeEnum } from '../../../domain/enum/logging-type.enum';
import { ApiTypeEnum } from '../../../domain/enum/api-type.enum';

export class CreateLogCommand {
  apiName: string;
  loggingType: LoggingTypeEnum;
  apiVersion: string;
  apiType: ApiTypeEnum;
  method: string;
  route: string;
  headers?: object;
  body?: object;
  status?: number;
  responseHeaders?: object;
  responseBody?: object;
  error?: string;
  os?: string;
  platform?: string;
  screenSize?: string;
  ip?: string;
  userId?: string;
  traceId?: string;

  constructor(partial: Partial<CreateLogCommand>) {
    Object.assign(this, partial);
  }
}
