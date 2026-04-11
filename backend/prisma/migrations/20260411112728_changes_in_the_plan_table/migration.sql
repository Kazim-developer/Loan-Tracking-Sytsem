/*
  Warnings:

  - You are about to drop the column `MaxTeamMembers` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "MaxTeamMembers",
ADD COLUMN     "maxEmailReminders" INTEGER,
ADD COLUMN     "maxTeamMembers" INTEGER,
ADD COLUMN     "maxWhatsappReminders" INTEGER;
