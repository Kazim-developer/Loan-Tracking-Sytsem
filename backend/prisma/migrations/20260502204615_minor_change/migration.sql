/*
  Warnings:

  - The values [PARTIAL] on the enum `InstallmentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InstallmentStatus_new" AS ENUM ('PENDING', 'PAID', 'DUE', 'OVERDUE');
ALTER TABLE "public"."LoanInstallment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "LoanInstallment" ALTER COLUMN "status" TYPE "InstallmentStatus_new" USING ("status"::text::"InstallmentStatus_new");
ALTER TYPE "InstallmentStatus" RENAME TO "InstallmentStatus_old";
ALTER TYPE "InstallmentStatus_new" RENAME TO "InstallmentStatus";
DROP TYPE "public"."InstallmentStatus_old";
ALTER TABLE "LoanInstallment" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
