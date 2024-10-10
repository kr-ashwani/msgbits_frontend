import { toast } from "../toast/Toast";

export const debug = (
  type: "error" | "success" | "warning",
  message: string,
) => {
  if (process.env.NODE_ENV === "development") {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
  }
};
