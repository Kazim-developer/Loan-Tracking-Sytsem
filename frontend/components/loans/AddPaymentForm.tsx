"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import { normalizeDecimalInput } from "@/utils/normalizeDecimalInput";
import useShowElementStore from "@/stores/showElement.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFormData } from "@/handlers/postFormData";
import { toast } from "react-toastify";
import { hasErrors } from "@/utils/hasErrors.util";

export type LoanPaymentPayload = {
  id: string;
  payment: number;
};

type Mode = "FULL" | "PARTIAL";

export default function AddPaymentForm({ data }: { data: any }) {
  const totalPayable = data.loan.totalPayable;

  const totalPaid =
    data.loan.loanPayments?.reduce(
      (acc: number, p: { amount: number }) => acc + p.amount,
      0,
    ) ?? 0;

  const remaining = Math.max(totalPayable - totalPaid, 0);

  // 🔑 source of truth
  const [mode, setMode] = useState<Mode>("FULL");

  // only used for PARTIAL input
  const [partialValue, setPartialValue] = useState<number>(0);

  const showAddPaymentModel = useShowElementStore((s) => s.showAddPaymentModel);
  const setShowAddPaymentModel = useShowElementStore(
    (s) => s.setShowAddPaymentModel,
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (payload: LoanPaymentPayload) =>
      postFormData("loanPayment", payload),

    onSuccess: () => {
      toast.success("payment is added successfully");

      queryClient.invalidateQueries({ queryKey: ["loans"] });
      queryClient.invalidateQueries({ queryKey: ["loan"] });

      setMode("FULL");
      setPartialValue(0);

      setShowAddPaymentModel(false);
    },

    onError: (error) => {
      if (hasErrors(error)) {
        Object.values(error.errors).forEach((msg) => {
          toast.error(String(msg));
        });
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    if (!showAddPaymentModel) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showAddPaymentModel]);

  const payment = mode === "FULL" ? remaining : partialValue;

  return (
    <section
      className={clsx(
        "model-container flex items-center justify-center bg-black/40 backdrop-blur-sm",
      )}
      onClick={() => setShowAddPaymentModel(false)}
    >
      <section
        className="bg-white w-[80%] max-w-[500px] rounded-2xl shadow-xl px-5 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();

            if (payment <= 0) {
              toast.error("Invalid payment amount");
              return;
            }

            mutate({
              id: data.loan.id,
              payment,
            });
          }}
        >
          {/* Remaining */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-600">
              Remaining amount
            </span>
            <input
              type="text"
              readOnly
              value={remaining}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-none"
            />
          </label>

          {/* Mode toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="checkbox"
              checked={mode === "PARTIAL"}
              onChange={(e) => {
                const isPartial = e.target.checked;
                setMode(isPartial ? "PARTIAL" : "FULL");

                if (!isPartial) {
                  setPartialValue(0);
                }
              }}
              className="w-4 h-4 accent-black"
            />
            <label htmlFor="checkbox" className="text-sm text-gray-700">
              Add partial payment
            </label>
          </div>

          {/* FULL */}
          {mode === "FULL" && (
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-600">Paying</span>
              <input
                type="text"
                value={remaining}
                readOnly
                className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 outline-none"
              />
            </label>
          )}

          {/* PARTIAL */}
          {mode === "PARTIAL" && (
            <input
              type="text"
              inputMode="decimal"
              placeholder="Enter partial amount"
              value={partialValue || ""}
              onChange={(e) => {
                const normalized = normalizeDecimalInput(e.target.value);
                if (normalized === null) return;

                const value = Number(normalized);

                if (value <= 0) {
                  setPartialValue(0);
                  return;
                }

                if (value > remaining) return;

                setPartialValue(value);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
            />
          )}

          {/* Button */}
          <button
            type="submit"
            className="mt-2 bg-black text-white py-2.5 rounded-lg font-medium hover:opacity-90 active:scale-[0.96] transition"
          >
            Pay
          </button>
        </form>
      </section>
    </section>
  );
}
