export const sleep = async (time: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, time);
  });
};
