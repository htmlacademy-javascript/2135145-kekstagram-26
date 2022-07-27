import { getRandomFromArray} from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultSortButton = filtersElement.querySelector('#filter-default');
const randomSortButton = filtersElement.querySelector('#filter-random');
const discussedSortButton = filtersElement.querySelector('#filter-discussed');

const RANDOM_PHOTOS_COUNT = 10;

const resetActiveButton = () => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
};

const setActiveButton = (button) => {
  button.classList.add('img-filters__button--active');
};

const sorterByCommentsCount = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const setSwitchFiltersView = (photos, cb) => {
  let photosToRender;
  filtersElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      resetActiveButton();
      if(evt.target.id === 'filter-default') {
        setActiveButton(defaultSortButton);
        photosToRender = photos;
      }
      if(evt.target.id === 'filter-random') {
        setActiveButton(randomSortButton);
        photosToRender = Array.from({length: RANDOM_PHOTOS_COUNT},
          () => getRandomFromArray(photos));
      }
      if(evt.target.id === 'filter-discussed') {
        setActiveButton(discussedSortButton);
        photosToRender = photos.slice().sort(sorterByCommentsCount);
      }
      cb(photosToRender);
    }
  });
};

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

export {showFilters, setSwitchFiltersView};
