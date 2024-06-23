import Button from "../Button";

const Subscribe = () => {
  return (
    <section
      id="contact-us"
      className="max-container my-5 flex items-center justify-between gap-10 max-lg:flex-col"
    >
      <h2 className="text-center font-cousine text-xl font-bold leading-tight text-black md:text-2xl">
        Sign Up for
        <span className="text-yellow-600"> Updates </span>& Newsletter
      </h2>
      <div className="flex w-full items-center gap-2 rounded-full border border-slate-gray p-2.5 lg:max-w-[40%]">
        <input
          type="text"
          placeholder="subscribe@msgbits.com"
          className="w-full flex-1 pl-2 text-base leading-normal text-slate-gray outline-none max-sm:rounded-full sm:border-none md:pl-5"
        />
        <div className="flex items-center justify-self-end">
          <Button>Sign Up</Button>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
