/*
  Warnings:

  - You are about to drop the column `totalUsedActiveLoans` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `totalUsedEmailReminders` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `totalUsedLoans` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `totalUsedclients` on the `Usage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "totalUsedActiveLoans",
DROP COLUMN "totalUsedEmailReminders",
DROP COLUMN "totalUsedLoans",
DROP COLUMN "totalUsedclients",
ADD COLUMN     "usedActiveLoans" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "usedClients" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "usedEmailReminders" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "usedTotalLoans" INTEGER NOT NULL DEFAULT 0;
