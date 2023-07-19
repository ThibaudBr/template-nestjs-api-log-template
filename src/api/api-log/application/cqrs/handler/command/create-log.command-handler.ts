import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLogCommand } from '../../command/create-log.command';
import { VerboseLogEnum } from '../../../../domain/enum/verbose-log.enum';
import * as process from 'process';
import { ApiTypeEnum } from '../../../../domain/enum/api-type.enum';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateLogCommand)
export class CreateLogCommandHandler implements ICommandHandler<CreateLogCommand> {
  private readonly API_NAME: string;
  private readonly npm_package_version: string;
  private readonly API_TYPE: ApiTypeEnum;
  private readonly verbose: VerboseLogEnum;
  private readonly apiLogUrl: string;
  private readonly API_LOG_TOKEN: string;
  private readonly IS_LOG_BY_HTTP: boolean;

  constructor(
    @Inject('API_LOG') private client: ClientProxy,
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.verbose = configService.get<VerboseLogEnum>('VERBOSE_LOG') ?? VerboseLogEnum.NONE;
    this.API_NAME = configService.get<string>('API_NAME') ?? 'NO-NAME';
    this.npm_package_version = process.env.npm_package_version ?? 'NO-VERSION';
    this.apiLogUrl = configService.get<string>('HOST_API_LOG') ?? 'NO-URL';
    this.API_TYPE = ApiTypeEnum.WALLET_SHARE_API;
    this.API_LOG_TOKEN = configService.get<string>('API_LOG_TOKEN') ?? 'NO-TOKEN';
    this.IS_LOG_BY_HTTP = configService.get<boolean>('IS_LOG_BY_HTTP') ?? true;
  }

  async execute(command: CreateLogCommand): Promise<void> {
    if (this.verbose === VerboseLogEnum.NONE) return;
    if (this.verbose === VerboseLogEnum.DEBUG && command.error) console.log('CreateLogCommandHandler: ', command);
    command.apiName = this.API_NAME;
    command.apiVersion = this.npm_package_version;
    command.apiType = this.API_TYPE;

    if (this.IS_LOG_BY_HTTP) {
      await firstValueFrom(
        this.httpService.post(this.apiLogUrl + '/create-log', command, {
          headers: {
            Authorization: this.API_LOG_TOKEN,
          },
        }),
      ).catch((): void => {
        return;
      });
    } else {
      this.client.emit('create-log', command);
    }
  }
}
