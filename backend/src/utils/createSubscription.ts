import { prisma } from "../db/prisma.js";
import { getPlanFromPriceId } from "./getPlanFromPriceId.js";
import mapPaddleStatus from "./mapPaddleStatus.js";

async function handleSubscriptionCreated(event: any) {
  const data = event.data;

  const accountId = data.customData?.accountId;

  if (!accountId) {
    throw new Error("Missing accountId in Paddle customData");
  }

  const plan = await getPlanFromPriceId(data.items[0].price.id);

  await prisma.subscription.upsert({
    where: {
      accountId,
    },
    update: {
      planId: plan.id,
      status: mapPaddleStatus(data.status),
      billingCycle: "MONTHLY",

      startDate: new Date(data.startedAt),
      endDate: new Date(data.currentBillingPeriod.endsAt),

      providerSubscriptionId: data.id,
      providerCustomerId: data.customerId,
    },
    create: {
      accountId,
      planId: plan.id,

      status: mapPaddleStatus(data.status),
      billingCycle: "MONTHLY",

      startDate: new Date(data.startedAt),
      endDate: new Date(data.currentBillingPeriod.endsAt),

      providerSubscriptionId: data.id,
      providerCustomerId: data.customerId,
    },
  });

  await prisma.usage.upsert({
    where: { accountId },

    update: {
      billingPeriodStart: new Date(data.currentBillingPeriod.startsAt),
      billingPeriodEnd: new Date(data.currentBillingPeriod.endsAt),
    },

    create: {
      accountId,
      billingPeriodStart: new Date(data.currentBillingPeriod.startsAt),
      billingPeriodEnd: new Date(data.currentBillingPeriod.endsAt),
    },
  });
}

export default handleSubscriptionCreated;
