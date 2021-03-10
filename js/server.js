'use strict';
import {addOtherPins} from './map.js';
const SERVER_DATA = 'https://22.javascript.pages.academy/keksobooking/data';
const SERVER_POST = 'https://22.javascript.pages.academy/keksobooking';
const displayErrorMessage = () =>{
  const promo = document.querySelector('.map__canvas');
  const divError = document.createElement('div');
  divError.innerHTML = 'Во время загрузки объявлений произошла ошибка. Пожалуйста перезагрузите страницу!';
  divError.classList.add('throw-error');
  promo.insertAdjacentElement('beforebegin', divError);
  setTimeout(function() {
    divError.remove()
  }, 3000)
};

const checkServerStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    displayErrorMessage();
    const {statusText, status} = response;
    throw new Error (`${status} - ${statusText}`);
  }
};

fetch(SERVER_DATA)
  .then(checkServerStatus)
  .then((response) => response.json())
  .then(addOtherPins)
  .catch((error) => (error));

const pullDataServer = (formData) => {
  return fetch(SERVER_POST,
    {
      method: 'POST',
      body: formData,
    })
};
export {pullDataServer, checkServerStatus };
