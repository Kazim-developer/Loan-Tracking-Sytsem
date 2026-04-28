/*
  Warnings:

  - You are about to drop the column `frequency` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `startingDate` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('ACTIVE', 'CLOSED');

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "frequency",
DROP COLUMN "startDate",
ADD COLUMN     "installmentFrequency" "Frequency",
ADD COLUMN     "startingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "LoanStatus" NOT NULL DEFAULT 'ACTIVE';
