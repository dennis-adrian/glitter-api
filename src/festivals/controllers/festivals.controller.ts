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
import { FestivalEntity } from '../entities/festival.entity';

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
  ): Promise<Festival[] | FestivalEntity[]> {
    const isActive: boolean = active === 'true';
    if (isActive) {
      const festivals = await this.festivalsService.findAllActive();
      return festivals?.map(
        (festival) => new FestivalEntity(festival as Festival),
      );
    }

    return this.festivalsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    festivalData: Prisma.FestivalUpdateInput & {
      availableArtists: Prisma.UserUpdateManyWithoutFestivalsNestedInput['connect'];
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
