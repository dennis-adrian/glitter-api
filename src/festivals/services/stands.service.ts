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

  async findOne(id: number) {
    return await this.prisma.stand.findUnique({
      where: {
        id,
      },
      include: {
        reservations: {
          include: {
            artist: true,
            requestedBy: true,
          },
        },
      },
    });
  }

  async update(params: {
    where: Prisma.StandWhereUniqueInput;
    data: Prisma.StandUpdateInput & {
      reservations: Prisma.ReservationCreateInput[];
    };
  }) {
    const { where, data } = params;
    return await this.prisma.stand.update({
      data: {
        ...data,
        reservations: {
          create: data.reservations,
        },
      },
      where,
      include: {
        reservations: {
          include: {
            artist: true,
            requestedBy: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} stand`;
  }
}
