/*
  Warnings:

  - You are about to drop the column `activeLoanUsed` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `clientsUsed` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `emailRemindersUsed` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `totalLoansUsed` on the `Usage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "activeLoanUsed",
DROP COLUMN "clientsUsed",
DROP COLUMN "emailRemindersUsed",
DROP COLUMN "totalLoansUsed",
ADD COLUMN     "totalUsedActiveLoans" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalUsedEmailReminders" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalUsedLoans" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalUsedclients" INTEGER NOT NULL DEFAULT 0;
