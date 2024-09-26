import { settingState } from "@/lib/store/features/chat/settingSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";

export class SettingState {
  private settingState: settingState;

  constructor(settingState: settingState) {
    this.settingState = settingState;
  }
  getTheme() {
    return this.settingState.theme;
  }
  getEnterToSendMsg() {
    return this.settingState.enterToSendMessage;
  }
}

const useSettingState = () => {
  const settingState = useAppSelector((state) => state.chat.setting);

  return useMemo(() => new SettingState(settingState), [settingState]);
};

export { useSettingState };
