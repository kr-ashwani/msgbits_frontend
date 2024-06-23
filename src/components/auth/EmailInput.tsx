import AuthUser from "/public/icons/AuthUser.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

const EmailInput = (props: { className?: string }) => {
  return (
    <label
      className={cn(
        `relative w-full rounded-full bg-white-200 px-12 py-3 text-base font-medium`,
        props.className,
      )}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Image width={25} src={AuthUser} alt="user icon"></Image>
      </span>
      <input
        placeholder="Email"
        className="bg-white-200 placeholder:text-slate-600 focus:outline-none"
        type="email"
        name=""
        id=""
      />
    </label>
  );
};

export default EmailInput;
