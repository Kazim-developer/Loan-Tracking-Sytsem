import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";

const getLoans = asyncHandler(async (req: Request, res: Response) => {
  const accountId = req.sessionData?.accountId;

  if (!accountId) {
    throw new AppError("user not authenticated", 403);
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  // Safety limits (important)
  const safeLimit = Math.min(limit, 50); // max 50 per request

  const skip = (page - 1) * safeLimit;

  const [loans, total] = await Promise.all([
    prisma.loan.findMany({
      where: { accountId },
      skip,
      take: safeLimit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        totalAmount: true,
        totalPayable: true,
        interestRate: true,
        interestType: true,
        hasInstallments: true,
        status: true,

        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),

    prisma.loan.count({
      where: { accountId },
    }),
  ]);

  // ✅ 3. Calculate total pages
  const totalPages = Math.ceil(total / safeLimit);

  // ✅ 4. Response
  res.status(200).json({
    message: "request successful",

    data: loans,

    pagination: {
      total,
      page,
      limit: safeLimit,
      totalPages,
    },
  });
});

export default getLoans;
