import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  async findAll(@Query('active') active?: string): Promise<Festival[]> {
    const isActive: boolean = active === 'true';
    if (isActive) return this.festivalsService.findAllActive();

    return this.festivalsService.findAll();
  }
}
