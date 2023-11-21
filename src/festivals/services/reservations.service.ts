import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, StandStatus } from '@prisma/client';
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
      orderBy: {
        createdAt: 'desc',
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
    data: Prisma.ReservationUpdateInput & {
      artists: {
        connect: Prisma.UserWhereUniqueInput[];
        disconnect: Prisma.UserWhereUniqueInput[];
      };
      stand: Prisma.StandUpdateWithoutReservationsInput;
    };
  }) {
    const { where, data } = params;

    try {
      if (data.artists) {
        this.updateArtists(where, data.artists);
      }

      return await this.prisma.reservation.update({
        where,
        data: {
          ...data,
          ...this.createStandStatusUpdateOperation(data.status),
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

  private async updateArtists(
    where: Prisma.ReservationWhereUniqueInput,
    artists: {
      connect: Prisma.UserWhereUniqueInput[];
      disconnect: Prisma.UserWhereUniqueInput[];
    },
  ) {
    const operations = [];
    if (artists.disconnect?.length > 0) {
      operations.push(
        this.prisma.reservation.update(
          this.createDisconnectArtistsOperation(where, artists.disconnect),
        ),
      );
    }

    if (artists.connect?.length > 0) {
      operations.push(
        this.prisma.reservation.update(
          this.createConnectArtistsOperation(where, artists.connect),
        ),
      );
    }

    await this.prisma.$transaction(operations);
  }

  private createDisconnectArtistsOperation(
    where: Prisma.ReservationWhereUniqueInput,
    artists: Prisma.UserWhereUniqueInput[],
  ) {
    return {
      where,
      data: {
        artists: {
          disconnect: artists,
        },
      },
    };
  }

  private createConnectArtistsOperation(
    where: Prisma.ReservationWhereUniqueInput,
    artists: Prisma.UserWhereUniqueInput[],
  ) {
    return {
      where,
      data: {
        artists: {
          connect: artists,
        },
      },
    };
  }

  private createStandStatusUpdateOperation(
    reservationStatus: Prisma.ReservationUpdateInput['status'],
  ) {
    let status: StandStatus;
    switch (reservationStatus) {
      case 'APPROVED':
        status = 'CONFIRMED';
        break;
      case 'CANCELLED':
        status = 'AVAILABLE';
        break;
      case 'PENDING':
        status = 'RESERVED';
        break;
      case 'REJECTED':
        status = 'AVAILABLE';
        break;
      default:
        status = 'AVAILABLE';
        break;
    }

    return {
      stand: {
        update: {
          status,
        },
      },
    };
  }
}
