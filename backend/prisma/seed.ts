import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const plans = [
  {
    name: "Starter",
    priceMonth: 0,

    maxAccounts: 10,
    maxTeamMembers: 0,

    maxEmailReminders: 0,
    maxWhatsappReminders: 0,

    features: {
      excel_report: false,
      invoice_pdf: false,
      automatic_reminder: false,
      api_access: false,
    },

    description:
      "Perfect for individuals getting started with tracking client payments.",
  },

  {
    name: "Pro",
    priceMonth: 14.99,

    maxAccounts: 100,
    maxTeamMembers: 0,

    maxEmailReminders: 100,
    maxWhatsappReminders: 0,

    features: {
      excel_report: true,
      invoice_pdf: true,
      automatic_reminder: false,
      api_access: false,
    },

    description:
      "For freelancers and small businesses managing client payments and invoices.",
  },

  {
    name: "Business",
    priceMonth: 59.99,

    maxAccounts: 500,
    maxTeamMembers: 5,

    maxEmailReminders: 500,
    maxWhatsappReminders: 0,

    features: {
      excel_report: true,
      invoice_pdf: true,
      automatic_reminder: true,
      api_access: false,
    },

    description:
      "For growing businesses that need automation and better control over receivables.",
  },
];

async function main() {
  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: {}, // do nothing if exists
      create: {
        name: plan.name,
        maxAccounts: plan.maxAccounts,
        maxTeamMembers: plan.maxTeamMembers,
        maxEmailReminders: plan.maxEmailReminders,
        maxWhatsappReminders: plan.maxWhatsappReminders,
        description: plan.description,
        priceMonth: plan.priceMonth,
        priceYear: plan.priceMonth * 12,
        features: plan.features,
        isActive: true,
      },
    });
  }

  console.log("✅ Plans seeded successfully!");
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
