import { Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { redis } from "../config/redis.js";

export const searchClients = asyncHandler(
  async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const accountId = req.sessionData?.accountId;

    let clients;

    if (!search || search.trim().length === 0) {
      clients = await prisma.client.findMany({
        where: { accountId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      });
    } else {
      clients = await prisma.client.findMany({
        where: {
          accountId,
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: search,
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        take: 10,
        orderBy: {
          name: "asc",
        },
      });
    }

    const cacheKey = `clients:${accountId}:client:${search}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    await redis.set(cacheKey, JSON.stringify(clients));
    await redis.expire(cacheKey, 300);

    res.status(200).json(clients);
  },
);

export default searchClients;
