'use strict';
import {
  returnMainMarkerPosition
} from './map.js';
import {
  pullDataServer
} from './server.js';
import {
  resetAddressCoordinates
} from './map.js';
import{
  MARKER_START
} from './map.js';
const typeBuilding = document.querySelector('#type');
const cellPrice = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const formMain = document.querySelector('.ad-form');
const adPromo = document.querySelector('.promo');
const adSuccessTemplate = document.querySelector('#success').content;
const adSuccess = adSuccessTemplate.querySelector('.success');
const success = adSuccess.cloneNode(true);
const adErrorTemplate = document.querySelector('#error').content;
const adErrorMessage = adErrorTemplate.querySelector('.error');
const error = adErrorMessage.cloneNode(true);
const adButtonClose = error.querySelector('.error__button');
const adClearButton = document.querySelector('.ad-form__reset');

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const onTypeBuldingChange = function () {
  const price = minPrice[this.value];
  cellPrice.setAttribute('min', price);
  cellPrice.setAttribute('placeholder', price)
};

const onTimeInChange = function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
};

const onTimeOutChange = function () {
  timeIn.selectedIndex = timeOut.selectedIndex;
};


// listeners CheckIn, CheckOut
typeBuilding.addEventListener('change', onTypeBuldingChange);
timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

// Close up
const onCloseModalWindow = function (element) {
  document.addEventListener('click', () => {
    removeWindowMessage(element);
  });
};

// Remove DOM elements
const removeWindowMessage = function (element) {
  element.remove();
};

//ESC keydown
const onCloseModalWindowEsc = function (element) {
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      removeWindowMessage(element);
    }
  });
};

// Show message successful, then close
const showSuccessfulMessage = function (element) {
  adPromo.insertAdjacentElement('beforebegin', element);
  onCloseModalWindow(success);
  onCloseModalWindowEsc(success);

};

// Error listener
const onCloseButtonErrorMesage = () => {
  adButtonClose.addEventListener('click', () => {
    removeWindowMessage(error);
  });
};

// Error message
const showErrorMessage = function (element) {
  adPromo.insertAdjacentElement('beforebegin', element);
  onCloseModalWindow(error);
  onCloseModalWindowEsc(error);
  onCloseButtonErrorMesage();

};

// Clear form
adClearButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formMain.reset();
  returnMainMarkerPosition();
  resetAddressCoordinates();
});

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw Error('Произошла ошибка при отправке данных на сервер');
  }
};

// Submit form
formMain.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  pullDataServer(formData)
    .then(checkStatus)
    .then(() => formMain.reset())
    .then(() => returnMainMarkerPosition(MARKER_START))
    .then(() => showSuccessfulMessage(success))
    .catch(() => showErrorMessage(error))
});
