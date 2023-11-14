import { Reservation, User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class FestivalEntity {
  constructor(partial: Partial<FestivalEntity>) {
    Object.assign(this, partial);
  }

  availableArtists: User[];
  reservations: Reservation[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Expose()
  get artistsWithoutReservation(): User[] {
    const artistIdsWithReservations = this.reservations?.map(
      (reservation) => reservation.artistId,
    );

    if (!artistIdsWithReservations) return this.availableArtists;

    const artistsWithoutReservation = this.availableArtists?.filter(
      (artist) => !artistIdsWithReservations.includes(artist.id),
    );

    return artistsWithoutReservation;
  }
}
