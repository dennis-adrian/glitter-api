/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `festivals` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `festivals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "festivals" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "festivals_name_key" ON "festivals"("name");
