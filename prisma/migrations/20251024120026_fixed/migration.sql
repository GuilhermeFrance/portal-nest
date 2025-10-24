/*
  Warnings:

  - Made the column `typeId` on table `requests` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."requests" DROP CONSTRAINT "requests_typeId_fkey";

-- AlterTable
ALTER TABLE "requests" ALTER COLUMN "typeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
