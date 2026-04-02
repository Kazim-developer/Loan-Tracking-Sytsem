import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface GoogleButtonProps {
  text: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ text }) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 px-4 py-2 border-1 rounded-md hover:bg-[#eee] cursor-pointer mx-auto",
      )}
      onClick={() => {
        window.location.href = "http://localhost:5000/auth/google";
      }}
    >
      <Image
        src="/assets/google-icon.png"
        alt="Google"
        width={20}
        height={20}
      />
      {text + " with Google"}
    </button>
  );
};

export default GoogleButton;
