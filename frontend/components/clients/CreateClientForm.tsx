"use client";

import useShowElementStore from "@/stores/showElement.store";
import Close from "../icons/Close";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postFormData } from "@/handlers/postFormData";
import { ClientData } from "@/validators/clientData.validator";
import { toast } from "react-toastify";

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

  const { mutate } = useMutation({
    mutationFn: (data: ClientData) => postFormData("create-client", data),
    onSuccess: (data) => {
      setClientData({ name: "", email: "", phone: undefined });
      toast.success(data.message);
    },
    onError: (error) => {
      if (error.errors) {
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
      className="create-client-form bg-white px-3 py-5 max-w-[500px] rounded-[10px] flex flex-col gap-[0.8rem]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-end cursor-pointer">
        <Close
          size={"5"}
          setShowCreateClientModel={setShowCreateClientModel}
          setShowCreateLoanModel={setShowCreateLoanModel}
        />
      </div>
      <h1 className="text-center text-2xl mb-[0.5rem] font-mb">
        Register your client
      </h1>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={(e) => {
          e.preventDefault();
          mutate(clientData);
        }}
      >
        <div className="flex items-center gap-[1rem]">
          <input
            type="text"
            placeholder="client name"
            required
            ref={inputRef}
            value={clientData.name}
            onChange={(e) =>
              setClientData((s) => {
                return { ...s, name: e.target.value };
              })
            }
          />
          <input
            type="text"
            placeholder="phone (optional)"
            value={clientData.phone}
            onChange={(e) =>
              setClientData((s) => {
                return { ...s, phone: Number(e.target.value) };
              })
            }
          />
        </div>
        <input
          type="text"
          placeholder="email"
          required
          value={clientData.email}
          onChange={(e) =>
            setClientData((s) => {
              return { ...s, email: e.target.value };
            })
          }
        />
        <div className="mx-auto">
          <button
            type="submit"
            className=" bg-black text-white px-3 py-1 rounded-[10px]"
          >
            Create client
          </button>
        </div>
      </form>
      <hr className="text-[#555] rounded-[50%]" />
      <h1 className="text-[#555]">Already registered?</h1>
      {/* <div className="flex items-center justify-between gap-[1rem] w-[80%] mx-auto">
      </div> */}
      <button
        className=" bg-black text-white p-3 rounded-[10px]"
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
