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
      <section
        className={clsx(
          "w-[250px] h-full bg-white pt-4 pl-6 flex flex-col justify-between absolute top-0 right-0 transition-transform duration-300 ease-in-out",
          showSidebar ? "translate-x-0" : "translate-x-full",
        )}
      >
        <Sidebar setShowSidebar={setShowSidebar} />
      </section>
    </section>
  );
}
