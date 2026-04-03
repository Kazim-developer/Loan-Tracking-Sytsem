import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <h1>dashboard page</h1>
    </ProtectedRoute>
  );
}
