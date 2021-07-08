const randomIntArray = (length: number = 20) => {
  const min = 5;
  const max = 100;
  return Array.from({ length: length }, () => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  });
};

export { randomIntArray };
