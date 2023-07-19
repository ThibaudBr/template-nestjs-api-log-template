import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { ApiLogService } from '../../../api-log.service';
import { ErrorCustomEvent } from '../../event/error-custom.event';
import { CreateLogDto } from '../../../../domain/dto/create-log.dto';

@EventsHandler(ErrorCustomEvent)
export class ErrorCustomEventHandler implements IEventHandler<ErrorCustomEvent> {
  constructor(private readonly apiLoggerService: ApiLogService, private readonly configService: ConfigService) {}

  async handle(event: ErrorCustomEvent): Promise<void> {
    await this.apiLoggerService.createLog(
      new CreateLogDto({
        ...event,
      }),
    );
  }
}
