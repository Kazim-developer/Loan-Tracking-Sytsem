"use client";

import { postFormData } from "@/handlers/postFormData";
import { hasErrors } from "@/utils/hasErrors.util";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type SupportData = {
  name: string;
  email: string;
  supportType: string;
  message: string;
};

export default function SupportForm() {
  const [supportData, setSupportData] = useState<SupportData>({
    name: "",
    email: "",
    supportType: "technical issue",
    message: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { mutate } = useMutation({
    mutationFn: () => postFormData("support", supportData),
    onSuccess: () => {
      toast.success("your request is submitted successfully");
      setSupportData({
        name: "",
        email: "",
        supportType: "technical issue",
        message: "",
      });
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
      className="w-full max-w-xl space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Name *</label>

        <input
          type="text"
          placeholder="Enter your name"
          required
          ref={inputRef}
          value={supportData.name}
          onChange={(e) =>
            setSupportData((s) => {
              return { ...s, name: e.target.value };
            })
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Email *</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={supportData.email}
          required
          onChange={(e) =>
            setSupportData((s) => {
              return { ...s, email: e.target.value };
            })
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Support Type
        </label>

        <select
          onChange={(e) =>
            setSupportData((s) => {
              return { ...s, supportType: e.target.value.toLowerCase() };
            })
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        >
          <option>Technical Issue</option>
          <option>Billing</option>
          <option>Feature Request</option>
          <option>Bug Report</option>
          <option>General Question</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Message *</label>

          <p className="text-xs text-gray-500">
            {supportData.message.length} / 500
          </p>
        </div>

        <textarea
          rows={6}
          maxLength={500}
          required
          placeholder="Describe your issue..."
          value={supportData.message}
          onChange={(e) =>
            setSupportData((s) => {
              return {
                ...s,
                message: e.target.value,
              };
            })
          }
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:opacity-90"
      >
        Submit Support Request
      </button>
    </form>
  );
}
