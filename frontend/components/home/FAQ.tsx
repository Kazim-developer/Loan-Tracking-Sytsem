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
        className="w-full text-left text-xl px-5 py-4 font-medium flex items-center"
      >
        <span className="truncate min-w-0 flex-1">{question}</span>
        <PlusIcon />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}
