/*
  Warnings:

  - You are about to drop the column `passowrd` on the `clients` table. All the data in the column will be lost.
  - Added the required column `password` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "passowrd",
ADD COLUMN     "password" TEXT NOT NULL;
