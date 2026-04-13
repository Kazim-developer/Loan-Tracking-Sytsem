import { prisma } from "../db/prisma.js";
import mapPaddleStatus from "./mapPaddleStatus.js";

async function handleSubscriptionUpdated(event: any) {
  const data = event.data;

  const subscription = await prisma.subscription.findUniqueOrThrow({
    where: {
      providerSubscriptionId: data.id,
    },
  });

  const usage = await prisma.usage.findUniqueOrThrow({
    where: {
      accountId: subscription.accountId,
    },
  });

  const newBillingStart = new Date(data.currentBillingPeriod.startsAt);
  const newBillingEnd = new Date(data.currentBillingPeriod.endsAt);

  const billingCycleAdvanced =
    usage.billingPeriodStart.getTime() !== newBillingStart.getTime();

  await prisma.$transaction([
    prisma.subscription.update({
      where: {
        providerSubscriptionId: data.id,
      },
      data: {
        status: mapPaddleStatus(data.status),
        autoRenew: !data.scheduledChange,

        endDate: newBillingEnd,

        cancelAt: data.scheduledChange?.effectiveAt
          ? new Date(data.scheduledChange.effectiveAt)
          : null,
      },
    }),

    prisma.usage.update({
      where: {
        accountId: subscription.accountId,
      },
      data: {
        billingPeriodStart: newBillingStart,
        billingPeriodEnd: newBillingEnd,

        ...(billingCycleAdvanced && {
          remindersUsed: 0,
        }),
      },
    }),
  ]);
}

export default handleSubscriptionUpdated;
