"use client";

import Image from "next/image";
import VideoSection from "./VideoSection";

export default function ProductPreview() {
  return (
    <section className="center-section bg-white my-[3rem]">
      <div className="flex flex-col gap-[3rem]">
        <div className="flex flex-col gap-[2rem]">
          <h1 className="text-4xl text-center font-[500]">
            Complete visibility across all loans
          </h1>
          <div className="rounded-2xl border border-gray-200 shadow-xl overflow-hidden bg-white">
            <Image
              src="/assets/loan table.webp"
              alt="Loan table preview"
              width={1400}
              height={900}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <VideoSection />
      </div>
    </section>
  );
}
