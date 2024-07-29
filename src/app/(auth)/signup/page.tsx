import AuthForm from "@/components/auth/AuthForm";
import OAuth from "@/components/auth/OAuth";
import Svg from "@/components/svg";

const Signup = () => {
  return (
    <main className="my-10 font-roboSlab sm:my-6">
      <section className="flex flex-col px-4 pb-7 *:grow md:flex-row-reverse md:*:w-0">
        <div className="flex items-center justify-center">
          {Svg("Signup", { width: "450", height: "400" })}
        </div>
        <div className="flex flex-col items-center gap-10 pt-6 sm:gap-10">
          <OAuth />
          <div className="h-[1px] w-8/12 bg-slate-100 lg:w-1/2"></div>
          <AuthForm AuthType="Signup" />
        </div>
      </section>
    </main>
  );
};

export default Signup;
