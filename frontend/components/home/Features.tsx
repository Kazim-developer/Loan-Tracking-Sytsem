import clsx from "clsx";
import Feature from "./Feature";

export default function Features() {
  return (
    <section id="features" className="features-section py-[3rem] bg-[#efefef]">
      <section className={clsx("features-content center-section")}>
        <section className="intro-section text-center font-[500]">
          <h1 className={clsx("text-4xl mb-[1rem]")}>
            Everything a lending business needs. Nothing it doesn`t.
          </h1>
          <p className={clsx("text-2xl font-[300] text-[#555]")}>
            Built specifically for lenders — track clients, loans, repayments,
            and overdue accounts without the spreadsheet chaos.
          </p>
        </section>
        <section className="features grid grid-cols-2 gap-[2rem] mt-[2rem] max-[650px]:grid-cols-1">
          <Feature
            icon="group"
            title="Client Management"
            description="Every borrower's loan history, active balances, 
and repayment status — organized and searchable in seconds."
          />
          <Feature
            icon="clip"
            title="Smart Loan Creation"
            description="Fill in the amount, rate, and term — Loqvio 
instantly calculates installments, total interest, and the 
final due date before you confirm anything."
          />
          <Feature
            icon="calendar"
            title="Installment Tracking"
            description="Mark payments as received and watch balances 
update automatically. No manual math, no outdated records."
          />
          <Feature
            icon="payment"
            title="Loan Insights"
            description="See how much you've lent, what's been repaid, 
and who's overdue — all on one screen, always up to date."
          />
        </section>
      </section>
    </section>
  );
}
