export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="center-section my-[3rem]">
        <h1 className="text-4xl font-[500] tracking-tight mb-4">
          Refund Policy
        </h1>

        <p className="text-sm text-gray-500 mb-12">Last updated: May 9, 2026</p>

        <div className="space-y-10 leading-7">
          <section>
            <h1 className="text-2xl font-[500] mb-3">1. Digital Service</h1>

            <p className="text-gray-700">
              Loqvio is a software-as-a-service (SaaS) platform that provides
              instant access to digital tools and features immediately after
              purchase. Because access is granted instantly, all purchases are
              generally non-refundable.
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-[500] mb-3">2. No Refund Policy</h1>

            <p className="text-gray-700 mb-4">
              All subscription payments and purchases made through Loqvio are
              non-refundable.
            </p>

            <p className="text-gray-700 mb-3">We do not provide refunds for:</p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Change of mind</li>
              <li>Unused subscriptions</li>
              <li>Partial billing periods</li>
              <li>Failure to cancel before renewal</li>
              <li>Accidental purchases made by the user</li>
              <li>Lack of usage after subscribing</li>
              <li>
                Dissatisfaction with features that were clearly described before
                purchase
              </li>
            </ul>
          </section>

          <section>
            <h1 className="text-2xl font-[500] mb-3">
              3. Subscription Cancellation
            </h1>

            <p className="text-gray-700 mb-4">
              You may cancel your subscription at any time from your account
              billing settings.
            </p>

            <p className="text-gray-700 mb-3">After cancellation:</p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Your subscription will remain active until the end of the
                current billing cycle
              </li>
              <li>You will not be charged again on the next renewal date</li>
              <li>
                No partial or prorated refunds will be issued for unused time
              </li>
            </ul>
          </section>

          <section>
            <h1 className="text-2xl font-[500] mb-3">4. Exceptional Cases</h1>

            <p className="text-gray-700 mb-4">
              Although refunds are generally not provided, we may review
              exceptional situations on a case-by-case basis, including:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Duplicate charges</li>
              <li>Technical failures preventing access to the service</li>
              <li>Incorrect billing caused by a system error</li>
            </ul>

            <p className="text-gray-700 mt-4">
              Submitting a refund request does not guarantee approval.
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-[500] mb-3">5. Chargebacks</h1>

            <p className="text-gray-700">
              Initiating fraudulent or abusive chargebacks may result in:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
              <li>Immediate suspension of your account</li>
              <li>Permanent termination of access to the platform</li>
              <li>Restriction from future purchases</li>
            </ul>

            <p className="text-gray-700 mt-4">
              We encourage users to contact us first before opening a payment
              dispute.
            </p>
          </section>

          <section>
            <h1 className="text-2xl font-[500] mb-3">6. Contact</h1>

            <p className="text-gray-700">
              If you have billing questions or experience a payment-related
              issue, contact us at:
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 w-[fit-content]">
              <p className="font-medium">support@loqvio.com</p>
            </div>

            <p className="text-gray-700 mt-4">
              We aim to respond to billing inquiries as quickly as possible.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
