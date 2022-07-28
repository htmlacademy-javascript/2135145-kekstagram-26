import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success')
  .content.querySelector('.success');

const successMessage = successMessageTemplate.cloneNode(true);
const submitButton = successMessage.querySelector('.success__button');
const content = document.querySelector('body');

const onEscKeyPressed = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessagePopup();
  }
};

submitButton.addEventListener('click', closeSuccessMessagePopup);

successMessage.addEventListener('click', (evt) =>{
  if(evt.target.classList.contains('success')) {
    closeSuccessMessagePopup();
  }
});

function closeSuccessMessagePopup() {
  successMessage.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeyPressed);
}

const openSuccessMessagePopup = () => {
  successMessage.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeyPressed);

};

content.append(successMessage);
successMessage.classList.add('hidden');


export {openSuccessMessagePopup};
