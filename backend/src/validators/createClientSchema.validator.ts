import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const phoneSchema = z
  .string()
  .refine(
    (value) => {
      const phone = parsePhoneNumberFromString(value);
      return phone ? phone.isValid() : false;
    },
    {
      message: "Invalid phone number",
    },
  )
  .transform((value) => {
    const phone = parsePhoneNumberFromString(value);
    return phone ? phone.number : value;
  });

const createClientSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Client name is required" })
    .max(30, { error: "Client name cannot exceed 30 characters" }),

  phone: phoneSchema,

  email: z.email({ error: "Please enter a valid email address" }),
});

export default createClientSchema;
