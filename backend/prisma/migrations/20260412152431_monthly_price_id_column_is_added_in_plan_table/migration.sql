/*
  Warnings:

  - A unique constraint covering the columns `[monthlyPriceId]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "monthlyPriceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Plan_monthlyPriceId_key" ON "Plan"("monthlyPriceId");
