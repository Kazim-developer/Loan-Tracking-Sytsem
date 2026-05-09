import clsx from "clsx";
import UsageGuide from "./UsageGuide";

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
            "grid grid-cols-3 gap-[1rem] my-[2rem] max-[820px]:grid-cols-2 max-[550px]:grid-cols-1",
          )}
        >
          <UsageGuide
            index="1"
            icon="plus"
            title="Add Clients"
            description="Start by adding your clients with basic details to keep everything organized in one place."
          />
          <UsageGuide
            index="2"
            icon="clip"
            title="Create a Loan"
            description="Create a loan by entering the amount and letting the system automatically structure repayments."
          />
          <UsageGuide
            index="3"
            icon="payment"
            title="Track Repayments"
            description="Monitor every payment, due date, and outstanding balance in real time."
          />
        </section>
      </section>
    </section>
  );
}
