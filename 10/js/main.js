import {renderThumbnails} from './thumbnails.js';
import {getPhotos} from './api.js';
import {showAlert} from './util.js';
import './form.js';
import './image-effects.js';

getPhotos(renderThumbnails, showAlert);


