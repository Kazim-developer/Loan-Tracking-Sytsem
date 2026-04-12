/*
  Warnings:

  - A unique constraint covering the columns `[providerSubscriptionId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Made the column `provider` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AddOnType" AS ENUM ('EMAIL_REMINDERS', 'WHATSAPP_REMINDERS', 'ACCOUNTS');

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "provider" SET NOT NULL,
ALTER COLUMN "provider" SET DEFAULT 'paddle';

-- CreateTable
CREATE TABLE "Usage" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "billingPeriodStart" TIMESTAMP(3) NOT NULL,
    "billingPeriodEnd" TIMESTAMP(3) NOT NULL,
    "accountsUsed" INTEGER NOT NULL DEFAULT 0,
    "remindersUsed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionAddOn" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "type" "AddOnType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "used" INTEGER NOT NULL DEFAULT 0,
    "paddleTransactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionAddOn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookEvent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usage_accountId_key" ON "Usage"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionAddOn_paddleTransactionId_key" ON "SubscriptionAddOn"("paddleTransactionId");

-- CreateIndex
CREATE INDEX "SubscriptionAddOn_accountId_idx" ON "SubscriptionAddOn"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "WebhookEvent_eventId_key" ON "WebhookEvent"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_providerSubscriptionId_key" ON "Subscription"("providerSubscriptionId");

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionAddOn" ADD CONSTRAINT "SubscriptionAddOn_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
