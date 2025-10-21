/*
  Warnings:

  - You are about to drop the column `statusId` on the `requests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."requests" DROP CONSTRAINT "requests_statusId_fkey";

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "statusId",
ADD COLUMN     "statusKey" TEXT NOT NULL DEFAULT 'aberto';

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_statusKey_fkey" FOREIGN KEY ("statusKey") REFERENCES "RequestStatus"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
