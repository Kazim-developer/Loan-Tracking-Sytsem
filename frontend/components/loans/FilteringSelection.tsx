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
    <div className="relative inline-block">
      <p className="text-[#aaa] ml-2 mb-2">{label}</p>
      <div>
        <div
          className="flex items-center justify-between gap-2 border-2 border-[#aaa] rounded-[10px] p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-5">
            <FilterIcon />
            <span className="text-center">{currentFilter}</span>
          </div>
          <DownArrow size={"5"} />
        </div>

        {isOpen && (
          <div className="absolute left-0 mt-1 w-full bg-white border-2 border-[#aaa] rounded-[10px] shadow-md z-10 flex flex-col gap-1">
            {options.map((option, index) => {
              return (
                <span
                  key={index}
                  className={clsx(
                    "px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-[10px]",
                    option === currentFilter ? "bg-gray-100" : null,
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
