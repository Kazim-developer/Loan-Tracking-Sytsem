import clsx from "clsx";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupFormPage() {
  return (
    <section
      className={clsx("w-[100%] h-[100vh] flex justify-center items-center")}
    >
      <SignupForm />
    </section>
  );
}
