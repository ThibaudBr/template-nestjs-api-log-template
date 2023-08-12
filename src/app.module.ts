import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ApiLogModule } from './api/api-log/api-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),
        TCP_HOST: Joi.string().required(),
        TCP_PORT: Joi.string().required(),
        TCP_HOST_API_LOG: Joi.string().required(),
        TCP_PORT_API_LOG: Joi.string().required(),
        VERBOSE_LOG: Joi.string().required(),
        API_NAME: Joi.string().required(),
        HOST_API_LOG: Joi.string().required(),
        API_LOG_TOKEN: Joi.string().required(),
        IS_LOG_BY_HTTP: Joi.boolean().required(),
      }),
    }),
    ApiLogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
