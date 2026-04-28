/*
  Warnings:

  - You are about to drop the column `installmentCount` on the `Loan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "installmentCount",
ADD COLUMN     "totalInstallments" INTEGER,
ALTER COLUMN "remainingAmount" DROP NOT NULL;
