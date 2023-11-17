import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from '../services/reservations.service';
import { Prisma, Reservation } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Post()
  async create(
    @Body()
    data: Prisma.ReservationCreateInput & {
      artists: Prisma.UserWhereUniqueInput[];
    },
  ): Promise<Reservation> {
    return this.reservationsService.create(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.remove({ id: Number(id) });
  }
}
