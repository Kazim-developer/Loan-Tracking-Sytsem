import FAQ from "./FAQ";

export default function FAQs() {
  return (
    <section id="faqs" className="bg-[#efefef] py-[3rem]">
      <section className=" center-section">
        <h1 className="text-4xl font-[500] text-center">Got Questions?</h1>
        <section className="questions flex flex-col justify-center  mt-[2rem] gap-[1rem]">
          <FAQ
            question="How do I get started?"
            answer="Sign up, add your first client, and create a loan — 
the whole setup takes under 5 minutes. No training needed."
          />

          <FAQ
            question="Who is Loqvio built for?"
            answer="Loqvio is built for private lenders, microfinance businesses, 
cooperatives, and anyone managing loans outside of a bank. 
If you're tracking loans on Excel, this is for you."
          />

          <FAQ
            question="How is this better than spreadsheets?"
            answer="Spreadsheets break, get miscalculated, and don't tell you 
who's overdue. Loqvio automates balances, flags late payments, 
and gives you a live view of your entire loan book — 
without a single formula."
          />

          <FAQ
            question="Can I track partial payments?"
            answer="Yes. Record any amount received and Loqvio automatically 
updates the remaining balance and adjusts the loan status. 
No manual recalculation needed."
          />

          <FAQ
            question="Is my data secure?"
            answer="Your data is protected with secure authentication and 
encrypted storage. Only you can access your clients and loans."
          />

          <FAQ
            question="Is there a free plan?"
            answer="Yes — you can start for free and get a feel for the full 
product. Upgrade when your lending volume grows and you 
need more capacity."
          />
        </section>
      </section>
    </section>
  );
}
