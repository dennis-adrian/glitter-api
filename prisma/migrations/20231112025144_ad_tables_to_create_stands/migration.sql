-- CreateEnum
CREATE TYPE "FestivalStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "festivals" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "location_url" TEXT,
    "logo_url" TEXT,
    "status" "FestivalStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "festivals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stands" (
    "id" SERIAL NOT NULL,
    "label" TEXT,
    "stand_number" INTEGER NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "festival_id" INTEGER NOT NULL,

    CONSTRAINT "stands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" SERIAL NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "stand_id" INTEGER NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "requested_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stands" ADD CONSTRAINT "stands_festival_id_fkey" FOREIGN KEY ("festival_id") REFERENCES "festivals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_stand_id_fkey" FOREIGN KEY ("stand_id") REFERENCES "stands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
