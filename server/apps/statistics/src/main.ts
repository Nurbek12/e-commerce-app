import { microService } from 'libs/utils';
import { NestFactory } from '@nestjs/core';
import { StatisticsModule } from './statistics.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(StatisticsModule, microService('STATISTICS_PACKAGE'));
  await app.listen()
}

bootstrap();