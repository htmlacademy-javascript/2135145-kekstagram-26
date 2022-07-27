import {isEscapeKey} from './util.js';

const errorMessageTemplate = document.querySelector('#error')
  .content.querySelector('.error');

const errorMessage = errorMessageTemplate.cloneNode(true);
const submitButton = errorMessage.querySelector('.error__button');
const content = document.querySelector('body');

const onEscKeyPressed = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideErrorMessage();
  }
};

submitButton.addEventListener('click', hideErrorMessage);

errorMessage.addEventListener('click', (evt) =>{
  if(evt.target.classList.contains('error')) {
    hideErrorMessage();
  }
});

function hideErrorMessage() {
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeyPressed);
}

const showErrorMessage = () => {
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeyPressed);

};

content.append(errorMessage);
errorMessage.classList.add('hidden');


export {showErrorMessage};
