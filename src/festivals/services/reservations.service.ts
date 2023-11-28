import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, ReservationStatus } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { ReservationUpdate } from '../dtos/reservation-update.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll() {
    return await this.prisma.reservation.findMany({
      include: {
        stand: true,
        artists: true,
        festival: true,
      },
      orderBy: {
        standId: 'asc',
      },
    });
  }

  async findAllByFestivalId(id: number) {
    return await this.prisma.reservation.findMany({
      where: {
        festivalId: id,
      },
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

  async update(params: {
    where: Prisma.ReservationWhereUniqueInput;
    data: ReservationUpdate;
  }) {
    const { where, data } = params;

    try {
      return await this.prisma.reservation.update({
        where,
        data: {
          status: data.status,
          stand: {
            update: {
              status: this.getStandStatus(data.status),
            },
          },
          artists: {
            disconnect: data.artistsIdsToRemove?.map((id) => ({ id })) || [],
            connect: data.artistsIdsToAdd?.map((id) => ({ id })) || [],
          },
        },
        include: {
          artists: true,
          stand: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(where: Prisma.ReservationWhereUniqueInput) {
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

  getStandStatus = (reservationStatus: ReservationStatus) => {
    switch (reservationStatus) {
      case 'APPROVED':
        return 'CONFIRMED';
      case 'CANCELLED':
        return 'AVAILABLE';
      case 'PENDING':
        return 'RESERVED';
      case 'REJECTED':
        return 'AVAILABLE';
      default:
        return 'AVAILABLE';
    }
  };
}
