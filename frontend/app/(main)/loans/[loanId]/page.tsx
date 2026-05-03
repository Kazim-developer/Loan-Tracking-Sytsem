import LoanDetailPage from "@/components/loans/LoanDetailPage";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

export default async function LoanPage({
  params,
}: {
  params: Promise<{ loanId: string }>;
}) {
  const loanId = (await params).loanId;
  return (
    <ProtectedRoute>
      <LoanDetailPage loanId={loanId} />
    </ProtectedRoute>
  );
}
