import { Controller } from '@nestjs/common';
import { FestivalsService } from './festivals.service';

@Controller('festivals')
export class FestivalsController {
  constructor(private readonly festivalsService: FestivalsService) {}
}
