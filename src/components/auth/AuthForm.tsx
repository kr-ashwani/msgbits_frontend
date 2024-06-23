import Link from "next/link";
import PasswordInput from "./PasswordInput";
import Button from "../Button";
import EmailInput from "./EmailInput";

const LoginForm = (props: { AuthType: "Login" | "Signup" }) => {
  const nextAuth = props.AuthType === "Login" ? "Signup" : "Login";
  return (
    <div className="flex w-full max-w-sm flex-col gap-10 px-5 font-montserrat sm:px-1">
      <EmailInput />
      <PasswordInput />
      {props.AuthType === "Signup" ? (
        <PasswordInput placeholder="Confirm Password" />
      ) : null}

      <Link
        className="mb-[-15px] text-right font-roboSlab font-medium text-yellow-600"
        href={"/forgotpassword"}
      >
        Forget Password?
      </Link>
      <Button className="mx-16 mb-[-20px]" navigateTo="#">
        {props.AuthType}
      </Button>
      <p className="text-center font-roboSlab">
        Already have an Account?{" "}
        <Link
          className="pl-2 font-medium text-yellow-600"
          href={`/${nextAuth.toLocaleLowerCase()}`}
        >
          {nextAuth}
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
