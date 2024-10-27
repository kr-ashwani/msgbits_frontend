import { toast } from "@/utils/toast/Toast";
import { CallManager } from "./CallManager";

// Decorator types
type MethodDecorator = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor;

// Validation decorators
function requiresNoCallSession(
  errorMessage: string = "Call session already exists",
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: CallManager, ...args: any[]) {
      if (this.getSession()) toast.error(errorMessage);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
function requiresCallSession(
  errorMessage: string = "No active call session",
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: CallManager, ...args: any[]) {
      if (!this.getSession()) toast.error(errorMessage);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

// Method decorator factory that accepts custom error message
function handleError(errorMessage?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        toast.error(
          errorMessage +
            `${error instanceof Error && process.env.NODE_ENV === "development" ? ` because ${error.message}` : ""}`,
        );
      }
    };

    return descriptor;
  };
}

export { requiresCallSession, requiresNoCallSession, handleError };
