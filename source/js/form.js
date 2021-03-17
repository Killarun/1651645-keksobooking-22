'use strict';
import {
  returnMainMarkerPosition,
  resetAddressCoordinates,
  MARKER_START
} from './map.js';
import {
  pullDataServer
} from './server.js';

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
  'flat': {
    ruLabel: 'Квартира',
    price: 1000,
  },
  'bungalow': {
    ruLabel: 'Бунгало',
    price: 0,
  },
  'house': {
    ruLabel: 'Дом',
    price: 5000,
  },
  'palace': {
    ruLabel: 'Дворец',
    price: 10000,
  },
};


const onTypeBuldingChange = () => {
  const apartmentPrice = minPrice[type.value].price
  cellPrice.min = apartmentPrice;
  cellPrice.placeholder = apartmentPrice;
}

const onTimeInChange = () => {
  timeOut.selectedIndex = timeIn.selectedIndex;
};

const onTimeOutChange = () => {
  timeIn.selectedIndex = timeOut.selectedIndex;
};

typeBuilding.addEventListener('change', onTypeBuldingChange);
timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

const onCloseModalWindow = (element) => {
  document.addEventListener('click', () => {
    removeWindowMessage(element);
    removeEventListener('click', onCloseModalWindow);
  });
};

const removeWindowMessage = (element) => {
  element.remove();
};

const onCloseModalWindowEsc = (element) => {
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      removeWindowMessage(element);
      removeEventListener('keydown', onCloseModalWindowEsc);
    }
  });
};

const showMessageResult = (element) => {
  adPromo.insertAdjacentElement('beforebegin', element);
  onCloseModalWindow(element);
  onCloseModalWindowEsc(element);
};

const onCloseButtonErrorMessage = () => {
  adButtonClose.addEventListener('click', () => {
    removeWindowMessage(error);
    removeEventListener('click', onCloseButtonErrorMessage);
  });
};

adClearButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formMain.reset();
  returnMainMarkerPosition(MARKER_START);
  resetAddressCoordinates();
});

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw Error('При отправке данных на сервер произошла ошибка');
  }
};

formMain.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  pullDataServer(formData)
    .then(checkStatus)
    .then(() => formMain.reset())
    .then(() => returnMainMarkerPosition(MARKER_START))
    .then(() => showMessageResult(success))
    .catch(() => {
      showMessageResult(error)
      onCloseButtonErrorMessage()
    })
});
