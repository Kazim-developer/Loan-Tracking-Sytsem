export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white flex center-section my-[3rem] text-gray-900">
      <div>
        <h1 className="text-4xl font-[500] text-black mb-2">Privacy Policy</h1>

        <p className="text-sm text-gray-500 mb-10">
          Effective Date: May 9, 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h1 className="text-2xl font-medium text-black mb-2">
              Information We Collect
            </h1>
            <p>
              We collect only the data required to operate the service,
              including account information (email, password or Google OAuth)
              and loan data such as amount, interest, and client details (name,
              email, optional phone).
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-medium text-black mb-2">
              How We Use Information
            </h1>
            <p>
              We use your data only to operate the platform, manage loan
              records, authenticate users, and provide support. We do not sell
              or use data for advertising.
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-medium text-black mb-2">
              Third-Party Services
            </h1>
            <p>
              We use Paddle for payments, Vercel for hosting, and Resend for
              email support. These services only process necessary operational
              data.
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-medium text-black mb-2">
              Data Security
            </h1>
            <p>
              All data is protected using HTTPS and standard encryption
              practices.
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-medium text-black mb-2">
              Data Retention
            </h1>
            <p>
              Data is stored while your account is active. You may request
              account deletion by contacting support.
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-medium text-black mb-2">
              User Control
            </h1>
            <p>
              You can update loan data, change your password, and request
              account deletion via support.
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-medium text-black mb-2">
              Cookies & Authentication
            </h1>
            <p>
              We do not use tracking cookies. JWT is used only for
              authentication sessions.
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-medium text-black mb-2">Contact</h1>
            <p>For support or privacy questions, contact: support@loqvio.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
