import handleLogout from "@/utils/logoutMethod";
import { useMutation } from "@tanstack/react-query";

export default function Logout() {
  const { mutate: logout } = useMutation({
    mutationFn: handleLogout,
    onSuccess: () => {
      window.location.href = "/";

      localStorage.clear();
    },
  });

  return (
    <button
      className="cursor-pointer px-4 py-1 bg-red-100 text-red-600 font-[500] rounded-[10px]"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
}
