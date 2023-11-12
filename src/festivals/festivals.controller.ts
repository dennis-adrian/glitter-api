import { Body, Controller, Get, Post } from '@nestjs/common';
import { FestivalsService } from './festivals.service';
import { Festival } from '@prisma/client';
import { CreateFestivalDto } from './dto/create-festival.dto';

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
  async findAll(): Promise<Festival[]> {
    return this.festivalsService.findAll();
  }
}
