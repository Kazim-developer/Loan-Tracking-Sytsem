import { prisma } from "../db/prisma.js";
import AppError from "../utils/customErrorClass.js";

const checkPlanLimits = (resource: "clients" | "accounts" | "team") => {
  return async (req: any, res: any, next: any) => {
    const { accountId } = req.sessionData;

    if (!accountId) {
      return next(new AppError("Account not found in session", 401));
    }

    const subscription = await prisma.subscription.findUnique({
      where: { accountId },
      include: { plan: true },
    });

    if (!subscription || !subscription.plan) {
      return next(new AppError("Subscription not found", 403));
    }

    if (subscription.status !== "ACTIVE") {
      return next(new AppError("Subscription inactive", 403));
    }

    const limits = subscription.plan.limits;

    // ---- CLIENT LIMIT ----
    if (resource === "clients") {
      const clientsCount = await prisma.client.count({
        where: { accountId },
      });

      if (limits.maxClients !== null && clientsCount >= limits.maxClients) {
        return next(
          new AppError("Client limit reached. Upgrade your plan.", 403),
        );
      }
    }

    // ---- ACCOUNT LIMIT ----
    if (resource === "accounts") {
      const accountsCount = await prisma.clientAccount.count({
        where: { accountId },
      });

      if (limits.maxAccounts !== null && accountsCount >= limits.maxAccounts) {
        return next(
          new AppError("Account limit reached. Upgrade your plan.", 403),
        );
      }
    }

    // ---- TEAM LIMIT ----
    if (resource === "team") {
      const teamCount = await prisma.accountMember.count({
        where: { accountId },
      });

      if (
        limits.maxTeamMembers !== null &&
        teamCount >= limits.maxTeamMembers
      ) {
        return next(
          new AppError("Team member limit reached. Upgrade your plan.", 403),
        );
      }
    }

    next();
  };
};
export default checkPlanLimits;
