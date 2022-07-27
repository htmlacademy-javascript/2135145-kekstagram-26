const slider = document.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectInput = document.querySelector('.effect-level__value');

const Effects = {
  'chrome': {
    min: 0,
    max: 1,
    step: 0.1,
    className: 'effects__preview--chrome',
    useEffect: (val) => `grayscale(${val})`,
  },
  'sepia': {
    min: 0,
    max: 1,
    step: 0.1,
    className: 'effects__preview--sepia',
    useEffect: (val) =>`sepia(${val})`,
  },
  'marvin': {
    min: 1,
    max: 100,
    step: 1,
    className: 'effects__preview--marvin',
    useEffect: (val) =>`invert(${val}%)`,
  },
  'phobos': {
    min: 0,
    max: 3,
    step: 0.1,
    className: 'effects__preview--phobos',
    useEffect: (val) => `blur(${val}px)`,
  },
  'heat': {
    min: 1,
    max: 3,
    step: 0.1,
    className: 'effects__preview--heat',
    useEffect: (val) => `brightness(${val})`
  },
  'none': {
    useEffect: () => 'none',
  }
};

let currentEffect = 'none';

const hideSlider = () => slider.classList.add('visually-hidden');
const showSlider = () => slider.classList.remove('visually-hidden');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  format: {
    from: function (value) {
      return value;
    },
    to: function (value) {
      return Number.isInteger(value) ? value : value.toFixed(1);
    }
  }
});


const updateUISlider = (effect) => {
  if (currentEffect === 'none') {
    slider.noUiSlider.reset();
  } else {
    slider.noUiSlider.updateOptions({
      range: {
        min: effect.min,
        max: effect.max,
      },
      start: effect.max,
      step: effect.step,
    });
  }
};

slider.noUiSlider.on('update', () => {
  effectInput.value = slider.noUiSlider.get();
  imagePreview.style.filter = Effects[currentEffect].useEffect(effectInput.value);
});

effectsListElement.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  imagePreview.classList.remove(...imagePreview.classList);
  if (currentEffect === 'none') {
    hideSlider();
  } else {
    showSlider();
    imagePreview.classList.add(Effects[currentEffect].className);
  }
  updateUISlider(Effects[currentEffect]);
});

const resetEffects = () => {
  slider.noUiSlider.reset();
  hideSlider();
  imagePreview.classList.remove(...imagePreview.classList);
  imagePreview.style.filter = 'none';
};

export {hideSlider, resetEffects};
