import clsx from "clsx";
import UsageGuide from "./UsageGuide";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works py-[3rem]">
      <section className={clsx("center-section")}>
        <section className={clsx("")}>
          <h1 className="text-4xl text-center font-[500] mb-[1rem]">
            How It Works
          </h1>
          <p className="text-2xl text-center text-[#555] font-[300]">
            Get started in minutes. No complex setup required.
          </p>
        </section>
        <section
          className={clsx(
            "grid grid-cols-3 gap-[2rem] my-[2rem] max-[800px]:grid-cols-2 max-[550px]:grid-cols-1",
          )}
        >
          <UsageGuide
            index="1"
            icon="plus"
            title="Add Your Loan or Customer"
            description="Enter loan details or add a customer with their installment plan in seconds."
          />
          <UsageGuide
            index="2"
            icon="calendar"
            title="Set Installments & Schedule
"
            description="Configure payment amounts, frequency, and due dates. Loqvio handles the rest.

"
          />
          <UsageGuide
            index="3"
            icon="chart"
            title="Track & Stay Updated
"
            description="Monitor payments, view analytics, and receive reminders automatically.

"
          />
        </section>
        <section className="flex flex-col gap-[1rem] justify-center items-center">
          <h1 className="text-2xl text-[#555] text-center">
            Ready to simplify your loan management?
          </h1>
          <Link
            href="/auth/sign-up"
            className={clsx(
              "bg-black p-2 text-white rounded-md font-bold hover:[bg-[#999]] hover:opacity-[.9]",
            )}
          >
            Sign Up
          </Link>
        </section>
      </section>
    </section>
  );
}
