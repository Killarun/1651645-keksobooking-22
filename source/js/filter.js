'use strict';

import _ from 'lodash';
//import L from 'leaflet';


import {
  removeMarkers, addOtherPins
} from './map.js';

const INTERVAL = 500;
const mapFilters = document.querySelector('.map__filters');
const houseTypes = mapFilters.querySelector('#housing-type');
const housePrice = mapFilters.querySelector('#housing-price');
const roomNumbers = mapFilters.querySelector('#housing-rooms');
const guestNumbers = mapFilters.querySelector('#housing-guests');
const houseFeatures = mapFilters.querySelector('#housing-features');

const priceFilter = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
    MAX: Infinity,
  },
};

const filterTemplate = function (element, property, meaning) {
  if (property.value === 'any') {
    return true;
  }
  return element.offer[meaning].toString() === property.value;
};

const filterItemsHouse = function (element) {
  return filterTemplate(element, houseTypes, 'type') && filterTemplate(element, roomNumbers, 'rooms') && filterTemplate(element, guestNumbers, 'guests');
};

const filterPrice = function (element) {
  const filteringPrice = priceFilter[housePrice.value.toUpperCase()];
  if (housePrice.value === 'any') {
    return true;
  }
  return element.offer.price >= filteringPrice.MIN && element.offer.price <= filteringPrice.MAX;
};

const filterFeatures = function (element) {
  const checkedFeatures = houseFeatures.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every(function(item) {
    return element.offer.features.includes(item.value);
  });
};

const filterHouseTypes = function (houseElements) {
  mapFilters.addEventListener('change', _.debounce(() => {
    const sameType = houseElements
      .filter(filterItemsHouse)
      .filter(filterPrice)
      .filter(filterFeatures);
    removeMarkers();
    addOtherPins(sameType);
  }, INTERVAL));
};

export {
  filterHouseTypes
};
