import {isEscapeKey} from './util.js';

const errorMessageTemplate = document.querySelector('#error')
  .content.querySelector('.error');

const errorMessage = errorMessageTemplate.cloneNode(true);
const submitButton = errorMessage.querySelector('.error__button');
const content = document.querySelector('body');

errorMessage.style.zIndex = '100';

const onEscKeyPressed = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessagePopup();
  }
};

submitButton.addEventListener('click', closeErrorMessagePopup);

errorMessage.addEventListener('click', (evt) =>{
  if(evt.target.classList.contains('error')) {
    closeErrorMessagePopup();
  }
});

function closeErrorMessagePopup() {
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeyPressed);
}

const openErrorMessagePopup = () => {
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeyPressed);

};

content.append(errorMessage);
errorMessage.classList.add('hidden');


export {openErrorMessagePopup};
