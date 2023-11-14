/*
  Warnings:

  - Added the required column `festival_id` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "festival_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_festival_id_fkey" FOREIGN KEY ("festival_id") REFERENCES "festivals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
