import Hook from "./Hook";
import Plan from "./Plan";

export default function Pricing() {
  return (
    <section id="pricing" className="center-section py-[3rem]">
      <section>
        <section className="mb-[2rem]">
          <section className="text-content ">
            <h1 className="text-4xl font-[500] text-center mb-[1rem]">
              Simple, Transparent Pricing
            </h1>
            <p className="text-center text-2xl text-[#555]">
              Choose the plan that fits your needs.
            </p>
          </section>
          <section className="plans grid grid-cols-2 gap-[2rem] mt-[3rem] max-[740px]:grid-cols-1">
            <Plan plan="Free" />
            <Plan plan="Pro" />
            <Plan plan="Business" />
            <Plan plan="Enterprise" />
          </section>
        </section>
        <section>
          <h1 className="text-[#555] text-center text-xl mb-[1rem]">
            Join thousands of users who trust Loqvio with their financial
            management
          </h1>
          <section className="hooks center-section flex justify-center items-center gap-[2rem] max-[600px]:flex-col max-[600px]:items-start">
            <Hook desc="Sign Up to start using" />
            <Hook desc="Upgrade later" />
            <Hook desc="Cancel anytime" />
          </section>
        </section>
      </section>
    </section>
  );
}
