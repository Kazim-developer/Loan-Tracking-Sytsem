import clsx from "clsx";
import Sidebar from "./Sidebar";

export default function SidebarContainer({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}) {
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
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </section>
  );
}
