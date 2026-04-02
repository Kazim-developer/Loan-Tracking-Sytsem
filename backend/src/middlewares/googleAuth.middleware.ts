import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../db/prisma.js";

import crypto from "crypto";

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

        let account = await prisma.account.findFirst({
          where: {
            provider: "google",
            providerAccountId: googleId,
          },
          include: { user: true },
        });

        let user;

        if (account) {
          user = account.user;
        } else {
          // Check if user already exists with same email
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (existingUser) {
            // Link Google account to existing user
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: "google",
                providerAccountId: googleId,
                accessToken,
                refreshToken,
              },
            });

            user = existingUser;
          } else {
            // Create new user
            user = await prisma.user.create({
              data: {
                email,
                name,
                imageUrl: image,
                accounts: {
                  create: {
                    provider: "google",
                    providerAccountId: googleId,
                    accessToken,
                    refreshToken,
                  },
                },
              },
            });
          }
        }

        // ✅ Delete expired sessions
        await prisma.session.deleteMany({
          where: {
            expiresAt: {
              lt: new Date(),
            },
          },
        });

        // ✅ Limit sessions per user (max 5)
        const sessions = await prisma.session.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: "asc" },
        });

        if (sessions.length >= 5) {
          await prisma.session.delete({
            where: { id: sessions[0].id },
          });
        }

        // ✅ Create new session
        const sessionToken = crypto.randomBytes(32).toString("hex");

        const session = await prisma.session.create({
          data: {
            userId: user.id,
            sessionToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          },
        });

        return done(null, { user, sessionToken });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
