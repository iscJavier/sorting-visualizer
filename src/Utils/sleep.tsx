const sleep = (ms: number = 20) => {
  return new Promise((_) => setTimeout(_, ms));
};

export default sleep;
