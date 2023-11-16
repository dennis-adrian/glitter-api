import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll() {
    return await this.prisma.reservation.findMany({
      include: {
        artists: true,
      },
    });
  }

  async create(
    data: Prisma.ReservationCreateInput & {
      artists: Prisma.UserWhereUniqueInput[];
    },
  ) {
    const reservation = await this.prisma.reservation.create({
      data: {
        ...data,
        artists: {
          connect: data.artists,
        },
      },
      include: {
        artists: true,
        stand: true,
      },
    });

    if (reservation.id) {
      const stand = await this.prisma.stand.update({
        where: {
          id: reservation.stand.id,
        },
        data: {
          status: 'RESERVED',
        },
      });

      return {
        ...reservation,
        stand,
      };
    }
  }
}
