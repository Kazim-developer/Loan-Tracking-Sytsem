"use client";

import Script from "next/script";
import { useQueryClient } from "@tanstack/react-query";

declare global {
  interface Window {
    Paddle?: any;
  }
}

export default function PaddleScriptTag() {
  const queryClient = useQueryClient();

  const initPaddle = () => {
    if (!window.Paddle) return;

    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!;

    window.Paddle.Environment.set("sandbox");

    window.Paddle.Initialize({
      token,

      eventCallback: async (event: any) => {
        if (event.name === "checkout.completed") {
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ["subscription"] });
            queryClient.invalidateQueries({ queryKey: ["stats"] });
          }, 2000);
        }
      },
    });
  };

  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="afterInteractive"
      onLoad={initPaddle}
    />
  );
}
