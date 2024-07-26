import { toastDelegate } from "../toastDelegate/ToastDelegate";

export const debug = (
  type: "error" | "success" | "warning",
  message: string,
) => {
  if (process.env.NODE_ENV === "development") {
    if (type === "success") toastDelegate.success(message);
    else if (type === "error") toastDelegate.error(message);
    else if (type === "warning") toastDelegate.warning(message);
  }
};
