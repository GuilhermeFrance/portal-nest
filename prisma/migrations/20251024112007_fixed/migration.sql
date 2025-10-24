-- DropForeignKey
ALTER TABLE "public"."clients" DROP CONSTRAINT "clients_badgesKey_fkey";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "badgesKey" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_badgesKey_fkey" FOREIGN KEY ("badgesKey") REFERENCES "badges"("key") ON DELETE SET NULL ON UPDATE CASCADE;
