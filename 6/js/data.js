import {getRandomFromRange, getRandomFromArray, getRandomIdFromRange} from './util.js';

const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 500;

const DESCRIPTIONS =  [
  'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
  'Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. ',
  'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
  'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.',
  'It wasn\'t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.',
  'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.',
  'The European languages are members of the same family. Their separate existence is a myth.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Ivan',
  'Oleg',
  'Timofey',
  'Darya',
  'Masha',
  'Lera',
  'Lena'
];

const generateMessage = () => Array.from({length: getRandomFromRange(1, 2)},
  () => getRandomFromArray(MESSAGES)).join(' ');

const commentIdGenerator = getRandomIdFromRange(1, COMMENTS_COUNT);

const createComment = () => ({
  id: commentIdGenerator(),
  avatar: `img/avatar-${getRandomFromRange(1, 6)}.svg`,
  message: generateMessage(),
  name: getRandomFromArray(NAMES),
});

const generateComments = () => Array.from({length: getRandomFromRange(1, 3)}, createComment);

const createPhotoDescription = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomFromArray(DESCRIPTIONS),
  likes: getRandomFromRange(15, 200),
  comments: generateComments(),
});

const generatePhotos = () =>
  Array.from({length: PHOTOS_COUNT},
    (element, i) => createPhotoDescription(i + 1));

export {generatePhotos};
