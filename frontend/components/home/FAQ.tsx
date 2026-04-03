"use client";

import { useState } from "react";
import PlusIcon from "./icons/PlusIcon";

export default function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-2xl px-5 py-4 font-medium flex justify-between items-center"
      >
        {question}
        {/* <span
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span> */}
        <PlusIcon />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-2xl text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}
