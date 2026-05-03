import Pricing from "@/components/home/Pricing";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

export default function UpgradePage() {
  return (
    <ProtectedRoute>
      <Pricing />
    </ProtectedRoute>
  );
}
