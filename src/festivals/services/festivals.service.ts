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

  async findAll() {
    return await this.prisma.festival.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findAllActive() {
    return await this.prisma.festival.findMany({
      include: {
        artists: true,
        reservations: {
          include: {
            artists: true,
          },
        },
        stands: {
          include: {
            reservations: {
              include: {
                artists: true,
              },
              orderBy: {
                id: 'asc',
              },
            },
          },
        },
      },
      where: {
        status: 'ACTIVE',
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async update(params: {
    where: Prisma.FestivalWhereUniqueInput;
    data: Prisma.FestivalUpdateInput & {
      artists: Prisma.UserUpdateManyWithoutFestivalsNestedInput['connect'];
    };
  }) {
    const { where, data } = params;
    return await this.prisma.festival.update({
      include: {
        artists: true,
        stands: true,
      },
      data: {
        ...data,
        artists: {
          connect: data.artists,
        },
      },
      where,
    });
  }
}
