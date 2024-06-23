import LoginLogo from "/public/assets/Login.svg";
import Image from "next/image";
import LoginForm from "@/components/auth/AuthForm";
import OAuth from "@/components/auth/OAuth";

const Login = () => {
  return (
    <main className="my-16 font-roboSlab sm:my-8">
      <section className="flex flex-col px-4 pb-7 *:grow md:flex-row-reverse md:*:w-0">
        <div className="flex items-center justify-center">
          <Image
            className="px-5 sm:mt-[-15px] md:px-1"
            priority
            width={500}
            src={LoginLogo}
            alt="landing logo"
          />
        </div>
        <div className="flex flex-col items-center gap-10 pt-12 sm:gap-12">
          <OAuth />
          <div className="h-[1px] w-8/12 bg-slate-100 lg:w-1/2"></div>
          <LoginForm AuthType="Login" />
        </div>
      </section>
    </main>
  );
};

export default Login;
