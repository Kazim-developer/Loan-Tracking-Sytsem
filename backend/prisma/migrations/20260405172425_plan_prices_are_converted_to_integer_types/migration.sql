/*
  Warnings:

  - You are about to alter the column `priceMonth` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `priceYear` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "priceMonth" SET DATA TYPE INTEGER,
ALTER COLUMN "priceYear" SET DATA TYPE INTEGER;
