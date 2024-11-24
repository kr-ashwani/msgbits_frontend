import Link from "next/link";
import NavigationButton from "../auth/NavigationButton";
import Svg from "../svg";

const Header = (props: { nav: { label: string; link: string } }) => {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <div className="logo font-cousine">
        <Link href={"/"} aria-label="msgbits">
          {Svg("Logo", { width: "150", height: "50" })}
        </Link>
      </div>
      <nav>
        <NavigationButton nav={props.nav} />
      </nav>
    </header>
  );
};

export default Header;
