import { prisma } from "../db/prisma.js";
import AppError from "../utils/customErrorClass.js";
import asyncHandler from "./asyncHandler.middleware.js";

const requireAuth = asyncHandler(async (req: any, res: any, next: any) => {
  const sessionToken = req.cookies.session_token;

  if (!sessionToken) {
    throw new AppError("Not authenticated", 401);
  }

  // Include accountId along with user
  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: {
      user: true,
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

  // Attach both user and account to request
  req.user = session.user;
  req.sessionData = {
    userId: session.userId,
    accountId: session.accountId,
  };

  next();
});

export default requireAuth;
