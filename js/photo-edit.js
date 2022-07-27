const scaleContainer = document.querySelector('.scale');
const scaleSmallerButton = scaleContainer.querySelector('.scale__control--smaller');
const scaleBiggerButton = scaleContainer.querySelector('.scale__control--bigger');
const scaleInput = scaleContainer.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const imageInput = document.querySelector('.img-upload__input');

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
});

const resetImageSettings = () => {
  scaleInput.value = '100%';
  imagePreview.style.transform = 'scale(100%})';
};

export {resetImageSettings};
