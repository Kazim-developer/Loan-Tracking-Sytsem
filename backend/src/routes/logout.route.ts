import express from "express";
import logout from "../controllers/logout.controller.js";

const logoutRouter = express.Router();

logoutRouter.post("/logout", logout);

export default logoutRouter;
