import Image from "next/image";
import Logo from "/public/assets/Logo.svg";
import Button from "./Button";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <div className="logo font-cousine">
        <Image width={150} src={Logo} alt="Msgbits logo" />
      </div>
      <nav>
        <Button navigateTo="/login">Login</Button>
      </nav>
    </header>
  );
};

export default Header;
