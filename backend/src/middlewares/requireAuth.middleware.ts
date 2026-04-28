import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import AppError from "../utils/customErrorClass.js";
import asyncHandler from "./asyncHandler.middleware.js";

const requireAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const sessionToken = req.cookies.session_token;

    if (!sessionToken) {
      throw new AppError("Not authenticated", 401);
    }

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: {
        account: true,
      },
    });

    if (!session) {
      throw new AppError("Session not found", 401);
    }

    if (session.expiresAt < new Date()) {
      await prisma.session.delete({ where: { sessionToken } });
      throw new AppError("Session expired", 401);
    }

    req.sessionData = {
      accountId: session.accountId,
    };

    next();
  },
);

export default requireAuth;
