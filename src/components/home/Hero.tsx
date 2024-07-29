import Svg from "../svg";
import Button from "../utility/Button";

const Hero = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        {Svg("ChattingLogo", { width: "300", height: "400" })}
      </div>
      <div className="ml-3 flex items-center">
        <div className="flex max-w-[400px] flex-col gap-7">
          <h1 className="font-cousine text-[2.1rem] font-bold leading-tight text-black">
            Helps to Connect with your Friends in Real Time
          </h1>
          <p className="text-base leading-tight text-grey-400">
            Great software that allows you to chat from any place at any time
            without interruption.
          </p>
          <Button
            navigateTo="/chat"
            className="btn-primary mt-4 flex w-max items-center gap-3"
          >
            <p>Start Chatting Now</p>
            {Svg("ArrorRight")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
