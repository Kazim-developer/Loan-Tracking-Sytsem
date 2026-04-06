"use client";

import { useState } from "react";

export default function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <button
        className="w-full gap-3 px-5 py-4 text-left text-xl font-medium"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
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
