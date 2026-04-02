import clsx from "clsx";
import Feature from "./Feature";

export default function Features() {
  return (
    <section id="features" className="features-section py-[3rem] bg-[#efefef]">
      <section className={clsx("features-content center-section")}>
        <section className="intro-section text-center font-[500]">
          <h1 className={clsx("text-4xl mb-[1rem]")}>
            Everything you need to manage loans
          </h1>
          <p className={clsx("text-2xl font-[300] text-[#555]")}>
            Powerful features designed to simplify loan tracking for individuals
            and businesses.
          </p>
        </section>
        <section className="features grid grid-cols-2 gap-[2rem] mt-[2rem] max-[650px]:grid-cols-1">
          <Feature
            icon="clip"
            title="Track Personal Loans
"
            description="Keep all borrower loans organized, track repayments, and reduce defaults effortlessly.

"
          />
          <Feature
            icon="group"
            title="Business Customer Management"
            description="Manage your clients, view their payment history, and maintain healthy cash flow."
          />
          <Feature
            icon="calendar"
            title="Installment Automation"
            description="Automate schedules and reminders so your borrowers never miss a payment."
          />
          <Feature
            icon="chart"
            title="Smart Financial Dashboard"
            description="Gain instant insights into total loans, pending payments, and overall portfolio health."
          />
          <Feature
            icon="payment"
            title="Payment & Transaction Monitoring"
            description="Monitor all incoming payments with clarity and reduce accounting errors."
          />
          <Feature
            icon="notification"
            title="Proactive Alerts"
            description="Send timely notifications to borrowers before due dates to reduce late payments."
          />
        </section>
      </section>
    </section>
  );
}
