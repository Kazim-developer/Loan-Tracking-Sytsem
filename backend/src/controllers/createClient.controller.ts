import { Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";

export const createClient = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = req.sessionData?.accountId;
    const { name, email, phone } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      // ======================================================
      // 1. Load usage + plan
      // ======================================================
      const user = await tx.account.findUnique({
        where: { id: accountId },
        include: {
          usage: true,
          subscription: {
            include: {
              plan: true,
            },
          },
        },
      });

      if (!user?.subscription?.plan || !user?.usage) {
        throw new AppError("Subscription not found", 403);
      }

      const { subscription, usage } = user;

      // ======================================================
      // 2. LIMIT CHECK (INSIDE TRANSACTION ✅)
      // ======================================================
      if (
        subscription.plan.maxClients !== null &&
        usage.usedClients >= subscription.plan.maxClients
      ) {
        throw new AppError("Client limit reached", 403);
      }

      // ======================================================
      // 3. DUPLICATE CHECK
      // ======================================================
      const existingUser = await tx.client.findFirst({
        where: {
          accountId,
          OR: [
            email ? { email } : undefined,
            phone ? { phone } : undefined,
          ].filter(Boolean),
        },
      });

      if (existingUser) {
        throw new AppError("Client with email or phone already exists", 409);
      }

      // ======================================================
      // 4. CREATE CLIENT
      // ======================================================
      const client = await tx.client.create({
        data: {
          accountId,
          name,
          email,
          phone,
        },
      });

      // ======================================================
      // 5. INCREMENT USAGE (SAFE)
      // ======================================================
      await tx.usage.update({
        where: { accountId },
        data: {
          usedClients: {
            increment: 1,
          },
        },
      });

      return client;
    });

    res.status(201).json({
      message: "Client created successfully",
      client: result,
    });
  },
);
