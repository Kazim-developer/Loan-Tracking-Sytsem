import { prisma } from "../db/prisma.js";

export const getPlanFromPriceId = async (priceId: string) => {
  return prisma.plan.findFirstOrThrow({
    where: {
      monthlyPriceId: priceId,
    },
  });
};
