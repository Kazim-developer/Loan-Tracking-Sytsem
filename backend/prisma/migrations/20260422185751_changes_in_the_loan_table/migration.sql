/*
  Warnings:

  - Added the required column `endDate` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmountToBePaid` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_installmentId_fkey";

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalAmountToBePaid" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "loanId" TEXT,
ALTER COLUMN "installmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "LoanInstallment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
