"use client";

import clsx from "clsx";
import useShowElementStore from "@/stores/showElement.store";
import CancelSubscriptionModel from "./CancelSubscriptionModel";

import { useEffect } from "react";

export default function CancelSubscriptionModelContainer() {
  const setShowCancelSubscriptionModel = useShowElementStore(
    (s) => s.setShowCancelSubscription,
  );
  const showCancelSubscriptionModel = useShowElementStore(
    (s) => s.showCancelSubscription,
  );

  useEffect(() => {
    if (!showCancelSubscriptionModel) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showCancelSubscriptionModel]);

  return (
    <section
      className={clsx("model-container")}
      onClick={() => setShowCancelSubscriptionModel(false)}
    >
      <CancelSubscriptionModel />
    </section>
  );
}
