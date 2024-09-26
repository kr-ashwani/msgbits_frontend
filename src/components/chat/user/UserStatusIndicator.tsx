import { useUserOnlineStatusState } from "@/hooks/AppSelector/useUserOnlineStatusState";
import { cn } from "@/lib/utils";
import React from "react";

const UserStatusIndicator = ({
  userId,
  indicatorClass,
}: {
  userId: string | null;
  indicatorClass?: string;
}) => {
  const userStatus = useUserOnlineStatusState();
  return (
    <div
      className={cn(
        `bg-user-online ${userStatus.getOnlineStatus(userId) ? "opacity-100" : "opacity-0"} absolute bottom-[0px] right-[10%] h-3 w-3 select-none rounded-full border-2 border-theme-bg-color transition-opacity duration-500`,
        indicatorClass,
      )}
    ></div>
  );
};

export default UserStatusIndicator;
