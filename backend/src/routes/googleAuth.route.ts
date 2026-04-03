import express from "express";
import passport from "passport";

const googleRouter = express.Router();

googleRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    session: false,
  }),
  (req, res) => {
    const { sessionToken } = req.user as any;

    res.cookie("session_token", sessionToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    res.redirect("http://localhost:3000/dashboard");
  },
);

export default googleRouter;
