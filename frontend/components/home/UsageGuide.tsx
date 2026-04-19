import { usageGuide } from "@/validators/usageGuide.validator";
import PlusIcon from "../icons/PlusIcon";
import Calendar from "../icons/CalendarIcon";
import clsx from "clsx";
import PaymentIcon from "../icons/PaymentIcon";
import DownloadIcon from "../icons/DownloadIcon";
import ClipBoardIcon from "../icons/ClipBoardIcon";
import NotificationIcon from "../icons/NotificationIcon";

export default function UsageGuide({
  index,
  icon,
  title,
  description,
}: usageGuide) {
  return (
    <section
      className={clsx(
        "relative px-[2rem] pb-[2rem] pt-[3rem] flex flex-col items-center justify-center border-1 border-gray-300 rounded-[20px]",
      )}
    >
      <h1 className="text-3xl w-[50px] h-[50px] rounded-full bg-black text-white flex items-center justify-center absolute top-[-1rem] left-1/2 -translate-x-1/2">
        {index}
      </h1>
      {icon === "plus" ? (
        <PlusIcon />
      ) : icon === "calendar" ? (
        <Calendar />
      ) : icon === "payment" ? (
        <PaymentIcon />
      ) : icon === "download" ? (
        <DownloadIcon />
      ) : icon === "notification" ? (
        <NotificationIcon />
      ) : (
        <ClipBoardIcon />
      )}
      <h1 className="text-2xl text-center font-[500] my-[1rem]">{title}</h1>
      <p className="text-[#555]">{description}</p>
    </section>
  );
}
