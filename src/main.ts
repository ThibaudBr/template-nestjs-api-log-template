import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  const tcpOptions: TcpOptions = {
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('TCP_HOST') ?? 'localhost',
      port: configService.get<number>('TCP_PORT'),
    },
  };
  app.connectMicroservice<MicroserviceOptions>(tcpOptions);
  await app.startAllMicroservices();
  await app.listen(configService.get<string>('PORT') ?? 3001);
}
bootstrap()
  .then()
  .catch((error: Error) => {
    console.log(error);
  });
