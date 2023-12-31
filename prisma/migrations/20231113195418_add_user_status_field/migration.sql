-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'WAITING_APPROVAL', 'DISABLED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'WAITING_APPROVAL';
