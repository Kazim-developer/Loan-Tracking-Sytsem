import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import clsx from "clsx";

export default function ForgetPasswordPage() {
  return (
    <section
      className={clsx(
        "forget-password h-[100vh] w-[100%] flex justify-center items-center",
      )}
    >
      <ForgotPasswordForm />
    </section>
  );
}
