const page = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img img');
const likesCounter = bigPicture.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const descriptionElement = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const handleClosePopup = () => {
  bigPicture.classList.add('hidden');
  page.classList.remove('modal-open');
};

document.addEventListener('keydown', (evt) => {
  if(evt.key==='Escape') {
    handleClosePopup();
  }
});

closeButton.addEventListener('click', () => {
  handleClosePopup();
});

const addComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);
    const picture = commentElement.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    commentsFragment.append(commentElement);
  });
  commentsContainer.innerHTML='';
  commentsContainer.append(commentsFragment);
};

const setBigPicture = ({url, description, likes, comments}) => {
  bigPicture.classList.remove('hidden');
  image.src = url;
  image.alt = description;
  likesCounter.textContent = likes;
  descriptionElement.textContent = description;
  addComments(comments);
  page.classList.add('modal-open');
};

export { setBigPicture };

