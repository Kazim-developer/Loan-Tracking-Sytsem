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
            description="Store all clients in one place with their active loans, repayments, and balances clearly organized."
          />
          <Feature
            icon="clip"
            title="Smart Loan Creation"
            description="Create loans in seconds with automatic calculations for total amount, interest, and repayment structure."
          />
          <Feature
            icon="calendar"
            title="Installment Tracking"
            description="Record payments instantly and automatically update balances and loan status in real time."
          />
          <Feature
            icon="payment"
            title="Loan Insights"
            description="Get a clear view of total lending, repayments, outstanding amounts, and overdue loans at a glance."
          />
        </section>
      </section>
    </section>
  );
}
