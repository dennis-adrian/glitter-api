import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FestivalsService } from '../services/festivals.service';
import { Festival, Prisma } from '@prisma/client';
import { CreateFestivalDto } from '../dtos/create-festival.dto';

@Controller('festivals')
export class FestivalsController {
  constructor(private readonly festivalsService: FestivalsService) {}

  @Post()
  async create(@Body() festivalData: CreateFestivalDto): Promise<Festival> {
    try {
      return this.festivalsService.create(festivalData);
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(
    @Query('active') active?: string,
  ): Promise<Festival[] | Festival> {
    const isActive: boolean = active === 'true';
    if (isActive) {
      const festival = await this.festivalsService.findActive();
      return festival;
    }

    return this.festivalsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    festivalData: Prisma.FestivalUpdateInput & {
      artists: Prisma.UserUpdateManyWithoutFestivalsNestedInput['connect'];
    },
  ): Promise<Festival> {
    return this.festivalsService.update({
      where: {
        id: +id,
      },
      data: festivalData,
    });
  }
}
