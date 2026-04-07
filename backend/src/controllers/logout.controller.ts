import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const logout = asyncHandler(async (req: any, res: any) => {
  const sessionToken = req.cookies.session_token;

  if (sessionToken) {
    await prisma.session.delete({ where: { sessionToken } });
  }

  res.clearCookie("session_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({ msg: "logout successfully" });
});

export default logout;
