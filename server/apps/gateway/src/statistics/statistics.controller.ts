import { ClientGrpc } from '@nestjs/microservices';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { StatisticServiceClient, STATISTIC_SERVICE_NAME } from 'gen/statistics';
import { Controller, Get, Body, Patch, Param, OnModuleInit, Inject } from '@nestjs/common';

@Controller('statistics')
export class StatisticsController implements OnModuleInit {
  constructor(@Inject('STATISTICS_PACKAGE') private statisticsClient: ClientGrpc) {}

  statisticsService: StatisticServiceClient

  onModuleInit() {
    this.statisticsService = this.statisticsClient.getService<StatisticServiceClient>(STATISTIC_SERVICE_NAME)
  }

  @Get(':date')
  findOne(@Param('date') date: string) {
    return this.statisticsService.getStatistics({ date })
  }

  @Patch('')
  update(@Body() updateStatisticDto: UpdateStatisticDto) {
    return this.statisticsService.setStatistics(updateStatisticDto);
  }
}
