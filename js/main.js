const getRandomFromRange = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const checkTextLength = (text, maxLength) => text.length <= maxLength;

getRandomFromRange(1, 5);
checkTextLength('text', 5);
