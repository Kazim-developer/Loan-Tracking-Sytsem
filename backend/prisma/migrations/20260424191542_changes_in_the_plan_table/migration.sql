/*
  Warnings:

  - The values [ACCOUNTS] on the enum `AddOnType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `maxInvoices` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `maxLoans` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceUsed` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `loanUsed` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `reminderUsed` on the `Usage` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AddOnType_new" AS ENUM ('EMAIL_REMINDERS', 'WHATSAPP_REMINDERS');
ALTER TABLE "SubscriptionAddOn" ALTER COLUMN "type" TYPE "AddOnType_new" USING ("type"::text::"AddOnType_new");
ALTER TYPE "AddOnType" RENAME TO "AddOnType_old";
ALTER TYPE "AddOnType_new" RENAME TO "AddOnType";
DROP TYPE "public"."AddOnType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "maxInvoices",
DROP COLUMN "maxLoans",
ADD COLUMN     "maxActiveLoans" INTEGER,
ADD COLUMN     "maxClients" INTEGER,
ADD COLUMN     "maxTotalLoans" INTEGER;

-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "invoiceUsed",
DROP COLUMN "loanUsed",
DROP COLUMN "reminderUsed",
ADD COLUMN     "activeLoanUsed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "clientsUsed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "emailRemindersUsed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalLoansUsed" INTEGER NOT NULL DEFAULT 0;
