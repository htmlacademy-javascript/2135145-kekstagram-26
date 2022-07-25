import {isEscapeKey} from './util.js';

const page = document.querySelector('body');
const uploadFileInput = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const formOverlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashTagInput = form.querySelector('.text__hashtags');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentsInput = form.querySelector('.text__description');

const scaleContainer = document.querySelector('.scale');
const scaleSmallerButton = scaleContainer.querySelector('.scale__control--smaller');
const scaleBiggerButton = scaleContainer.querySelector('.scale__control--bigger');
const scaleInput = scaleContainer.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;


const onKeyPressed = (evt) => {
  if (evt.target.tagName === 'INPUT' || evt.target.tagName === 'TEXTAREA') {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

function closeForm() {
  formOverlay.classList.add('hidden');
  page.classList.remove('modal-open');
  uploadFileInput.value = '';
  document.removeEventListener('keydown', onKeyPressed);
  hashtagsInput.value = '';
  commentsInput.value = '';
}

function openForm() {
  formOverlay.classList.remove('hidden');
  page.classList.add('modal-open');
  document.addEventListener('keydown', onKeyPressed);
}

uploadFileInput.addEventListener('change', () => {
  openForm();
});

closeButton.addEventListener('click', () => {
  closeForm();
});

const zoom = (value) => {
  scaleInput.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

scaleBiggerButton.addEventListener('click', () => {
  let value = Number(scaleInput.value.slice(0, -1));
  if (value < MAX_SCALE_VALUE) {
    value += SCALE_STEP;
    zoom(value);
  }
});

scaleSmallerButton.addEventListener('click', () => {
  let value = Number(scaleInput.value.slice(0, -1));
  if (value > MIN_SCALE_VALUE) {
    value -= SCALE_STEP;
    zoom(value);
  }
});

const pristine = new Pristine(form,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
  }, false);

const validateHashTags = (value) => {
  const re = /^#[A-Za-zА-Яа-яЁё\d]{1-19}/;
  if (value !== undefined) {
    const hashTags = value.split(' ');
    return hashTags.length <= 5 && hashTags.every((tag) => re.test(tag));
  }
  return true;
};

pristine.addValidator(hashTagInput, validateHashTags, 'Введите до 5-ти хэштегов через пробел. Хэштег должен начинаться  с символа #');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
