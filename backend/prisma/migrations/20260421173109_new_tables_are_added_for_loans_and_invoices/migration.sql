/*
  Warnings:

  - You are about to drop the column `maxAccounts` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "maxAccounts",
ADD COLUMN     "maxInvoices" INTEGER,
ADD COLUMN     "maxLoans" INTEGER;
