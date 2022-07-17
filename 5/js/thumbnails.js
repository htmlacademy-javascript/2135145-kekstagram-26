import {generatePhotos} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const photos = generatePhotos();
const photosFragment = document.createDocumentFragment();

photos.forEach(({url, likes, comments}) =>  {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  photosFragment.append(picture);
});

picturesContainer.append(photosFragment);

