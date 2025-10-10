/*
  Warnings:

  - Added the required column `passowrd` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "passowrd" TEXT NOT NULL;
