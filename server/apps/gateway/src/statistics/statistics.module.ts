import { Module } from '@nestjs/common';
import { clientService } from 'libs/utils';
import { ClientsModule } from '@nestjs/microservices';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [ClientsModule.register([
    clientService('STATISTICS_PACKAGE')
  ])],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
