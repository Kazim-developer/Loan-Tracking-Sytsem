import FAQ from "./FAQ";

export default function FAQs() {
  return (
    <section id="faqs" className="bg-[#efefef] py-[3rem]">
      <section className=" center-section">
        <h1 className="text-4xl font-[500] text-center">FAQs</h1>
        <section className="questions flex flex-col justify-center  mt-[2rem] gap-[1rem]">
          <FAQ
            question="How do I get started?"
            answer="Sign up, add your clients, and start creating loans in minutes."
          />

          <FAQ
            question="Who is this platform for?"
            answer="It’s built for lenders and businesses that need to track client payments, loans, or installments in one place."
          />

          <FAQ
            question="How is this better than using spreadsheets?"
            answer="Unlike spreadsheets, everything is automated—balances, repayments, and due amounts update automatically without manual calculations."
          />

          <FAQ
            question="Can I track partial payments?"
            answer="Yes, you can record full or partial payments and the system will automatically update the remaining balance."
          />

          <FAQ
            question="Is my data secure?"
            answer="Yes, your data is securely stored with authentication and standard security practices in place."
          />

          <FAQ
            question="Is there a free plan available?"
            answer="Yes, you can start with a free plan and upgrade anytime as your usage grows."
          />
        </section>
      </section>
    </section>
  );
}
