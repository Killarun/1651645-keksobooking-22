import {getSimilarOffers} from './data.js';
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('article');
const fragment = document.createDocumentFragment();
const quantityCardsFixed = 10;
const simiralAds = getSimilarOffers(quantityCardsFixed);
const mapCanvas = document.querySelector('.map__canvas');

const getTypePalace = (typeHousing) => {
  switch (typeHousing) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    default:
      return '';
  }
};

for (let i = 0; i < 10; i++) {
  const elementArds = template.cloneNode(true);
  elementArds.classList.add('popup');
  elementArds.querySelector('.popup__title').textContent = simiralAds[i].offer.title;
  elementArds.querySelector('.popup__text--address').textContent = simiralAds[i].offer.address;
  elementArds.querySelector('.popup__text--price').textContent = simiralAds[i].offer.price + ' ₽/ночь';
  elementArds.querySelector('.popup__type').textContent = getTypePalace(simiralAds[i].offer.type);
  elementArds.querySelector('.popup__text--capacity').textContent = simiralAds[i].offer.rooms + ' комнаты для ' + simiralAds[i].offer.guests + ' гостей';
  elementArds.querySelector('.popup__text--time').textContent = 'Заезд после ' + simiralAds[i].offer.checkin + ', выезд до ' + simiralAds[i].offer.checkout;
  elementArds.querySelector('.popup__features').textContent = simiralAds[i].offer.features;
  elementArds.querySelector('.popup__description').textContent = simiralAds[i].offer.description;
  elementArds.querySelector('.popup__photo').src = simiralAds[i].author.avatar;

  fragment.appendChild(elementArds);
}

mapCanvas.appendChild(fragment.firstElementChild);
