import Image from "next/image";
import Logo from "/public/assets/Logo.svg";
import Link from "next/link";
import NavigationButton from "../auth/NavigationButton";

const Header = (props: { nav: { label: string; link: string } }) => {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <div className="logo font-cousine">
        <Link href={"/"}>
          <Image width={150} src={Logo} alt="Msgbits logo" />
        </Link>
      </div>
      <nav>
        <NavigationButton nav={props.nav} />
      </nav>
    </header>
  );
};

export default Header;
