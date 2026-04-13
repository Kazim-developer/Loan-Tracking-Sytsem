import { Request, Response } from "express";
import { paddle } from "../lib/paddle.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";

import handleSubscriptionCanceled from "../utils/cancelSubscription.js";
import handleSubscriptionCreated from "../utils/createSubscription.js";
import handleSubscriptionUpdated from "../utils/updateSubscription.js";
import handleTransactionPaid from "../utils/handleTransaction.js";

export const paddleWebhookHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const signature = req.headers["paddle-signature"] as string;

    const event = await paddle.webhooks.unmarshal(
      req.body,
      process.env.WEBHOOK_SECRET!,
      signature,
    );

    // 1. Idempotency check
    const existingEvent = await prisma.webhookEvent.findUnique({
      where: {
        eventId: event.eventId,
      },
    });

    if (existingEvent) {
      return res.sendStatus(200);
    }

    // 2. Process event
    switch (event.eventType) {
      case "subscription.created":
        await handleSubscriptionCreated(event);
        break;

      case "subscription.updated":
        await handleSubscriptionUpdated(event);
        break;

      case "subscription.canceled":
        await handleSubscriptionCanceled(event);
        break;

      case "transaction.paid":
        await handleTransactionPaid(event);
        break;
    }

    // 3. Mark processed
    await prisma.webhookEvent.create({
      data: {
        eventId: event.eventId,
        eventType: event.eventType,
      },
    });

    return res.sendStatus(200);
  },
);
