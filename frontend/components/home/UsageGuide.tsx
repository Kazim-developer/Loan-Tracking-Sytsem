import { usageGuide } from "@/validators/usageGuide.validator";
import PlusIcon from "./icons/PlusIcon";
import Calendar from "./icons/CalendarIcon";
import Chart from "./icons/ChartIcon";
import clsx from "clsx";

export default function UsageGuide({
  index,
  icon,
  title,
  description,
}: usageGuide) {
  return (
    <section
      className={clsx(
        "relative px-[2rem] pb-[2rem] pt-[3rem] text-center flex flex-col items-center justify-center border-1 border-gray-300 rounded-[20px]",
      )}
    >
      <h1 className="text-3xl w-[50px] h-[50px] rounded-full bg-black text-white flex items-center justify-center absolute top-[-1rem] left-1/2 -translate-x-1/2">
        {index}
      </h1>
      {icon === "plus" ? (
        <PlusIcon />
      ) : icon === "calendar" ? (
        <Calendar />
      ) : (
        <Chart />
      )}
      <h1 className="text-2xl font-[500] my-[1rem]">{title}</h1>
      <p className="text-[#555]">{description}</p>
    </section>
  );
}
