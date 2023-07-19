import { Module } from '@nestjs/common';
import { ApiLogService } from './application/api-log.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLogCommandHandler } from './application/cqrs/handler/command/create-log.command-handler';
import { ErrorCustomEventHandler } from './application/cqrs/handler/event/error-custom.event-handler';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'API_LOG',
        transport: Transport.TCP,
        options: {
          host: process.env.HOST_API_LOG || 'localhost',
          port: Number(process.env.PORT_API_LOG) || 3101,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [ApiLogService, ErrorCustomEventHandler, CreateLogCommandHandler],
})
export class ApiLogModule {}
