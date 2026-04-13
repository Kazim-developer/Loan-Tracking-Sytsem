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
    priceMonth: 0,

    maxAccounts: 10,
    maxTeamMembers: 0,

    maxEmailReminders: 0,
    maxWhatsappReminders: 0,

    monthlyPriceId: null,

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
    priceMonth: 1499,

    maxAccounts: 50,
    maxTeamMembers: 0,

    maxEmailReminders: 100,
    maxWhatsappReminders: 0,

    monthlyPriceId: "pri_01knpe2npgqjm1yk79mc0dz772",

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
    priceMonth: 5999,

    maxAccounts: 300,
    maxTeamMembers: 5,

    maxEmailReminders: 600,
    maxWhatsappReminders: 0,

    monthlyPriceId: "pri_01knpe67753cvzbxt3kxnbkrf6",

    features: {
      excel_report: true,
      invoice_pdf: true,
      automatic_reminder: false,
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
      update: {
        name: plan.name,
        maxAccounts: plan.maxAccounts,
        maxTeamMembers: plan.maxTeamMembers,
        maxEmailReminders: plan.maxEmailReminders,
        maxWhatsappReminders: plan.maxWhatsappReminders,
        monthlyPriceId: plan.monthlyPriceId,
        description: plan.description,
        priceMonth: plan.priceMonth,
        priceYear: plan.priceMonth * 12,
        features: plan.features,
        isActive: true,
      }, // do nothing if exists
      create: {
        name: plan.name,
        maxAccounts: plan.maxAccounts,
        maxTeamMembers: plan.maxTeamMembers,
        maxEmailReminders: plan.maxEmailReminders,
        maxWhatsappReminders: plan.maxWhatsappReminders,
        monthlyPriceId: plan.monthlyPriceId,
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
