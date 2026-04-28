import { ClientData } from "@/validators/clientData.validator";
import { ForgotPassword } from "@/validators/forgotPassword.validator";
import { FormData } from "@/validators/formData.validator";
import { LoanCreationPayload } from "@/validators/loanCreationPayload.validator";
import { ResetPassword } from "@/validators/resetPassword.validator";

export const postFormData = async (
  route: string,
  formData:
    | FormData
    | ForgotPassword
    | ResetPassword
    | ClientData
    | LoanCreationPayload,
) => {
  const res = await fetch(`http://localhost:5000/${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
