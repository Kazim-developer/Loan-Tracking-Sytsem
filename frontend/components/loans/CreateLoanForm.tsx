"use client";

import useShowElementStore from "@/stores/showElement.store";
import { useState } from "react";
import BackArrow from "../icons/BackArrow";
import ClientAutocomplete from "../clients/ClientAutocomplete";

import handleLoanCreation from "@/handlers/handleLoanCreation";
import { computeLoan } from "@/utils/computeLoan";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handlerPayload } from "@/validators/loanCreationHandlerPayload.validator";
import { normalizeDecimalInput } from "@/utils/normalizeDecimalInput";

import {
  InstallmentFrequency,
  InterestType,
  LoanData,
  RepaymentType,
  AutomaticCalculations,
} from "@/validators/loanData.validator";

export default function CreateLoanForm() {
  const setShowCreateLoanModel = useShowElementStore(
    (s) => s.setShowCreateLoanModel,
  );

  const setShowCreateClientModel = useShowElementStore(
    (s) => s.setShowCreateClientModel,
  );

  const showCreateLoanModel = useShowElementStore((s) => s.showCreateLoanModel);

  const [loanData, setLoanData] = useState<LoanData>({
    clientId: "",
    totalAmount: "",
    startingDate: "",
    hasInstallments: false,
    interestRate: "",
    installmentFrequency: "WEEKLY",
    interestType: "SIMPLE",
    repaymentType: "one-time",
  });

  const [automaticCalculation, setAutomaticCalculation] =
    useState<AutomaticCalculations>("installments");

  const [resetKey, setResetKey] = useState<number>(0);

  const {
    totalPayable,
    totalInstallments,
    lastInstallmentDate,
    installmentAmount,
  } = computeLoan(loanData, {
    automaticCalculation,
  });

  const { mutate } = useMutation({
    mutationFn: (payload: handlerPayload) =>
      handleLoanCreation(
        payload.loanData,
        payload.totalPayable,
        payload.totalInstallments,
        payload.installmentAmount,
      ),
    onSuccess: () => {
      toast.success("loan has been created successfully");

      setLoanData({
        clientId: "",
        totalAmount: "",
        startingDate: "",
        endDate: "",
        hasInstallments: false,

        interestRate: "",
        interestType: "SIMPLE",

        repaymentType: "one-time",

        firstInstallmentDate: "",
        lastInstallmentDate: "",
        totalInstallments: undefined,
        installmentFrequency: "WEEKLY",
      });

      setResetKey((k) => k + 1);

      setAutomaticCalculation("installments");
    },
    onError: (error) => {
      if (error.errors) {
        Object.values(error.errors).forEach((msg) => {
          toast.error(String(msg));
        });
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  return (
    <>
      <section
        className="bg-white px-3 py-5 max-w-[500px] max-h-[80vh] rounded-[10px] flex flex-col gap-[0.8rem] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-start cursor-pointer w-[fit-content]"
          onClick={() =>
            showCreateLoanModel
              ? (setShowCreateClientModel(true), setShowCreateLoanModel(false))
              : null
          }
        >
          <BackArrow
            size={"5"}
            setShowCreateClientModel={setShowCreateClientModel}
            setShowCreateLoanModel={setShowCreateLoanModel}
          />
          <span className="text-[#555]">create client</span>
        </div>
        <h1 className="text-center text-2xl mb-[0.5rem] font-mb">
          Create loan
        </h1>

        <form
          className="loan-created-form"
          onSubmit={(e) => {
            e.preventDefault();

            const finalLoanData = { ...loanData, lastInstallmentDate };

            mutate({
              loanData: finalLoanData,
              totalPayable: Math.round(totalPayable * 100) / 100,
              totalInstallments: totalInstallments as number,
              installmentAmount,
            });
          }}
        >
          <div className="flex items-center gap-[1rem]">
            <ClientAutocomplete
              key={resetKey}
              className={"flex-1"}
              setLoanData={setLoanData}
            />

            <label htmlFor="loan-start-date" className="flex-1">
              <span>Loan Amount *</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="total amount"
                value={loanData.totalAmount ?? ""}
                onChange={(e) => {
                  const normalized = normalizeDecimalInput(e.target.value);

                  if (normalized === null) return;

                  setLoanData((s) => ({
                    ...s,
                    totalAmount: normalized,
                  }));
                }}
              />
            </label>
          </div>

          <div className="flex items-center gap-[1rem]">
            <label htmlFor="loan-start-date" className="flex-1">
              <span>Start date *</span>
              <input
                type="date"
                required
                value={loanData.startingDate ?? ""}
                onChange={(e) =>
                  setLoanData((s) => {
                    return {
                      ...s,
                      startingDate: e.target.value,
                    };
                  })
                }
              />
            </label>
            <label htmlFor="repyament-type" className="flex-1">
              <span>Repayment type *</span>
              <select
                required
                value={loanData.repaymentType ?? "one-time"}
                onChange={(e) => {
                  setLoanData((s) => {
                    return {
                      ...s,
                      repaymentType: e.target.value as RepaymentType,
                      hasInstallments:
                        e.target.value === "one-time" ? false : true,
                    };
                  });
                }}
              >
                <option value="one-time">one-time</option>
                <option value="installments">installments</option>
              </select>
            </label>
          </div>

          <div className="flex items-center gap-[1rem]">
            <label htmlFor="annual-interest" className="flex-1">
              <span>Annual interest %</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="e.g: 8.5, optional"
                value={loanData.interestRate ?? ""}
                onChange={(e) => {
                  const normalized = normalizeDecimalInput(e.target.value, {
                    max: 100,
                  });

                  if (normalized === null) return;

                  setLoanData((s) => ({
                    ...s,
                    interestRate: normalized,
                  }));
                }}
              />{" "}
            </label>
            <label htmlFor="interest-type" className="flex-1">
              <span>Interest type *</span>
              <select
                required
                value={loanData.interestType ?? "SIMPLE"}
                onChange={(e) => {
                  setLoanData((s) => {
                    return {
                      ...s,
                      interestType: e.target.value as InterestType,
                    };
                  });
                }}
              >
                <option value="SIMPLE">simple</option>
                <option value="COMPOUND">compound</option>
              </select>
            </label>
          </div>

          {loanData.repaymentType === "one-time" && (
            <label htmlFor="end-date" className="flex-1">
              <span>End date *</span>
              <input
                type="date"
                id="end-date"
                required
                value={loanData.endDate ?? ""}
                onChange={(e) =>
                  setLoanData((s) => {
                    return {
                      ...s,
                      endDate: e.target.value,
                    };
                  })
                }
              />
            </label>
          )}

          {loanData.repaymentType === "installments" && (
            <>
              <div className="flex items-center gap-[1rem]">
                <label htmlFor="installment-frequency" className="flex-1">
                  <span>Installment frequency *</span>
                  <select
                    required
                    value={loanData.installmentFrequency ?? "WEEKLY"}
                    onChange={(e) => {
                      setLoanData((s) => {
                        return {
                          ...s,
                          installmentFrequency: e.target
                            .value as InstallmentFrequency,
                        };
                      });
                    }}
                  >
                    <option value="WEEKLY">weekly</option>
                    <option value="MONTHLY">monthly</option>
                  </select>
                </label>
                <label htmlFor="automatic-calculation" className="flex-1">
                  <span>Calculate automatically? *</span>
                  <select
                    id="automatic-calculation"
                    value={automaticCalculation ?? "installments"}
                    required
                    onChange={(e) => {
                      const value = e.target.value as AutomaticCalculations;

                      setAutomaticCalculation(value);
                    }}
                  >
                    <option value="installments">
                      number of installments{" "}
                    </option>
                    <option value="last-date">Last installment date</option>
                  </select>
                </label>
              </div>

              <div className="flex items-center gap-[1rem]">
                <label htmlFor="installment-start-date" className="flex-1">
                  <span>First installment date *</span>
                  <input
                    type="date"
                    id="installment-start-date"
                    min={loanData.startingDate}
                    required
                    value={loanData.firstInstallmentDate ?? ""}
                    onChange={(e) =>
                      setLoanData((s) => {
                        return {
                          ...s,
                          firstInstallmentDate: e.target.value,
                        };
                      })
                    }
                  />
                </label>
                <label htmlFor="last-installment-date" className="flex-1">
                  <span>Last installment date *</span>
                  <input
                    type="date"
                    id="last-installment-date"
                    required
                    readOnly={automaticCalculation === "last-date"}
                    value={
                      automaticCalculation === "last-date"
                        ? (lastInstallmentDate ?? "")
                        : (loanData.lastInstallmentDate ?? "")
                    }
                    onChange={(e) => {
                      if (automaticCalculation !== "last-date") {
                        setLoanData((s) => ({
                          ...s,
                          lastInstallmentDate: e.target.value,
                        }));
                      }
                    }}
                  />
                </label>
              </div>

              <div className="flex items-center gap-[1rem]">
                <label htmlFor="no.-of-installments" className="flex-1">
                  <span>No. of installments *</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id="no.-of-installments"
                    placeholder="enter total installments"
                    autoComplete="off"
                    required
                    readOnly={automaticCalculation === "installments"}
                    value={
                      automaticCalculation === "installments"
                        ? (totalInstallments ?? "")
                        : (loanData.totalInstallments ?? "")
                    }
                    onChange={(e) => {
                      if (automaticCalculation === "installments") return;

                      const raw = e.target.value;

                      if (!/^\d*$/.test(raw)) return;

                      setLoanData((s) => {
                        return {
                          ...s,
                          totalInstallments: Number(raw),
                        };
                      });
                    }}
                  />
                </label>

                <label htmlFor="installment-amount" className="flex-1">
                  <span>Installment amount</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    id="installment-amount"
                    placeholder="auto-generated"
                    required
                    readOnly
                    value={installmentAmount ?? ""}
                  />
                </label>
              </div>
            </>
          )}

          <div className="flex justify-between items-center gap-[1rem] w-[50%] mx-auto">
            <button
              onClick={() => setShowCreateLoanModel(false)}
              className="px-2 py-1 border-1 rounded-[10px] hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 border-1 rounded-[10px] bg-black text-white font-bold"
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
