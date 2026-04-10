import clsx from "clsx";

export default function ActiveSubscriptionTag() {
  return (
    <section
      className={clsx(
        "absolute top-[2rem] right-[2rem] p-2 bg-green-100 rounded-[5px] ",
      )}
    >
      <h1 className="text-green-600 font-[500] text-xl">Active</h1>
    </section>
  );
}
