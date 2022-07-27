const BASE_URL = 'https://26.javascript.pages.academy/kekstagram';

const getPhotos = (onSuccess, onFail) => {
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .then((data) => onSuccess(data))
    .catch((err) => onFail(err));
};

const createPhoto = (onSuccess, onFail, body) => {
  fetch(BASE_URL, {
    method: 'POST',
    body
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  })
    .catch((err) => onFail(err));
};

export {getPhotos, createPhoto};
