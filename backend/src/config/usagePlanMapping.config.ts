import { Prisma } from "../../generated/prisma/client.js";

export type UsageResource =
  | "clients"
  | "totalLoans"
  | "activeLoans"
  | "emailReminders";

export const usageConfig: Record<
  UsageResource,
  {
    usedField: keyof Prisma.UsageModel;
    limitField: keyof Prisma.PlanModel;
  }
> = {
  clients: {
    usedField: "usedClients",
    limitField: "maxClients",
  },
  totalLoans: {
    usedField: "usedTotalLoans",
    limitField: "maxTotalLoans",
  },
  activeLoans: {
    usedField: "usedActiveLoans",
    limitField: "maxActiveLoans",
  },
  emailReminders: {
    usedField: "usedEmailReminders",
    limitField: "maxEmailReminders",
  },
};
