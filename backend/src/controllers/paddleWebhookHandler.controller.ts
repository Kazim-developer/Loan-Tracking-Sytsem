import { Request, Response } from "express";
import { paddle } from "../lib/paddle.js";

export async function paddleWebhookHandler(req: Request, res: Response) {
  try {
    const signature = req.headers["paddle-signature"] as string;

    const event = await paddle.webhooks.unmarshal(
      req.body,
      process.env.WEBHOOK_SECRET!,
      signature,
    );

    console.log("Verified Event:", event.eventType);

    switch (event.eventType) {
      case "subscription.created":
        console.log("Subscription created");
        break;

      case "subscription.updated":
        console.log("Subscription updated");
        break;

      case "subscription.canceled":
        console.log("Subscription canceled");
        break;

      case "transaction.paid":
        console.log("Payment received");
        break;
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Paddle webhook verification failed:", error);
    res.status(400).send("Invalid webhook");
  }
}
