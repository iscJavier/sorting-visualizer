const sleep = (ms: number) => {
  return new Promise((_) => setTimeout(_, ms));
};
export default sleep;
