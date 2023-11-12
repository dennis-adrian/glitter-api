-- CreateEnum
CREATE TYPE "StandStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'SOLD');

-- CreateEnum
CREATE TYPE "StandOrientation" AS ENUM ('HORIZONTAL', 'VERTICAL');

-- AlterTable
ALTER TABLE "stands" ADD COLUMN     "orientation" "StandOrientation" NOT NULL DEFAULT 'HORIZONTAL',
ADD COLUMN     "status" "StandStatus" NOT NULL DEFAULT 'AVAILABLE';
