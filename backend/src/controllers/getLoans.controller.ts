import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";

const getLoans = asyncHandler(async (req: Request, res: Response) => {
  const accountId = req.sessionData?.accountId;

  if (!accountId) {
    throw new AppError("user not authenticated", 403);
  }

  // -----------------------------
  // Pagination
  // -----------------------------
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  // -----------------------------
  // Filters
  // -----------------------------
  const search = (req.query.search as string) || "";
  const status = (req.query.status as string) || "ALL";
  const repayment = (req.query.repayment as string) || "ALL";

  // -----------------------------
  // Prisma WHERE builder
  // -----------------------------
  const where: any = {
    accountId,
  };

  // 🔍 Search by borrower name
  if (search.trim()) {
    where.client = {
      name: {
        contains: search,
        mode: "insensitive",
      },
    };
  }

  // 📌 Status filter
  if (status !== "ALL") {
    where.status = status;
  }

  // 📌 Repayment filter
  if (repayment !== "ALL") {
    where.hasInstallments = repayment === "INSTALLMENTS";
  }

  // -----------------------------
  // Query DB
  // -----------------------------
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
        startingDate: true,
        endDate: true,
        repaymentStatus: true,

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
      },
    }),

    prisma.loan.count({ where }),
  ]);

  // -----------------------------
  // Response
  // -----------------------------
  res.status(200).json({
    message: "loans fetched successfully",
    data: loans,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

export default getLoans;
