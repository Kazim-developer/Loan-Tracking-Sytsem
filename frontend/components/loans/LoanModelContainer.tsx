"use client";

import clsx from "clsx";
import CreateLoanForm from "./CreateLoanForm";
import useShowElementStore from "@/stores/showElement.store";
import { useEffect } from "react";

export default function LoanModelContainer() {
  const setShowCreateLoanModel = useShowElementStore(
    (s) => s.setShowCreateLoanModel,
  );
  const showCreateLoanModel = useShowElementStore((s) => s.showCreateLoanModel);

  useEffect(() => {
    if (!showCreateLoanModel) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showCreateLoanModel]);
  return (
    <section
      className={clsx("model-container")}
      onClick={() => setShowCreateLoanModel(false)}
    >
      <CreateLoanForm />
    </section>
  );
}
