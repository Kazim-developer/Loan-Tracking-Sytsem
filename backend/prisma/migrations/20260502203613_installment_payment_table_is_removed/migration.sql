/*
  Warnings:

  - You are about to drop the `InstallmentPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InstallmentPayment" DROP CONSTRAINT "InstallmentPayment_installmentId_fkey";

-- DropTable
DROP TABLE "InstallmentPayment";
