import { prisma } from "../db/prisma.js";

async function handleSubscriptionCanceled(event: any) {
  const data = event.data;

  await prisma.subscription.update({
    where: {
      providerSubscriptionId: data.id,
    },
    data: {
      status: "CANCELED",
      autoRenew: false,
      endDate: data.endedAt ? new Date(data.endedAt) : undefined,
    },
  });
}

export default handleSubscriptionCanceled;
