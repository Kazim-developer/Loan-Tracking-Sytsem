"use client";

import useShowElementStore from "@/stores/showElement.store";
import Close from "../icons/Close";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFormData } from "@/handlers/postFormData";
import { ClientData } from "@/validators/clientData.validator";
import { toast } from "react-toastify";
import { hasErrors } from "@/utils/hasErrors.util";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function CreateClientForm() {
  const setShowCreateClientModel = useShowElementStore(
    (s) => s.setShowCreateClientModel,
  );
  const setShowCreateLoanModel = useShowElementStore(
    (s) => s.setShowCreateLoanModel,
  );

  const [clientData, setClientData] = useState<ClientData>({
    name: "",
    email: "",
    phone: undefined,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: ClientData) => postFormData("create-client", data),
    onSuccess: (data) => {
      setClientData({ name: "", email: "", phone: undefined });
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["stats"] });
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

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <section
      className="create-client-form bg-white p-5 w-[80%] max-w-[500px] max-h-[80vh] overflow-y-auto rounded-lg flex flex-col gap-[0.8rem]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="ml-auto">
        <div className="flex items-center justify-end cursor-pointer w-[fit-content]">
          <Close
            size={"5"}
            setShowCreateClientModel={setShowCreateClientModel}
            setShowCreateLoanModel={setShowCreateLoanModel}
          />
        </div>
      </div>
      <h1 className="text-center text-2xl mb-[0.5rem] font-mb">
        Create client
      </h1>
      <form
        className="create-client-form flex flex-col gap-[1rem]"
        onSubmit={(e) => {
          e.preventDefault();
          mutate(clientData);
        }}
      >
        <div className="flex items-start gap-4 flex-col">
          <label className="flex-1 min-w-0 w-full">
            <span>Client or org. name *</span>
            <input
              type="text"
              required
              value={clientData.name}
              ref={inputRef}
              id="client-name"
              onChange={(e) =>
                setClientData((s) => ({
                  ...s,
                  name: e.target.value,
                }))
              }
            />
          </label>

          <label className="flex-1 min-w-0 w-full">
            <span>Phone</span>

            <PhoneInput
              placeholder="start with country code without +"
              value={clientData.phone}
              onChange={(value) =>
                setClientData((s) => ({
                  ...s,
                  phone: value || "",
                }))
              }
            />
          </label>
        </div>
        <label htmlFor="email">
          <span>Email *</span>
          <input
            type="text"
            required
            value={clientData.email}
            id="email"
            onChange={(e) =>
              setClientData((s) => {
                return { ...s, email: e.target.value };
              })
            }
          />
        </label>
        <div className="mx-auto">
          <button
            type="submit"
            className=" bg-black text-white px-5 py-3 rounded-lg font-bold"
          >
            Create client
          </button>
        </div>
      </form>
      <hr className="text-[#555] rounded-[50%]" />
      <h1 className="text-[#555]">Already registered?</h1>
      <button
        className=" bg-black text-white p-3 rounded-lg font-bold"
        onClick={() => {
          setShowCreateClientModel(false);
          setShowCreateLoanModel(true);
        }}
      >
        Create loan
      </button>
    </section>
  );
}
