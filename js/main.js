import {renderThumbnails} from './thumbnails.js';
import {getPhotos} from './api.js';
import {debounce, showAlert} from './util.js';
import './form.js';
import './image-effects.js';
import {setSwitchFiltersView, showFilters} from './filters.js';

getPhotos((photos) => {
  renderThumbnails(photos);
  setSwitchFiltersView(photos, debounce(renderThumbnails));
},
showAlert);
showFilters();


