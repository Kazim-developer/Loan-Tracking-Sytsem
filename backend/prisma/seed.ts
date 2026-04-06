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
    name: "Free",
    priceDay: 0,
    priceMonth: 0,

    maxClients: 5,
    maxAccounts: 10,

    features: {
      email_reminder: false,
      whatsapp_reminder: false,
      excel_report: false,
      invoice_pdf: false,
      team_access: false,
      unlimited_team_members: false,
      automatic_reminder: false,
      api_access: false,
    },

    description:
      "Perfect for individuals getting started with tracking client payments.",
  },

  {
    name: "Pro",
    priceDay: Math.round(0.49 * 100),
    priceMonth: Math.round(14.85 * 100),

    maxClients: 50,
    maxAccounts: 100,

    features: {
      email_reminder: true,
      whatsapp_reminder: false,
      excel_report: true,
      invoice_pdf: true,
      team_access: false,
      unlimited_team_members: false,
      automatic_reminder: false,
      api_access: false,
    },

    description:
      "For freelancers and small businesses managing client payments and invoices.",
  },

  {
    name: "Business",
    priceDay: Math.round(1.65 * 100),
    priceMonth: Math.round(49.65 * 100),

    maxClients: null,
    maxAccounts: null,

    features: {
      email_reminder: true,
      whatsapp_reminder: true,
      excel_report: true,
      invoice_pdf: true,
      team_access: true,
      unlimited_team_members: false,
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
        maxClients: plan.maxClients,
        maxAccounts: plan.maxAccounts,
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
