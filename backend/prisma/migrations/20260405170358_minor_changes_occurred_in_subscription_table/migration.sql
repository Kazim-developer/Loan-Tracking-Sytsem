/*
  Warnings:

  - You are about to drop the column `userId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `outstanding` on the `ClientAccount` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ClientAccount` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `Installment` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `Payment` table. All the data in the column will be lost.
  - The `features` column on the `Plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `accountId` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientAccountId` to the `Installment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientAccountId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientAccountId` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingCycle` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'YEARLY');

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_userId_fkey";

-- DropForeignKey
ALTER TABLE "ClientAccount" DROP CONSTRAINT "ClientAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "Installment" DROP CONSTRAINT "Installment_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClientAccount" DROP COLUMN "outstanding",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Installment" DROP COLUMN "accountId",
ADD COLUMN     "clientAccountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "accountId",
ADD COLUMN     "clientAccountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "priceYear" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "features",
ADD COLUMN     "features" JSONB;

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "accountId",
ADD COLUMN     "clientAccountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "autoRenew" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "billingCycle" "BillingCycle" NOT NULL,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "providerCustomerId" TEXT,
ADD COLUMN     "providerSubscriptionId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_accountId_key" ON "Subscription"("accountId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "ClientAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "ClientAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "ClientAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
