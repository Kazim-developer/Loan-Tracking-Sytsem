export default function PrivacyPolicyPage() {
  const effectiveDate = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-white flex center-section my-[3rem]">
      <div>
        <h1 className="text-3xl font-medium text-black mb-2">Privacy Policy</h1>

        <p className="text-sm text-gray-400 mb-10">
          Effective Date: {effectiveDate}
        </p>

        <div className="space-y-8 text-gray-500 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Information We Collect
            </h2>
            <p>
              We collect only the data required to operate the service,
              including account information (email, password or Google OAuth)
              and loan data such as amount, interest, and client details (name,
              email, optional phone).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              How We Use Information
            </h2>
            <p>
              We use your data only to operate the platform, manage loan
              records, authenticate users, and provide support. We do not sell
              or use data for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Third-Party Services
            </h2>
            <p>
              We use Paddle for payments, Vercel for hosting, and Resend for
              email support. These services only process necessary operational
              data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Data Security
            </h2>
            <p>
              All data is protected using HTTPS and standard encryption
              practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Data Retention
            </h2>
            <p>
              Data is stored while your account is active. You may request
              account deletion by contacting support.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              User Control
            </h2>
            <p>
              You can update loan data, change your password, and request
              account deletion via support.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">
              Cookies & Authentication
            </h2>
            <p>
              We do not use tracking cookies. JWT is used only for
              authentication sessions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-black mb-2">Contact</h2>
            <p>
              For support or privacy questions, contact: support@example.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
