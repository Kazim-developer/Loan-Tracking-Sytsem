import clsx from "clsx";
import Feature from "./Feature";

export default function Features() {
  return (
    <section id="features" className="features-section py-[3rem] bg-[#efefef]">
      <section className={clsx("features-content center-section")}>
        <section className="intro-section text-center font-[500]">
          <h1 className={clsx("text-4xl mb-[1rem]")}>
            Powerful tools to manage client payments
          </h1>
          <p className={clsx("text-2xl font-[300] text-[#555]")}>
            From loans and invoices to installments and reminders, everything is
            organized in one place.
          </p>
        </section>
        <section className="features grid grid-cols-2 gap-[2rem] mt-[2rem] max-[650px]:grid-cols-1">
          <Feature
            icon="group"
            title="Client Management"
            description="Store and manage all your clients in one place. Track their loans, invoices, payment history, and outstanding balances."
          />
          <Feature
            icon="clip"
            title="Loans & Invoices"
            description="Create loans or invoices for clients and track total amount, paid amount, due amount, and payment status."
          />
          <Feature
            icon="calendar"
            title="Installment Tracking"
            description="Create installment schedules, track due dates, and monitor paid and pending installments easily."
          />
          <Feature
            icon="payment"
            title="Payment Tracking"
            description="Record payments, track transaction history, and automatically update outstanding balances."
          />
          <Feature
            icon="download"
            title="Reports & Exports"
            description="Download client statements, installment reports, and payment history in Excel. Generate and download invoices anytime."
          />

          <Feature
            icon="notification"
            title="Reminders & Notifications"
            description="Send payment reminders to clients via email or WhatsApp with a single click before due dates."
          />
        </section>
      </section>
    </section>
  );
}
