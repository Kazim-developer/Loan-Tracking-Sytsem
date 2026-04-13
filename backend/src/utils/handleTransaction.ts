import { prisma } from "../db/prisma.js";

async function handleTransactionPaid(event: any) {
  const data = event.data;

  const isAddon = data.customData?.isAddon;
  const addonType = data.customData?.addonType;
  const quantity = data.customData?.quantity;
  const accountId = data.customData?.accountId;

  if (!isAddon) return;

  if (!addonType || !quantity || !accountId) {
    throw new Error("Invalid addon transaction metadata");
  }

  await prisma.subscriptionAddOn.create({
    data: {
      accountId: data.customData.accountId,
      type: addonType,
      quantity,
      paddleTransactionId: data.id,
    },
  });
}

export default handleTransactionPaid;
