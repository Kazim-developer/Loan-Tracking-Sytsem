import clsx from "clsx";
import CreateLoanForm from "./CreateLoanForm";

export default function LoanModelContainer() {
  return (
    <section className={clsx("model-container")}>
      <CreateLoanForm />
    </section>
  );
}
