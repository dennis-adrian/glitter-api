import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FestivalsService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Prisma.FestivalCreateInput) {
    try {
      return await this.databaseService.festival.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
