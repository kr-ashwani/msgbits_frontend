import { featuresContent } from "@/constant";
import Image from "next/image";

const Features = () => {
  return (
    <>
      <h2 className="text-center font-cousine text-xl font-bold leading-tight text-black md:text-2xl">
        Features For a Better Experience
      </h2>
      <div className="mx-1 grid gap-5 md:grid-cols-4">
        {featuresContent.map((elem, i) => (
          <div
            key={i}
            className="col-span-2 flex items-center gap-5 rounded-2xl bg-white p-5 pb-6 pt-6 md:max-w-lg"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                {elem.logo}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-cousine text-base font-bold leading-tight text-black">
                {elem.heading}
              </h3>
              <p className="text-sm leading-snug text-grey-400">{elem.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
