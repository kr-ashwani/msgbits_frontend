import React from "react";
import Slider from "@/components/utility/Slider";
import { Dialog } from "@/components/utility/Dialog";
import { ChatSvg } from "@/components/svg/chatSvg";
import { useSettingState } from "@/hooks/AppSelector/useSettingState";
import { useChatRoomDataDispatch } from "@/hooks/AppDispatcher/useChatRoomDataDispatch";
import { Switch } from "@/components/ui/switch";
import { fetchData } from "@/utils/custom/customFetch";
import { serverResWapperSchema } from "@/schema/ServerResWrapperSchema";
import { resetUser } from "@/lib/store/features/auth/authSlice";
import { toast } from "@/utils/toast/Toast";
import { z } from "zod";

export type ThemeType = {
  color: "blue" | "purple" | "green" | "orange";
  hexCode: string;
};

const theme: ThemeType[] = [
  {
    color: "blue",
    hexCode: "#0086ff",
  },
  {
    color: "purple",
    hexCode: "#9f7aea",
  },
  {
    color: "green",
    hexCode: "#38b2ac",
  },
  {
    color: "orange",
    hexCode: "#ed8936",
  },
];

const Setting = ({ name }: { name: string }) => {
  const settingState = useSettingState();
  const chatRoomDataDispatch = useChatRoomDataDispatch();

  const handleThemeChange = (themeParam: ThemeType["color"]) => {
    chatRoomDataDispatch.updateTheme(themeParam);
  };

  const handleLogout = async () => {
    const response = await fetchData(
      "/logout",
      serverResWapperSchema(z.string()),
    );
    //reset chat user Data
    chatRoomDataDispatch.resetChatData();

    if (response.success) {
      toast.success(response.payload.data);
      chatRoomDataDispatch.getDispatch()(resetUser());
    } else toast.error(response.error);
  };

  const handleEnterToSendMsg = (checked: boolean) => {
    localStorage.setItem("sendEnterToMsg", String(checked));
    chatRoomDataDispatch.setEnterToSendMsg(checked);
  };
  return (
    <Slider heading="Setting" name={name} className="h-full overflow-y-auto">
      <div className="text-[15px] font-medium text-msg-message">
        <div className="flex w-full cursor-pointer select-none items-center gap-5 px-4 py-4 hover:bg-msg-hover-bg focus:bg-msg-hover-bg">
          <div className="grow">Change Theme</div>
          <div className="flex gap-1">
            {theme.map((elem) => (
              <div key={elem.hexCode} className="relative">
                <div
                  onClick={() => handleThemeChange(elem.color)}
                  className={`h-[18px] w-[18px] rounded-full`}
                  data-color={elem.color}
                  style={{
                    backgroundColor: elem.hexCode,
                  }}
                ></div>
                {settingState.getTheme() === elem.color ? (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    {ChatSvg("checkIcon", {
                      width: "10px",
                      height: "10px",
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full cursor-pointer select-none items-center gap-5 px-4 py-4 hover:bg-msg-hover-bg focus:bg-msg-hover-bg">
          <div className="grow">Enter to send message</div>
          <Switch
            checked={settingState.getEnterToSendMsg()}
            onCheckedChange={handleEnterToSendMsg}
            className="theme-color-Animation"
          />
        </div>
      </div>
      <div className="pt-3">
        <Dialog
          title="Confirm Logout"
          description={`Are you sure you want to log out of your account?`}
          onConfirm={handleLogout}
          cancelButtonText="Stay Logged In"
          confirmButtonText="Log Out"
          confirmClassName="bg-alert-red-500"
        >
          <div className="flex cursor-pointer gap-4 px-4 py-4 text-alert-red-500 hover:bg-msg-hover-bg">
            {ChatSvg("exitIcon")}
            <p className="font-semibold">Log Out</p>
          </div>
        </Dialog>
      </div>
    </Slider>
  );
};

export default Setting;
