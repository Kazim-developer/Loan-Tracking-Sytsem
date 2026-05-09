import SupportForm from "@/components/support/SupportForm";

export default function supportPage() {
  return (
    <section className="center-section my-[3rem] flex flex-col justify-center items-center gap-[2rem]">
      <h1 className="text-2xl font-[500] text-center">
        Need help? Our support team responds within 24 hours.
      </h1>
      <SupportForm />
    </section>
  );
}
