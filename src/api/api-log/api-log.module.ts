import { Module } from '@nestjs/common';
import { ApiLogService } from './application/api-log.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLogCommandHandler } from './application/cqrs/handler/command/create-log.command-handler';
import { ErrorCustomEventHandler } from './application/cqrs/handler/event/error-custom.event-handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    ClientsModule.register([
      {
        name: 'API_LOG',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_HOST_API_LOG || 'localhost',
          port: Number(process.env.TCP_PORT_API_LOG) || 3101,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [ApiLogService, ErrorCustomEventHandler, CreateLogCommandHandler],
})
export class ApiLogModule {}
