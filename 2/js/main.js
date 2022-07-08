const getRandomFromRange = (from, to) => {
  if (from < 0 || to <= from) {
    return;
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from)) + from;
};

const checkTextLength = (text, maxLength) => {
  if (maxLength < 0) { return;}
  return text.length <= maxLength;
};

getRandomFromRange(1, 5);
checkTextLength('text', 5);
