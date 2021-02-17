'use strict';

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (max <= min || min < 0) {
    return null;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomNumber = (min, max, range) => {
  if (max <= min || min < 0)  {
    return null;
  }
  return Number((Math.random() * (max - min) + min).toFixed(range));
};



const MIN_ROOMS = 1;
const MAX_ROOMS = 7;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_PRICE = 1000;
const MAX_PRICE = 999999;
const MIN_USER_COUNT = 1;
const MAX_USER_COUNT = 8;
const SIMILAR_OFFER_COUNT = 10;

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTO_LINKS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const TITLES = [
  'Квартира №1',
  'Квартира №2',
  'Квартира №3',
  'Квартира №4',
  'Квартира №5',
  'Квартира №6',
  'Квартира №7',
  'Квартира №8',
  'Квартира №9',
  'Квартира №10',
];

const DESCRIPTIONS = [
  'Уютная квартира с видом на море 1',
  'Уютная квартира с видом на море 2',
  'Уютная квартира с видом на море 3',
  'Уютная квартира с видом на море 4',
  'Уютная квартира с видом на море 5',
  'Уютная квартира с видом на море 6',
  'Уютная квартира с видом на море 7',
  'Уютная квартира с видом на море 8',
  'Уютная квартира с видом на море 9',
  'Уютная квартира с видом на море 10',
];

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const getRandomShuffleArrayElement = (elements) => {

  const clonedElements = elements.slice(0);
  for (let i = clonedElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = clonedElements[i];
    clonedElements[i] = clonedElements[j];
    clonedElements[j] = swap;
  }
  return clonedElements;
}

const getRandomArray = (elements) => getRandomShuffleArrayElement(elements).slice(getRandomInteger(0, elements.length - 1));

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];




const createOffer = () => {

  const X = getRandomNumber(35.65000, 35.70000, 5);
  const Y = getRandomNumber(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(MIN_USER_COUNT, MAX_USER_COUNT)}.png`,
    },

    offer: {
      title:getRandomArrayElement(TITLES),
      address: `${X}, ${Y}`,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayElement(PHOTO_LINKS),

    },
    location: {
      x: X,
      y: Y,
    },
  }
};



const getSimilarOffers = (quantity) => new Array(quantity).fill(null).map(createOffer);

getSimilarOffers(SIMILAR_OFFER_COUNT);
