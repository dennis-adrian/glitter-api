/*
  Warnings:

  - The values [SOLD] on the enum `StandStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "FestivalStatus" ADD VALUE 'ACTIVE';

-- AlterEnum
BEGIN;
CREATE TYPE "StandStatus_new" AS ENUM ('AVAILABLE', 'RESERVED', 'CONFIRMED');
ALTER TABLE "stands" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "stands" ALTER COLUMN "status" TYPE "StandStatus_new" USING ("status"::text::"StandStatus_new");
ALTER TYPE "StandStatus" RENAME TO "StandStatus_old";
ALTER TYPE "StandStatus_new" RENAME TO "StandStatus";
DROP TYPE "StandStatus_old";
ALTER TABLE "stands" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;
