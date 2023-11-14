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
        availableArtists: true,
        reservations: true,
        stands: {
          include: {
            reservations: {
              include: {
                artist: true,
                requestedBy: true,
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
      availableArtists: Prisma.UserUpdateManyWithoutFestivalsNestedInput['connect'];
    };
  }) {
    const { where, data } = params;
    return await this.prisma.festival.update({
      include: {
        availableArtists: true,
        stands: true,
      },
      data: {
        ...data,
        availableArtists: {
          connect: data.availableArtists,
        },
      },
      where,
    });
  }
}
