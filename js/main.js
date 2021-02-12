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

const DESCRIPTION = [
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

const OfferType = {
  'palace': 'Резиденция',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getShuffledArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

};



const getRandomLengthArray = (array) => {
  getShuffledArray(array.slice(0));
  let randomLengthArray = array.slice(getRandomInteger(0, array.length - 1));
  if (randomLengthArray.length === 0) {
    randomLengthArray = array.slice(getRandomInteger(0, array.length - 1));
  }
  return randomLengthArray;
};



const createOffer = () => {
  const location = {
    x: getRandomNumber(35.65000, 35.70000, 5),
    y: getRandomNumber(139.70000, 139.80000, 5),
  };

  const type = getRandomArrayElement(Object.keys(OfferType));
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(MIN_USER_COUNT, MAX_USER_COUNT)}.png`,
    },

    offer: {
      title: Object.values(OfferType[type]).join(''),
      address: `${location.x}, ${location.y}`,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: type,
      rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomLengthArray(FEATURES),
      description: DESCRIPTION.splice(getRandomInteger(0, DESCRIPTION.length - 1), 1)[0],
      photos: getRandomLengthArray(PHOTO_LINKS),

    },
    location: {
      x: location.x,
      y: location.y,
    },
  }
};



const similarOffer = new Array(SIMILAR_OFFER_COUNT).fill(null).map(createOffer);



const getSimilarOffer = () => similarOffer;

getSimilarOffer();
