"use client";

import clsx from "clsx";
import CreateClientForm from "./CreateClientForm";
import useShowElementStore from "@/stores/showElement.store";
import { useEffect } from "react";

export default function ClientModelContainer() {
  const setShowCreateClientModel = useShowElementStore(
    (s) => s.setShowCreateClientModel,
  );
  const showCreateClientModel = useShowElementStore(
    (s) => s.showCreateClientModel,
  );

  useEffect(() => {
    if (!showCreateClientModel) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showCreateClientModel]);
  return (
    <section
      className={clsx("model-container")}
      onClick={() => setShowCreateClientModel(false)}
    >
      <CreateClientForm />
    </section>
  );
}
