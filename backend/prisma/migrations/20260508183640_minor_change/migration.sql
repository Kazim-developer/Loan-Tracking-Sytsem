-- AlterTable
ALTER TABLE "Usage" ALTER COLUMN "billingPeriodStart" DROP NOT NULL,
ALTER COLUMN "billingPeriodEnd" DROP NOT NULL;
