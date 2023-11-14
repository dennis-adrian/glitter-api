import { Module } from '@nestjs/common';
import { FestivalsService } from './services/festivals.service';
import { FestivalsController } from './controllers/festivals.controller';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations.service';
import { StandsController } from './controllers/stands.controller';
import { StandsService } from './services/stands.service';

@Module({
  controllers: [FestivalsController, ReservationsController, StandsController],
  providers: [FestivalsService, ReservationsService, StandsService],
})
export class FestivalsModule {}
