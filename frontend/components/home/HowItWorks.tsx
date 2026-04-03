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
            Get started in minutes and manage all your client payments in one
            simple workflow.
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
            title="Add Your Clients"
            description="Add and manage all your clients in one place. Keep their contact details, accounts, and payment history organized."
          />
          <UsageGuide
            index="2"
            icon="clip"
            title="Create Loan or Invoice"
            description="Create a loan or invoice for a client, set total amount, installments, and due dates."
          />
          <UsageGuide
            index="3"
            icon="calendar"
            title="Set Installments & Schedule"
            description="Split payments into installments, set payment frequency, and schedule due dates easily."
          />
          <UsageGuide
            index="4"
            icon="payment"
            title="Track Payments"
            description="Record payments, track paid and pending amounts, and monitor overdue installments."
          />
          <UsageGuide
            index="5"
            icon="notification"
            title="Send Payment Reminders"
            description="Send reminders to clients via email or WhatsApp before due dates with a single click."
          />
          <UsageGuide
            index="6"
            icon="download"
            title="Download Reports & Invoices"
            description="Download client statements, installment reports, and invoices in Excel or PDF anytime."
          />
        </section>
      </section>
    </section>
  );
}
