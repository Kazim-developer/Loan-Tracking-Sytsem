/*
  Warnings:

  - You are about to drop the column `firstPaymentDate` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmountToBePaid` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `totalPayable` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "firstPaymentDate",
DROP COLUMN "totalAmountToBePaid",
ADD COLUMN     "firstInstallmentDate" TIMESTAMP(3),
ADD COLUMN     "totalPayable" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;
