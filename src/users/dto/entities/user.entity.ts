import { Festival, Reservation } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  festivals: Festival[];
  reservations: Reservation[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Expose()
  get hasActiveReservation(): boolean {
    const activeFestival = this.festivals.find(
      (festival) => festival.status === 'ACTIVE',
    );

    if (!activeFestival) return false;

    const reservationsFromActiveFestival = this.reservations.filter(
      (reservation) => reservation.festivalId === activeFestival.id,
    );

    return reservationsFromActiveFestival.length > 0;
  }
}
