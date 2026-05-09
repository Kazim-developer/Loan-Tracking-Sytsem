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
    maxClients: 50,
    maxActiveLoans: 25,
    maxTotalLoans: 100,
    maxTeamMembers: 0,
    maxEmailReminders: 20,
    maxWhatsappReminders: 0,
    monthlyPriceId: null,
    description: "Start managing your loans with zero cost",

    features: [
      { key: "email_reminder", enabled: true },
      { key: "excel_report", enabled: false },
      { key: "automatic_reminder", enabled: false },
      { key: "team_access", enabled: false },
    ],
  },

  {
    name: "Pro",
    priceMonth: 1499,
    maxClients: 9,
    maxActiveLoans: 7,
    maxTotalLoans: 9,
    maxTeamMembers: 0,
    maxEmailReminders: 300,
    maxWhatsappReminders: 0,
    monthlyPriceId: "pri_01knpe2npgqjm1yk79mc0dz772",
    description: "Everything you need to run a growing lending business",

    features: [
      { key: "email_reminder", enabled: true },
      { key: "excel_report", enabled: true },
      { key: "automatic_reminder", enabled: false },
      { key: "team_access", enabled: false },
    ],
  },

  {
    name: "Business",
    priceMonth: 5999,
    maxClients: null,
    maxActiveLoans: 8,
    maxTotalLoans: 10,
    maxTeamMembers: 0,
    maxEmailReminders: 2000,
    maxWhatsappReminders: 0,
    monthlyPriceId: "pri_01knpe67753cvzbxt3kxnbkrf6",
    description: "High-capacity tools for large and scaling lending operations",

    features: [
      { key: "email_reminder", enabled: true },
      { key: "excel_report", enabled: true },
      { key: "automatic_reminder", enabled: false },
      { key: "team_access", enabled: false },
    ],
  },
];

async function main() {
  for (const plan of plans) {
    const createdPlan = await prisma.plan.upsert({
      where: { name: plan.name },
      update: {
        name: plan.name,
        maxClients: plan.maxClients,
        maxActiveLoans: plan.maxActiveLoans,
        maxTotalLoans: plan.maxTotalLoans,
        maxTeamMembers: plan.maxTeamMembers,
        maxEmailReminders: plan.maxEmailReminders,
        maxWhatsappReminders: plan.maxWhatsappReminders,
        monthlyPriceId: plan.monthlyPriceId,
        description: plan.description,
        priceMonth: plan.priceMonth,
        priceYear: plan.priceMonth * 12,
        isActive: true,
      },
      create: {
        name: plan.name,
        maxClients: plan.maxClients,
        maxActiveLoans: plan.maxActiveLoans,
        maxTotalLoans: plan.maxTotalLoans,
        maxTeamMembers: plan.maxTeamMembers,
        maxEmailReminders: plan.maxEmailReminders,
        maxWhatsappReminders: plan.maxWhatsappReminders,
        monthlyPriceId: plan.monthlyPriceId,
        description: plan.description,
        priceMonth: plan.priceMonth,
        priceYear: plan.priceMonth * 12,
        isActive: true,
      },
    });

    // 🔥 STEP 2: seed features (IMPORTANT PART)
    for (const feature of plan.features) {
      await prisma.planFeature.upsert({
        where: {
          planId_key: {
            planId: createdPlan.id,
            key: feature.key,
          },
        },
        update: {
          enabled: feature.enabled,
        },
        create: {
          planId: createdPlan.id,
          key: feature.key,
          enabled: feature.enabled,
        },
      });
    }
  }

  console.log("✅ Plans + Features seeded successfully!");
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
