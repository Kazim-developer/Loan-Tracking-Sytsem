import AppError from "./customErrorClass.js";

async function createFreeSubscriptionTransaction(tx: any, accountId: string) {
  const freePlan = await tx.plan.findUnique({
    where: { name: "Free" },
  });

  if (!freePlan) {
    throw new AppError("Free plan not found", 404);
  }

  await tx.subscription.create({
    data: {
      accountId,
      planId: freePlan.id,
      status: "ACTIVE",
      billingCycle: "MONTHLY",
      startDate: new Date(),
    },
  });
}

export default createFreeSubscriptionTransaction;
