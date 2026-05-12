"use client";

import FilterIcon from "@/components/icons/FilterIcon";
import { useState } from "react";
import DownArrow from "../icons/DownArrow";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import updateQueryParam from "@/utils/updateQueryParam";

type FilteringOptions = {
  options: string[];
  type: "status" | "repay_type" | "repay_status";
  label: string;
};

export default function FilteringSelection({
  options,
  type,
  label,
}: FilteringOptions) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get(type) ?? "ALL";

  return (
    <div className="relative w-full">
      <p className="text-[#555] ml-2 mb-2">{label}</p>
      <div>
        <div
          className="flex items-center justify-between gap-2 border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3 min-w-0">
            <FilterIcon />

            <span className="truncate text-sm font-medium text-gray-700">
              {currentFilter}
            </span>
          </div>

          <DownArrow size={"5"} />
        </div>

        {isOpen && (
          <div className="absolute left-0 mt-1 w-full min-w-[180px] bg-white border-2 border-[#aaa] rounded-[10px] shadow-md z-10 flex flex-col gap-1">
            {options.map((option, index) => {
              return (
                <span
                  key={index}
                  className={clsx(
                    "px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md text-sm truncate",
                    option === currentFilter && "bg-gray-100 font-medium",
                  )}
                  onClick={() => {
                    setIsOpen(false);
                    updateQueryParam(type, option, searchParams, router);
                  }}
                >
                  {option}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
