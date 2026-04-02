import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const getCurrentUser = asyncHandler(async (req: any, res: any) => {
  const user = req.user;

  res.status(200).json({
    status: "success",
    user: {
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
    },
  });
});

export default getCurrentUser;
