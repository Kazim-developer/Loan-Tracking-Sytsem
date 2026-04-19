"use client";

import useShowElementStore from "@/stores/showElement.store";
import { useState } from "react";

export default function CreateLoanForm() {
  const setShowCreateLoanModel = useShowElementStore(
    (s) => s.setShowCreateLoanModel,
  );

  const [loanData, setLoanData] = useState({});

  const [haveInstallments, setHaveInstallments] = useState<boolean>(false);

  return (
    <section className="bg-white px-3 py-5 max-w-[500px] rounded-[10px] flex flex-col gap-[0.8rem]">
      <h1 className="text-center text-2xl mb-[0.5rem] font-mb">Create loan</h1>

      <form
        className="loan-created-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(loanData);
        }}
      >
        <div className="flex items-center gap-[1rem]">
          <div className="relative">
            <input
              type="text"
              placeholder="Borrower's name"
              required
              onChange={(e) =>
                setLoanData((s) => {
                  return { ...s, borrower: e.target.value };
                })
              }
            />
            <div className="absolute all-clients"></div>
          </div>

          <input
            type="text"
            placeholder="Total Amount($), only integer"
            required
            onChange={(e) =>
              setLoanData((s) => {
                return { ...s, totalAmount: +e.target.value };
              })
            }
          />
        </div>

        <div className="flex items-center gap-[1rem]">
          <label htmlFor="loan-start-date">
            <span>Amount received on</span>
            <input
              type="date"
              required
              onChange={(e) =>
                setLoanData((s) => {
                  return { ...s, startingDate: e.target.value };
                })
              }
            />
          </label>

          <label htmlFor="interest">
            <span>Interest rate %</span>
            <input
              type="text"
              placeholder="e.g: 8 (optional)"
              onChange={(e) =>
                setLoanData((s) => {
                  return { ...s, interest: +e.target.value };
                })
              }
            />
          </label>
        </div>

        <div className="flex items-center gap-[1rem] pl-1">
          <label
            htmlFor="compound-checkbox"
            className="w-[fit-content] flex items-center gap-5"
          >
            <h1>Compound?</h1>
            <input
              type="checkbox"
              id="compound-checkbox"
              className="w-5 h-5"
              onChange={(e) => {
                setLoanData((s) => {
                  return { ...s, isCompoundInterest: e.target.checked };
                });
              }}
            />
          </label>
          <label
            htmlFor="installment-checkbox"
            className="w-[fit-content] flex items-center gap-5"
          >
            <h1>Installments?</h1>
            <input
              type="checkbox"
              id="installment-checkbox"
              className="w-5 h-5"
              onChange={(e) => {
                setLoanData((s) => {
                  return { ...s, haveInstallments: e.target.checked };
                });

                setHaveInstallments(!haveInstallments);
              }}
            />
          </label>
        </div>

        {haveInstallments && (
          <>
            <select
              required
              onChange={(e) =>
                setLoanData((s) => ({
                  ...s,
                  frequency: e.target.value,
                }))
              }
            >
              <option value="">Select Frequency</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
            </select>

            <input
              type="text"
              placeholder="Installment amount"
              required
              onChange={(e) =>
                setLoanData((s) => {
                  return { ...s, installmentAmount: +e.target.value };
                })
              }
            />

            <label htmlFor="installment-start-date">
              <span>First installment date</span>
              <input
                type="date"
                required
                onChange={(e) =>
                  setLoanData((s) => {
                    return { ...s, installmentStartingDate: e.target.value };
                  })
                }
              />
            </label>
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
  );
}
