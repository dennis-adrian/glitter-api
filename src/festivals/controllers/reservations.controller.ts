import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReservationsService } from '../services/reservations.service';
import { Prisma, Reservation } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async findAll(@Query('festival') festival?: string): Promise<Reservation[]> {
    if (festival) {
      return this.reservationsService.findAllByFestivalId(+festival);
    }

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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.ReservationUpdateInput,
  ): Promise<Reservation> {
    return this.reservationsService.update(
      { id: Number(id) },
      { status: data.status },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.remove({ id: Number(id) });
  }
}
