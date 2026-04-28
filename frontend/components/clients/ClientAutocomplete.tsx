"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchClients } from "@/hooks/useSearchClients";
import clsx from "clsx";
import { LoanData } from "@/validators/loanData.validator";

export default function ClientAutocomplete({
  setLoanData,
  className,
}: {
  setLoanData?: React.Dispatch<React.SetStateAction<LoanData>>;
  className?: string;
}) {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: clients = [], isLoading } = useSearchClients(query);

  const ref = useRef(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={clsx("relative", `${className}`)}>
      <label htmlFor="client-name" className="flex-1">
        <span>Client name *</span>
        <input
          type="text"
          value={query}
          placeholder="search client..."
          ref={inputRef}
          required
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);

            setLoanData?.((s) => {
              return { ...s, clientId: "" };
            });
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full border-2 border-[#aaa] rounded-[8px] outline-none"
        />
      </label>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full bg-white rounded-[10px] shadow-md z-10 max-h-60 overflow-y-auto">
          {!isLoading &&
            clients.length > 0 &&
            clients.map((client) => (
              <div
                key={client.id}
                onClick={() => {
                  setQuery(client.name);
                  setIsOpen(false);
                  setLoanData?.((s) => {
                    return { ...s, clientId: client.id };
                  });
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <p>{client.name}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
            ))}

          {!isLoading && clients.length === 0 && query.length >= 2 && (
            <div className="p-2 text-sm text-gray-500">No clients found</div>
          )}
        </div>
      )}
    </div>
  );
}
