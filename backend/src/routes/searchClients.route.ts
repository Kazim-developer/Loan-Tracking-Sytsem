import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import searchClients from "../controllers/searchClients.controller.js";

const searchClientsRouter = express.Router();

searchClientsRouter.get("/clients", requireAuth, searchClients);

export default searchClientsRouter;
