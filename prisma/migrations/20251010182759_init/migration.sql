/*
  Warnings:

  - Added the required column `description` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "description" VARCHAR(300) NOT NULL;
