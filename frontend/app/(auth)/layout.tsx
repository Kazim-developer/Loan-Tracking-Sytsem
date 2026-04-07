import clsx from "clsx";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={clsx("w-[100%] h-[100vh] flex justify-center items-center")}
    >
      {children}
    </section>
  );
}
