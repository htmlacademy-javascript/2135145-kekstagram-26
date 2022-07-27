import {renderThumbnails} from './thumbnails.js';
import {getPhotos} from './api.js';
import {debounce, showAlert} from './util.js';
import {setSwitchFiltersView, showFilters} from './filters.js';
import {hideSlider} from './image-effects.js';
import './form.js';

hideSlider();
getPhotos((photos) => {
  renderThumbnails(photos);
  setSwitchFiltersView(photos, debounce(renderThumbnails));
},
showAlert);
showFilters();


