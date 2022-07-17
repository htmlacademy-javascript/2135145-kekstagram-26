const getRandomFromRange = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomFromArray = (array) => {
  const index = getRandomFromRange(0, array.length -1);
  return array[index];
};

const getRandomIdFromRange = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomFromRange(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomFromRange(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const checkTextLength = (text, maxLength) => text.length <= maxLength;
checkTextLength('text', 5);

export {getRandomFromRange, getRandomFromArray, getRandomIdFromRange};
