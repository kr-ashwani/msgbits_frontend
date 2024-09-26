import { ThemeType } from "@/components/chat/user/Setting";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface settingState {
  theme: ThemeType["color"];
  enterToSendMessage: boolean;
}
const initialState: settingState = {
  theme: "blue",
  enterToSendMessage: false,
};

export const settingSlice = createSlice({
  name: "Setting",
  initialState,
  reducers: {
    updateTheme(state, action: PayloadAction<string>) {
      let theme: ThemeType["color"] | null = null;

      switch (action.payload) {
        case "blue":
          theme = "blue";
          break;
        case "purple":
          theme = "purple";
          break;
        case "green":
          theme = "green";
          break;
        case "orange":
          theme = "orange";
          break;
      }
      if (theme) state.theme = theme;
    },
    setEnterToSendMsg(state, action: PayloadAction<boolean>) {
      state.enterToSendMessage = action.payload;
    },
  },
});

export const { updateTheme, setEnterToSendMsg } = settingSlice.actions;

export default settingSlice.reducer;
