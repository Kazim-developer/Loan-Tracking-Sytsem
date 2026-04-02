import clsx from "clsx";
import Image from "next/image";

export default function MyLogo() {
  return (
    <section className={clsx("flex items-center gap-[0.5rem]")}>
      <Image src="/assets/saas-logo.svg" width={40} height={40} alt="Logo" />
      <h1 className={clsx("text-xl font-md font-inter select-none")}>Loqvio</h1>
    </section>
  );
}
