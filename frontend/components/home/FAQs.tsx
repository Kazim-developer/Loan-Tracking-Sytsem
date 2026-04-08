import FAQ from "./FAQ";

export default function FAQs() {
  return (
    <section id="faqs" className="bg-[#efefef] py-[3rem]">
      <section className=" center-section">
        <h1 className="text-4xl font-[500] text-center">FAQs</h1>
        <section className="questions flex flex-col justify-center  mt-[2rem] gap-[1rem]">
          <FAQ
            question="How do I get started?"
            answer="Sign up in minutes, add your clients, and start creating loans or invoices right away."
          />
          <FAQ
            question="Who is Loqvio for?"
            answer="Loqvio is built for lenders, freelancers, and businesses that need to track customer payments, invoices, loans, or installments."
          />
          <FAQ
            question="Is Loqvio vibe coded?"
            answer="No. Loqvio is engineered by experienced developer using production-grade architecture and best practices to ensure reliability, accuracy, and security."
          />
          <FAQ
            question="Why not just use Excel?"
            answer="Excel sheets become difficult to manage as your data grows. Loqvio automatically tracks paid and outstanding amounts, manages installments, and lets you send reminders without manual work."
          />
          <FAQ
            question="Is my data secure?"
            answer="Yes, your data is securely stored and protected. We use secure authentication and data protection practices to keep your information safe."
          />
          <FAQ
            question="Can I send reminders to clients?"
            answer="Yes, you can send payment reminders via email or WhatsApp with a single click before due dates."
          />
          <FAQ
            question="Can I download payment, installment, or invoice reports?"
            answer="Yes, you can download client statements, installment reports, payment history in Excel, and invoices in PDF anytime."
          />
          <FAQ
            question="Is there a free plan or trial?"
            answer="Yes, you can start with a free plan and upgrade anytime as your business grows."
          />
          <FAQ
            question="Can I manage both loans and invoices?"
            answer="Yes, you can create both loans and invoices, set installments, and track payments for each client."
          />
          <FAQ
            question="Can I track partial payments?"
            answer="Yes, you can record partial payments, and the system will automatically update the outstanding balance."
          />
        </section>
      </section>
    </section>
  );
}
