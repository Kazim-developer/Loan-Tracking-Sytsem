import clsx from "clsx";
import Sidebar from "./Sidebar";
import useShowElementStore from "@/stores/showElement.store";

export default function SidebarContainer() {
  const showSidebar = useShowElementStore((s) => s.showSidebar);
  const setShowSidebar = useShowElementStore((s) => s.setShowSidebar);

  return (
    <section
      className={clsx(
        "sidebar-container transition-opacity duration-300",
        showSidebar
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
      onClick={() => setShowSidebar(false)}
    >
      <Sidebar />
    </section>
  );
}
