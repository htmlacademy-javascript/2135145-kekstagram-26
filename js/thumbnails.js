import {generatePhotos} from './data.js';
import {setBigPicture} from './fullscreen.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const photos = generatePhotos();
const photosFragment = document.createDocumentFragment();

const setPictureClickListener = (picture, photo) => {
  picture.addEventListener('click', () => {
    setBigPicture(photo);
  });
};

photos.forEach((photo) =>  {
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  setPictureClickListener(picture, photo);
  photosFragment.append(picture);
});

picturesContainer.append(photosFragment);

