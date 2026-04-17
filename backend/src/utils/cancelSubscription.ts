import { prisma } from "../db/prisma.js";

async function handleSubscriptionCanceled(event: any) {
  const data = event.data;

  const freePlan = await prisma.plan.findUniqueOrThrow({
    where: {
      name: "Free",
    },
  });

  await prisma.subscription.update({
    where: {
      providerSubscriptionId: data.id,
    },
    data: {
      status: "CANCELED",
      autoRenew: false,
      endDate: data.endedAt ? new Date(data.endedAt) : undefined,
      cancelAt: null,
      planId: freePlan.id,
    },
  });
}

export default handleSubscriptionCanceled;
