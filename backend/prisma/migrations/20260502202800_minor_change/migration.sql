/*
  Warnings:

  - You are about to drop the column `date` on the `InstallmentPayment` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `LoanPayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InstallmentPayment" DROP COLUMN "date",
ADD COLUMN     "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LoanInstallment" ADD COLUMN     "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LoanPayment" DROP COLUMN "date",
ADD COLUMN     "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
