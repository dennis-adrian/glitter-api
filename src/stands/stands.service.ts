import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StandsService {
  constructor(private prisma: DatabaseService) {}

  async create(data: Prisma.StandCreateInput) {
    try {
      return await this.prisma.stand.create({
        data,
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.prisma.stand.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} stand`;
  }

  // update(id: number, updateStandDto: UpdateStandDto) {
  //   return `This action updates a #${id} stand`;
  // }

  remove(id: number) {
    return `This action removes a #${id} stand`;
  }
}
