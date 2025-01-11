import { footerLinks, socialMedia } from "@/constant";
import Link from "next/link";
import Svg from "../svg";

const Footer = () => {
  return (
    <footer className="mb-6 px-4 pt-10">
      <div className="flex items-start justify-between gap-8 max-sm:flex-col md:gap-10">
        <div className="flex flex-col items-start gap-1">
          <Link href="/" aria-label="msgbits">
            {Svg("Logo", { width: "120", height: "50" })}
          </Link>
          <p className="text-white-400 font-montserrat text-base leading-7 sm:max-w-sm">
            Made with ❤️ by <span className="font-bold">Ashwani</span>
          </p>
          <div className="flex items-center gap-1">
            {socialMedia.map((icon) => (
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                key={icon.alt}
              >
                <Link href={icon.link} target="new" aria-label={icon.alt}>
                  {icon.src}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grow grid-cols-2 gap-5 gap-y-6 md:grid-cols-4 lg:grid-cols-3">
          {footerLinks.map((section) => (
            <div
              key={section.title}
              className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1"
            >
              <h3 className="mb-1 font-cousine text-2xl font-semibold leading-normal">
                {section.title}
              </h3>
              <ul>
                {section.links.map((link) => (
                  <li
                    className="text-white-400 mt-3 font-montserrat text-sm leading-normal hover:text-slate-gray"
                    key={link.name}
                  >
                    <Link
                      href={link.link}
                      aria-label={link.name}
                      target="_blank"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="text-white-400 mt-16 flex justify-between max-sm:flex-col max-sm:items-center">
        <div className="flex flex-1 cursor-pointer items-center justify-start gap-2 font-montserrat">
          {Svg("CopyrightSign", {
            width: "15",
            height: "15",
          })}
          <p>Copyright. All rights reserved.</p>
        </div>
        <p className="cursor-pointer font-montserrat">Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;
