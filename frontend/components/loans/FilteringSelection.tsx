"use client";

import FilterIcon from "@/components/icons/FilterIcon";
import { useState } from "react";
import DownArrow from "../icons/DownArrow";
import clsx from "clsx";

type FilteringOptions = {
  options: string[];
};

export default function FilteringSelection({ options }: FilteringOptions) {
  const [selected, setSelected] = useState<string>("All");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center justify-between gap-2 border-2 border-[#aaa] rounded-[10px] p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-5">
          <FilterIcon />
          <span className="text-center">{selected}</span>
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
                  option === selected ? "bg-gray-100" : null,
                )}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
