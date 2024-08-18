export async function sleep(time: number) {
  return await new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, time)
  );
}
