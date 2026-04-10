/*
  Warnings:

  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageUrl",
DROP COLUMN "name";
