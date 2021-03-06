'use strict';
const GUESTS_WORD_FORMS = [
  'гостя',
  'гостей',
  'гостей',
];
const ROOMS_WORD_FORMS = [
  'комната',
  'комнаты',
  'комнат',
];
const TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};


const popupTemplate = document.querySelector('#card').content.querySelector('.popup');


const getWordForm = (num, wordForms) => {
  if (num > 1 && num < 5) {

    return wordForms[1];
  }

  if (num === 1) {

    return wordForms[0];
  }

  return wordForms[2];
};

const getPhotos  = (container, photos) => {
  if (!photos.length) {
    return container.remove();
  }
  container.innerHTML = photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    .join('\n');
};

const getFeatures = (container, features) => {
  if (!features.length) {
    return container.remove();
  }
  container.innerHTML = features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
    .join('\n');
};


const generatePopup = (adData) => {
  const popup = popupTemplate.cloneNode(true);
  popup.querySelector('.popup__avatar').src = adData.author.avatar;
  popup.querySelector('.popup__title').textContent = adData.offer.title;
  popup.querySelector('.popup__text--address').textContent = adData.offer.address;
  popup.querySelector('.popup__text--price').innerHTML = `${adData.offer.price} <span>₽/ночь</span>`;
  popup.querySelector('.popup__type').textContent = TYPES[adData.offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${adData.offer.rooms} ${getWordForm(adData.offer.rooms, ROOMS_WORD_FORMS)} для ${adData.offer.guests} ${getWordForm(adData.offer.guests, GUESTS_WORD_FORMS)}`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${adData.offer.checkin}, выезд до ${adData.offer.checkout}`;
  popup.querySelector('.popup__description').textContent = adData.offer.description;
  const photosContainer = popup.querySelector('.popup__photos');
  const featuresContainer = popup.querySelector('.popup__features');
  getPhotos(photosContainer, adData.offer.photos);
  getFeatures(featuresContainer, adData.offer.features);

  return popup;
};

export {
  generatePopup
}
