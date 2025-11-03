/*
  Warnings:

  - You are about to drop the column `name` on the `clients` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;
