import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";
import { calculateLoanState } from "../utils/calculateLoanState.js";
import { redis } from "../config/redis.js";

const getLoans = asyncHandler(async (req: Request, res: Response) => {
  const accountId = req.sessionData?.accountId;

  if (!accountId) {
    throw new AppError("user not authenticated", 403);
  }

  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  const search = (req.query.search as string) || "";
  const status = (req.query.status as string) || "ALL";
  const repayment = (req.query.repayment as string) || "ALL";

  const where: any = {
    accountId,
  };

  if (search.trim()) {
    where.client = {
      name: {
        contains: search,
        mode: "insensitive",
      },
    };
  }

  if (status !== "ALL") {
    where.status = status;
  }

  if (repayment !== "ALL") {
    where.hasInstallments = repayment === "INSTALLMENTS";
  }

  const cacheKey = `loans:${JSON.stringify({
    accountId,
    page,
    limit,
    search,
    status,
    repayment,
  })}`;

  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  const [loans, total] = await Promise.all([
    prisma.loan.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        totalAmount: true,
        totalPayable: true,
        hasInstallments: true,
        status: true,
        repaymentStatus: true,
        startingDate: true,
        endDate: true,

        client: {
          select: {
            id: true,
            name: true,
          },
        },

        installments: {
          select: {
            dueDate: true,
            status: true,
          },
        },

        loanPayments: {
          select: {
            amount: true,
          },
        },
      },
    }),

    prisma.loan.count({ where }),
  ]);

  const computedLoans = loans.map((loan) => ({
    ...loan,
    ...calculateLoanState(loan),
  }));

  const response = {
    message: "loans fetched successfully",
    data: computedLoans,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };

  await redis.set(cacheKey, JSON.stringify(response));
  await redis.expire(cacheKey, 300);

  res.status(200).json(response);
});

export default getLoans;
