-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_requested_by_id_fkey";

-- AlterTable
ALTER TABLE "reservations" ALTER COLUMN "artist_id" DROP NOT NULL,
ALTER COLUMN "requested_by_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
