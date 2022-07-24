import {isEscapeKey} from './util.js';

const page = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img img');
const likesCounter = bigPicture.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const descriptionElement = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const totalCommentsCountElement = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsLoadedElement = bigPicture.querySelector('.comments-loaded');

const COMMENTS_PATCH = 5;

const onEscapePressed = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function closePopup() {
  bigPicture.classList.add('hidden');
  page.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapePressed);
}

closeButton.addEventListener('click', () => {
  closePopup();
});

const loadComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);
    const picture = commentElement.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsFragment.append(commentElement);
  });
  commentsContainer.append(commentsFragment);
};

const getLastShownCommentIndex = (lastValue, comments) => comments.length < COMMENTS_PATCH + lastValue ? comments.length : COMMENTS_PATCH + lastValue ;

const setBigPicture = ({url, description, likes, comments}) => {
  bigPicture.classList.remove('hidden');
  page.classList.add('modal-open');
  document.addEventListener('keydown', onEscapePressed);
  image.src = url;
  image.alt = description;
  likesCounter.textContent = likes;
  descriptionElement.textContent = description;
  let firstInd = 0;
  let lastInd = getLastShownCommentIndex(firstInd, comments);
  commentsContainer.innerHTML='';
  loadComments(comments.slice(firstInd, lastInd));
  commentsLoadedElement.textContent = lastInd;
  commentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();
    firstInd += COMMENTS_PATCH;
    lastInd = getLastShownCommentIndex(lastInd, comments);
    loadComments(comments.slice(firstInd, lastInd));
    commentsLoadedElement.textContent = lastInd;
  });
  totalCommentsCountElement.textContent = comments.length;
};


export { setBigPicture };

