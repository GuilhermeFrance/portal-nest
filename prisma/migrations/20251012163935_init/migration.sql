/*
  Warnings:

  - The values [EM_ANDAMENTO] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('ABERTO', 'PROCESSANDO', 'CONCLUIDO', 'REJEITADO');
ALTER TABLE "public"."requests" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "requests" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "public"."RequestStatus_old";
ALTER TABLE "requests" ALTER COLUMN "status" SET DEFAULT 'ABERTO';
COMMIT;
