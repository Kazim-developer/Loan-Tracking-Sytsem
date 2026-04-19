"use client";
import useShowElementStore from "@/stores/showElement.store";

import LoanHandling from "@/components/loans/LoanHandling";
import clsx from "clsx";
import LoanModelContainer from "@/components/loans/LoanModelContainer";

export default function LoanPage() {
  const showCreateLoanModel = useShowElementStore((s) => s.showCreateLoanModel);
  return (
    <section className={clsx("center-section py-[3rem]")}>
      <LoanHandling />
      {showCreateLoanModel && <LoanModelContainer />}
    </section>
  );
}
