-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "badgesKey" TEXT NOT NULL DEFAULT 'requester';

-- CreateTable
CREATE TABLE "badges" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "badges_key_key" ON "badges"("key");

-- CreateIndex
CREATE UNIQUE INDEX "badges_name_key" ON "badges"("name");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_badgesKey_fkey" FOREIGN KEY ("badgesKey") REFERENCES "badges"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
