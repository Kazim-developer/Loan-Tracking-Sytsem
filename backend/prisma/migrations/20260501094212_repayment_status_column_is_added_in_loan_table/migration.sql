-- CreateEnum
CREATE TYPE "RepaymentStatus" AS ENUM ('PENDING', 'PARTIAL', 'PAID', 'OVERDUE');

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "repaymentStatus" "RepaymentStatus" NOT NULL DEFAULT 'PENDING';
