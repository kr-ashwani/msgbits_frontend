import Image from "next/image";
import Logo from "/public/assets/Logo.svg";
import Button from "./Button";
import Link from "next/link";

const Header = (props: { nav: { label: string; link: string } }) => {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <div className="logo font-cousine">
        <Link href={"/"}>
          <Image width={150} src={Logo} alt="Msgbits logo" />
        </Link>
      </div>
      <nav>
        <Button navigateTo={props.nav.link}>{props.nav.label}</Button>
      </nav>
    </header>
  );
};

export default Header;
