export default function TermsPage() {
  const effectiveDate = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-white flex center-section my-[3rem]">
      <div>
        <h1 className="text-3xl font-medium text-black mb-2">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-400 mb-10">
          Effective Date: {effectiveDate}
        </p>

        <div className="space-y-8 text-gray-500 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Use of Service
            </h2>
            <p>
              You agree to use this service only for lawful purposes and in
              compliance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Account Responsibility
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Acceptable Use
            </h2>
            <p>
              You must not misuse the platform, attempt to disrupt it, or
              provide false data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">Payments</h2>
            <p>
              Payments are processed via Paddle. All payments are final and
              non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Data Accuracy
            </h2>
            <p>
              You are responsible for ensuring that the data you enter is
              accurate. Calculations depend on your inputs.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Service Availability
            </h2>
            <p>
              The service may be updated or temporarily unavailable at any time
              without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Limitation of Liability
            </h2>
            <p>
              We are not responsible for financial decisions, data loss, or
              indirect damages resulting from use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Account Suspension
            </h2>
            <p>
              We may suspend access if the service is misused or used for
              illegal activity.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Governing Law
            </h2>
            <p>These Terms are governed by the laws of Pakistan.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">Contact</h2>
            <p>For support, contact: support@example.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
