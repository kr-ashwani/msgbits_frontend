import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";
import { useEffect } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

const useDisplayFormError = <T extends FieldValues>(errors: FieldErrors<T>) => {
  useEffect(() => {
    if (Object.keys(errors).length) {
      let errStr = "";
      Object.values(errors).forEach(
        (err) =>
          (errStr = errStr.concat(err?.message?.toString() || "").concat("; ")),
      );
      toastDelegate.error(`Validation Error: ${errStr}`);
    }
  }, [errors]);
  return null;
};

export default useDisplayFormError;
