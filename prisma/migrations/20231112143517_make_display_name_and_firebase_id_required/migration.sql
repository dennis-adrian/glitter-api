/*
  Warnings:

  - Made the column `firebase_id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `display_name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "firebase_id" SET NOT NULL,
ALTER COLUMN "display_name" SET NOT NULL;
