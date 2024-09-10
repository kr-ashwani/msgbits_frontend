import React, { useMemo } from "react";
import Picker from "@emoji-mart/react";
import appleData from "@emoji-mart/data/sets/14/apple.json";
import googleData from "@emoji-mart/data/sets/14/google.json";
import twitterData from "@emoji-mart/data/sets/14/twitter.json";
import facebookData from "@emoji-mart/data/sets/14/facebook.json";

type EmojiSet = "native" | "apple" | "google" | "twitter" | "facebook";
type SkinTone = 1 | 2 | 3 | 4 | 5 | 6;
type Theme = "light" | "dark" | "auto";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: { native: string }) => void;
  onClickOutside?: () => void;
  onSkinToneChange?: (skinTone: SkinTone) => void;
  perLine?: number;
  emojiSize?: number;
  maxFrequentRows?: number;
  set?: EmojiSet | "auto";
  theme?: Theme;
  skinTone?: SkinTone;
  defaultSkinTone?: SkinTone;
  emojiButtonSize?: number;
  sheetSize?: 16 | 20 | 32 | 64;
  emoji?: string;
  categories?: string[];
  custom?: any[];
  i18n?: any;
  native?: boolean;
  autoFocus?: boolean;
  skinTonePosition?: "none" | "search" | "preview";
  previewPosition?: "none" | "top" | "bottom";
  searchPosition?: "none" | "top" | "bottom";
  include?: string[];
  exclude?: string[];
  recent?: string[];
  recentsLimit?: number;
  showPreview?: boolean;
  showSkinTones?: boolean;
  emojiTooltip?: boolean;
  defaultKeyword?: string;
  noResultsEmoji?: string;
  noIndex?: boolean;
  maxResults?: number;
  enableFrequentEmojiSort?: boolean;
  icons?: "auto" | "outline" | "solid";
}

const emojiData = {
  apple: appleData,
  google: googleData,
  twitter: twitterData,
  facebook: facebookData,
};

const EmojiPicker: React.FC<EmojiPickerProps> = React.memo(
  ({
    onEmojiSelect,
    onClickOutside,
    onSkinToneChange,
    set = "apple",
    ...otherProps
  }) => {
    const pickerProps = useMemo(() => {
      return Object.fromEntries(
        Object.entries(otherProps).filter(([_, value]) => value !== undefined),
      );
    }, [otherProps]);

    const pickerData = useMemo(() => {
      if (set === "native" || set === "auto") {
        return undefined; // Use default data for native and auto
      }
      return emojiData[set] || appleData; // Fallback to Apple if set is not found
    }, [set]);

    return (
      <div className="emoji-picker">
        <Picker
          data={pickerData}
          set={set}
          onEmojiSelect={onEmojiSelect}
          onClickOutside={onClickOutside}
          onSkinToneChange={onSkinToneChange}
          {...pickerProps}
        />
      </div>
    );
  },
);

EmojiPicker.displayName = "EmojiPicker";

export default EmojiPicker;
