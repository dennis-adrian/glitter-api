import { Injectable } from '@nestjs/common';
import { Prisma, Reservation } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll() {
    return await this.prisma.reservation.findMany({
      include: {
        stand: true,
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

  async remove(
    where: Prisma.ReservationWhereUniqueInput,
  ): Promise<Reservation> {
    const reservation = await this.prisma.reservation.delete({
      where,
    });

    if (reservation.id) {
      const stand = await this.prisma.stand.update({
        where: {
          id: reservation.standId,
        },
        data: {
          status: 'AVAILABLE',
        },
      });

      return {
        ...reservation,
        standId: stand.id,
      };
    }
  }
}
