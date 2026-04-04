import Link from "next/link";
import MyLogo from "./MyLogo";

export default function Footer() {
  return (
    <footer className="bg-[#efefef] py-[3rem]">
      <section className="center-section flex justify-between items-start gap-[2rem] max-[520px]:flex-col">
        <section className="flex flex-col gap-[1rem]">
          <MyLogo />
          <h1>
            Loqvio helps businesses track clients, invoices, loans,
            installments, and payments — all in one place.
          </h1>
        </section>
        <section className="flex flex-col gap-[1rem]">
          <h1 className="font-[500]">Product</h1>
          <section className="references flex flex-col gap-[1rem]">
            <Link href="/#features">Features</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/dashboard">Dashboard</Link>
          </section>
        </section>
        <section className="flex flex-col gap-[1rem]">
          <h1 className="font-[500]">Account</h1>
          <section className="references flex flex-col gap-[1rem]">
            <Link href="/signup">Sign Up</Link>
            <Link href="/login">Login</Link>
          </section>
        </section>
      </section>
      <hr className="center-section text-[#ccc] my-[1rem]" />
      <section className="center-section flex justify-between items-center max-[520px]:flex-col">
        <p className="max-[520px]:mb-[1rem]">
          © {new Date().getFullYear()} Loqvio. All rights reserved.
        </p>
        <section className="flex justify-center items-center gap-[2rem]">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms and Services</Link>
        </section>
      </section>
    </footer>
  );
}
