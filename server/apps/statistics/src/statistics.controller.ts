import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StatisticsService } from './statistics.service';
import { GetStatisticsRequest, SetStatisticsRequest, STATISTIC_SERVICE_NAME } from 'gen/statistics'

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @GrpcMethod(STATISTIC_SERVICE_NAME, 'GetStatistics')
  getStatistics(request: GetStatisticsRequest) {
    return this.statisticsService.getStatisticsByDate(request.date)
  }

  @GrpcMethod(STATISTIC_SERVICE_NAME, 'SetStatistics')
  setStatistics(request: SetStatisticsRequest) {
    return this.statisticsService.updateStatistics(request)
  }
}
