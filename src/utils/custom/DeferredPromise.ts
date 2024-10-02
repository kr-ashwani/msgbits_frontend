export function DeferredPromise<T>() {
  let resolveFunc: (value: T | PromiseLike<T>) => void;
  let rejectFunc: (reason?: any) => void;

  const promise = new Promise<T>((resolve, reject) => {
    resolveFunc = resolve;
    rejectFunc = reject;
  });

  return {
    promise,
    resolve: (value: T | PromiseLike<T>) => resolveFunc(value),
    reject: (reason?: any) => rejectFunc(reason),
  };
}
