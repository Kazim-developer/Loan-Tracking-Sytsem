/*
  Warnings:

  - You are about to drop the column `type` on the `WebhookEvent` table. All the data in the column will be lost.
  - Added the required column `eventType` to the `WebhookEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebhookEvent" DROP COLUMN "type",
ADD COLUMN     "eventType" TEXT NOT NULL;
