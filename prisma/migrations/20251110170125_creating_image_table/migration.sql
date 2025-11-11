/*
  Warnings:

  - You are about to drop the column `fileName` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `isProfile` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Image` table. All the data in the column will be lost.
  - Added the required column `data` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_ownerId_fkey";

-- DropIndex
DROP INDEX "public"."Image_ownerId_idx";

-- DropIndex
DROP INDEX "public"."Image_ownerId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "fileName",
DROP COLUMN "isProfile",
DROP COLUMN "mimeType",
DROP COLUMN "ownerId",
DROP COLUMN "path",
DROP COLUMN "size",
DROP COLUMN "url",
ADD COLUMN     "data" BYTEA NOT NULL,
ADD COLUMN     "mimetype" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "imageId" INTEGER,
ADD COLUMN     "profileImageId" INTEGER;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
