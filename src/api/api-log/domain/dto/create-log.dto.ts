import { ApiTypeEnum } from '../enum/api-type.enum';

export class CreateLogDto {
  constructor(partial: Partial<CreateLogDto>) {
    Object.assign(this, partial);
  }
  public readonly id: string;
  public readonly apiName: string;
  public readonly apiVersion: string;
  public readonly apiType: ApiTypeEnum;
  public readonly module: string;
  public readonly ip?: string;
  public readonly method?: string;
  public readonly route?: string;
  public readonly headers?: object;
  public readonly status?: number;
  public readonly responseHeaders?: object;
  public readonly responseBody?: object;
  public readonly error?: string;
  public readonly os?: string;
  public readonly platform?: string;
  public readonly body?: object;
  public readonly traceId?: string;
  public readonly userId: string;
}
