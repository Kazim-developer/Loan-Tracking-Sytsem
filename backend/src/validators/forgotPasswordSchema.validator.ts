import { z } from "zod";
import loginSchema from "./loginSchema.validator.js";

export const forgotPasswordSchema = loginSchema.pick({
  email: true,
});
