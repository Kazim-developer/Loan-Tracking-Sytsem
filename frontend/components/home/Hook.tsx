import CheckSolid from "../icons/CheckSolid";

export default function Hook({ desc }: { desc: string }) {
  return (
    <section className="flex justify-center items-center gap-[0.5rem]">
      <CheckSolid />
      <span>{desc}</span>
    </section>
  );
}
