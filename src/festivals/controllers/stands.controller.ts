import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StandsService } from '../services/stands.service';
import { CreateStandDto } from '../dtos/create-stand.dto';
import { Prisma } from '@prisma/client';

@Controller('stands')
export class StandsController {
  constructor(private readonly standsService: StandsService) {}

  @Post()
  async create(@Body() createStandDto: CreateStandDto) {
    return this.standsService.create(createStandDto);
  }

  @Get()
  async findAll() {
    return this.standsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.standsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStandDto: UpdateStandDto) {
  //   return this.standsService.update(+id, updateStandDto);
  // }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    standData: Prisma.StandUpdateInput & {
      reservations: Prisma.ReservationCreateInput[];
    },
  ) {
    return this.standsService.update({
      where: {
        id: +id,
      },
      data: standData,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standsService.remove(+id);
  }
}
