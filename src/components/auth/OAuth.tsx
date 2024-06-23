import Link from "next/link";
import AuthFacebook from "/public/icons/AuthFacebook.svg";
import AuthGithub from "/public/icons/AuthGithub.svg";
import AuthGoogle from "/public/icons/AuthGoogle.svg";
import Image from "next/image";

const OAuth = () => {
  return (
    <div className="flex items-center gap-10 sm:gap-12">
      <Link href={"#"}>
        <Image width={47} src={AuthGoogle} alt="google icon"></Image>
      </Link>
      <Link href={"#"}>
        <Image width={53} src={AuthFacebook} alt="google icon"></Image>
      </Link>
      <Link href={"#"}>
        <Image width={50} src={AuthGithub} alt="google icon"></Image>
      </Link>
    </div>
  );
};

export default OAuth;
