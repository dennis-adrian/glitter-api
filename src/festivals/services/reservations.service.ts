import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAll() {
    return await this.prisma.reservation.findMany({});
  }
}
