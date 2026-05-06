import { FeatureContent } from "@/validators/featureContent.validator";
import clsx from "clsx";
import ClipBoardIcon from "../icons/ClipBoardIcon";
import Calendar from "../icons/CalendarIcon";
import PaymentIcon from "../icons/PaymentIcon";
import UserGroupIcon from "../icons/UserGroupIcon";

export default function Feature({ icon, title, description }: FeatureContent) {
  return (
    <section
      className={clsx(
        "p-[2rem] rounded-[20px] bg-white border border-transparent hover:border-gray-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300",
      )}
    >
      <section>
        {icon === "clip" ? (
          <ClipBoardIcon />
        ) : icon === "calendar" ? (
          <Calendar />
        ) : icon === "payment" ? (
          <PaymentIcon />
        ) : (
          <UserGroupIcon />
        )}
        <h1 className={clsx("text-xl font-[500] my-[1rem]")}>{title}</h1>
        <p className={clsx("text-xl text-[#555]")}>{description}</p>
      </section>
    </section>
  );
}
