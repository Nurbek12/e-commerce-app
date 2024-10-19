import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client-statistics';

@Injectable()
export class StatisticsService {
  constructor(private readonly prismaService: PrismaService) {}

  private getCurrentDate() {
    const date = new Date()
    return {
      day: date.getDate(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.toLocaleDateString(),
    }
  }

  async getStatisticsByDate(date?: string) {
    const statisticDate = date || this.getCurrentDate().date;
    const statistic = this.prismaService.statistics.findUnique({ where: { date: statisticDate } });
    return { statistics: [statistic] }
  }

  async updateStatistics(request: Prisma.StatisticsUpdateInput) {
    if(typeof request.date !== 'string') return {}

    const statistic = await this.getStatisticsByDate(request.date);

    if (!statistic) {
      return this.createStatistic({ 
        ...this.getCurrentDate(), 
        ...request as any,
      });
    }

    return this.prismaService.statistics.update({
      where: { id: (await statistic.statistics[0]).id },
      data: request,
    });
  }

  async createStatistic(data: Prisma.StatisticsCreateInput) {
    return this.prismaService.statistics.create({ data });
  }
}
