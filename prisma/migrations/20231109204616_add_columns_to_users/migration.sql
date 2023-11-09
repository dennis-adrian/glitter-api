/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firebase_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "firebase_id" TEXT,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "is_custom_photo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "photo_url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_id_key" ON "users"("firebase_id");
