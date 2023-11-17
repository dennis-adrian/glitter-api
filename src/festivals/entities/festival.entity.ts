import { Reservation, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class FestivalEntity {
  constructor(partial: Partial<FestivalEntity>) {
    Object.assign(this, partial);
  }

  artists: User[];
  reservations: Reservation[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
