import { format } from "date-fns";
import { ExternalToast, ToastT, toast } from "sonner";

declare namespace toastFn {
  export var success: (
    message: string | React.ReactNode,
    data?: ExternalToast,
  ) => string | number;
  export var info: (
    message: string | React.ReactNode,
    data?: ExternalToast,
  ) => string | number;
  export var warning: (
    message: string | React.ReactNode,
    data?: ExternalToast,
  ) => string | number;
  export var error: (
    message: string | React.ReactNode,
    data?: ExternalToast,
  ) => string | number;
  export var custom: (
    jsx: (id: number | string) => React.ReactElement,
    data?: ExternalToast,
  ) => string | number;
  export var message: (
    message: string | React.ReactNode,
    data?: ExternalToast,
  ) => string | number;
  export var promise: <ToastData>(
    promise: PromiseT<ToastData>,
    data?: PromiseData<ToastData>,
  ) => string | number;
  export var dismiss: (id?: number | string) => string | number;
  export var loading: (
    message: string | React.ReactNode,
    data?: ExternalToast,
  ) => string | number;
  export var getHistory: () => (ToastT | ToastToDismiss)[];
}
function toastFn(
  message: string | React.ReactNode,
  data?: ExternalToast,
): string | number {
  return toast(message, {
    description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a"),
    ...data,
  });
}

function toastFnWithType(
  type: "success" | "info" | "error" | "warning" | "message" | "loading",
) {
  return (
    message: string | React.ReactNode,
    data?: ExternalToast,
  ): string | number => {
    return toast[type](message, {
      description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a"),
      ...data,
    });
  };
}

const toastDelegate = toastFn;

toastDelegate.success = toastFnWithType("success");
toastDelegate.info = toastFnWithType("info");
toastDelegate.error = toastFnWithType("error");
toastDelegate.warning = toastFnWithType("warning");
toastDelegate.message = toastFnWithType("message");
toastDelegate.loading = toastFnWithType("loading");
toastDelegate.getHistory = (): (ToastT | ToastToDismiss)[] => {
  return toast.getHistory();
};
toastDelegate.dismiss = (id?: number | string): string | number => {
  return toast.dismiss(id);
};
toastDelegate.custom;
toastDelegate.promise = <ToastData>(
  promise: PromiseT<ToastData>,
  data?: PromiseData<ToastData>,
): string | number => {
  return toast.promise(promise, {
    description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a"),
    ...data,
  });
};

export { toastDelegate };
