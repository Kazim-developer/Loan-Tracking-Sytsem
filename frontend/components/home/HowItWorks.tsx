import clsx from "clsx";
import UsageGuide from "./UsageGuide";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works py-[3rem]">
      <section className={clsx("center-section")}>
        <section className={clsx("")}>
          <h1 className="text-4xl text-center font-[500] mb-[1rem]">
            Up and running in under 5 minutes.
          </h1>
          <p className="text-2xl text-center text-[#555] font-[300]">
            No training needed. No spreadsheet migration. Just three steps and
            your loans are fully tracked.
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
            description="Create a profile for each borrower — name, 
contact, and details. Your client list is ready to go."
          />
          <UsageGuide
            index="2"
            icon="clip"
            title="Create a Loan"
            description="Enter the amount, interest, and term. Loqvio 
instantly shows the full repayment schedule before you confirm."
          />
          <UsageGuide
            index="3"
            icon="payment"
            title="Track Every Repayment"
            description="Record payments as they come in. Balances update 
automatically and overdue accounts get flagged — no chasing required."
          />
        </section>
      </section>
    </section>
  );
}
