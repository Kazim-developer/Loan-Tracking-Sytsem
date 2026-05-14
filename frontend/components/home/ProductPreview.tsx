"use client";

import Image from "next/image";
import VideoSection from "./VideoSection";

export default function ProductPreview() {
  return (
    <section className="center-section bg-white my-[3rem]">
      <div className="flex flex-col gap-[3rem]">
        <div className="flex flex-col items-center gap-[2rem]">
          <div>
            <h1 className="text-4xl font-[500]">
              Your entire loan book. At a glance.
            </h1>
          </div>
          <div className="rounded-2xl border border-gray-200 shadow-xl max-w-[900px] overflow-hidden bg-white">
            <Image
              src="/assets/tabular UI.png"
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
