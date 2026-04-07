import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../db/prisma.js";
import createFreeSubscriptionTransaction from "../utils/createFreeSubscriptionTransaction.js";

import crypto from "crypto";
import AppError from "../utils/customErrorClass.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const image = profile.photos[0].value;

        let account = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: googleId,
            },
          },
          include: {
            user: true,
            subscription: {
              include: { plan: true },
            },
          },
        });

        let user;
        let currentAccount: any = null;

        // ---- CASE 1: Account exists ----
        if (account) {
          user = account.user;

          // Self-healing: create subscription if missing
          if (!account.subscription) {
            await createFreeSubscriptionTransaction(prisma, account.id);

            const updatedAccount = await prisma.account.findUnique({
              where: { id: account.id },
              include: {
                user: true,
                subscription: { include: { plan: true } },
              },
            });

            currentAccount = updatedAccount;
          } else {
            currentAccount = account;
          }
        } else {
          // ---- CASE 2: Account does NOT exist ----
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          const result = await prisma.$transaction(async (tx) => {
            let user;
            let account;

            if (existingUser) {
              if (!existingUser.imageUrl || !existingUser.name) {
                await tx.user.update({
                  where: { email },
                  data: {
                    imageUrl: existingUser.imageUrl ?? image,
                    name: existingUser.name ?? name,
                  },
                });
              }

              user = existingUser;

              account = await tx.account.create({
                data: {
                  userId: existingUser.id,
                  provider: "google",
                  providerAccountId: googleId,
                  accessToken,
                  refreshToken,
                },
              });
            } else {
              user = await tx.user.create({
                data: {
                  email,
                  name,
                  imageUrl: image,
                },
              });

              account = await tx.account.create({
                data: {
                  userId: user.id,
                  provider: "google",
                  providerAccountId: googleId,
                  accessToken,
                  refreshToken,
                },
              });
            }

            // ✅ Use your helper here
            await createFreeSubscriptionTransaction(tx, account.id);

            return { user, account };
          });

          user = result.user;

          const updatedAccount = await prisma.account.findUnique({
            where: { id: result.account.id },
            include: {
              user: true,
              subscription: { include: { plan: true } },
            },
          });

          currentAccount = updatedAccount;
        }

        // ---- Safety check (fix TS + runtime) ----
        if (!currentAccount || !currentAccount.subscription) {
          return done(new Error("Subscription not found"), null);
        }

        if (currentAccount.subscription.status !== "ACTIVE") {
          return done(new AppError("Subscription inactive", 403), null);
        }

        if (
          currentAccount.subscription?.endDate &&
          currentAccount.subscription.endDate.getTime() <= new Date().getTime()
        ) {
          return done(new AppError("Subscription expired", 403), null);
        }

        // ---- Session handling (PER ACCOUNT) ----
        await prisma.session.deleteMany({
          where: {
            expiresAt: { lt: new Date() },
          },
        });

        const sessions = await prisma.session.findMany({
          where: { accountId: currentAccount.id },
          orderBy: { createdAt: "asc" },
        });

        if (sessions.length >= 5) {
          await prisma.session.delete({
            where: { id: sessions[0].id },
          });
        }

        const sessionToken = crypto.randomBytes(32).toString("hex");

        await prisma.session.create({
          data: {
            userId: user.id,
            accountId: currentAccount.id,
            sessionToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          },
        });

        return done(null, {
          user,
          sessionToken,
          accountId: currentAccount.id,
          plan: currentAccount.subscription.plan.name,
          status: currentAccount.subscription.plan.status,
        });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
