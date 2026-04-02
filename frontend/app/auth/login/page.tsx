import LoginForm from "@/components/auth/LoginForm";
import clsx from "clsx";

export default function LoginFormPage() {
  return (
    <section
      className={clsx("w-[100%] h-[100vh] flex justify-center items-center")}
    >
      <LoginForm />
    </section>
  );
}
