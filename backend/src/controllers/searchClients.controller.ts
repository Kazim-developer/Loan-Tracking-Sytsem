import { Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

export const searchClients = asyncHandler(
  async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const accountId = req.sessionData?.accountId;

    let clients;

    if (!search || search.trim().length === 0) {
      // 🔥 No search → return recent / default list
      clients = await prisma.client.findMany({
        where: { accountId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        orderBy: {
          createdAt: "desc", // 👈 recent clients first
        },
        take: 10, // 🔥 NEVER return all
      });
    } else {
      // 🔍 Search case
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

    res.json(clients);
  },
);

export default searchClients;
