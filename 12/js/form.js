import {isEscapeKey} from './util.js';
import {createPhoto} from './api.js';
import {showSuccessMessage} from './success-message.js';
import {showErrorMessage} from './error-message.js';
import {resetEffects} from './image-effects.js';
import {resetImageSettings} from './photo-edit.js';

const page = document.querySelector('body');
const uploadFileInput = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const formOverlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashTagInput = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const onKeyPressed = (evt) => {
  if (evt.target.tagName === 'INPUT' || evt.target.tagName === 'TEXTAREA') {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
    resetForm();
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
};

function resetForm(){
  form.reset();
  resetEffects();
  resetImageSettings();
}

function closeForm() {
  formOverlay.classList.add('hidden');
  page.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyPressed);
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
  resetForm();
});


const pristine = new Pristine(form,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
  }, false);

const validateHashTags = (value) => {
  const re = /^#[а-яА-ЯёЁa-zA-Z0-9]{1,19}$/;
  if (value !== undefined && value !== '') {
    const hashTags = value.split(' ');
    return hashTags.length <= 5 && hashTags.every((tag) => re.test(tag));
  }
  return true;
};

pristine.addValidator(hashTagInput, validateHashTags, 'Введите до 5-ти хэштегов через пробел. Хэштег должен начинаться  с символа #');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    createPhoto(() => {
      closeForm();
      resetForm();
      showSuccessMessage();
      enableSubmitButton();
    }, () => {
      closeForm();
      showErrorMessage();
      enableSubmitButton();
    }, new FormData(evt.target));
  }
});
