-- DropForeignKey
ALTER TABLE "public"."requests" DROP CONSTRAINT "requests_statusKey_fkey";

-- AlterTable
ALTER TABLE "requests" ALTER COLUMN "statusKey" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_statusKey_fkey" FOREIGN KEY ("statusKey") REFERENCES "RequestStatus"("key") ON DELETE SET NULL ON UPDATE CASCADE;
