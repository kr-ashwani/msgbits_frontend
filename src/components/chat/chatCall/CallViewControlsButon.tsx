import { LucideIcon } from "lucide-react";
import React from "react";

export interface ControlButtonProps {
  isOn: boolean;
  onClick: () => void;
  activeIcon: LucideIcon;
  inactiveIcon: LucideIcon;
}

const CallViewControlsButon: React.FC<ControlButtonProps> = ({
  isOn,
  onClick,
  activeIcon: ActiveIcon,
  inactiveIcon: InactiveIcon,
}) => (
  <button
    onClick={onClick}
    className={`flex h-12 w-12 transform items-center justify-center rounded-full active:scale-95 ${
      isOn
        ? "bg-gray-100 hover:bg-gray-200 hover:shadow-lg"
        : "bg-red-100 hover:bg-red-200 hover:shadow-lg"
    } `}
  >
    {isOn ? (
      <ActiveIcon className="text-gray-700 h-6 w-6" />
    ) : (
      <InactiveIcon className="h-6 w-6 text-red-500" />
    )}
  </button>
);

export default CallViewControlsButon;
