import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FestivalsService {
  constructor(private prisma: DatabaseService) {}

  async create(data: Prisma.FestivalCreateInput) {
    try {
      return await this.prisma.festival.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
