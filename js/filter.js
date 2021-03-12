'use strict';
//import L from 'leaflet';
/* global _:readonly */

import {
  removeMarkers
} from './map.js';
import {
  addOtherPins
} from './map.js';

const INTERVAL = 500;

const mapFilters = document.querySelector('.map__filters');
const houseTypes = mapFilters.querySelector('#housing-type');
const housePrice = mapFilters.querySelector('#housing-price');
const roomNumbers = mapFilters.querySelector('#housing-rooms');
const guestNumbers = mapFilters.querySelector('#housing-guests');
const houseFeatures = mapFilters.querySelector('#housing-features');

console.log(houseTypes)

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


// Template filter
const filterTemplate = function (element, property, meaning) {
  if (property.value === 'any') {
    return true;
  }
  return element.offer[meaning].toString() === property.value;
};

//House filter
const filterHouse = function(element) {
  return filterTemplate(element, houseTypes, 'type');
};


//Price filter
const filterPrice = function(element) {
  const filteringPrice = priceFilter[housePrice.value.toUpperCase()];
  if (housePrice.value === 'any') {
    return true;
  }
  return element.offer.price >= filteringPrice.MIN && element.offer.price <= filteringPrice.MAX;
};

// ~ rooms
const filterRooms = function(element) {
  return filterTemplate(element, roomNumbers, 'rooms');
};
// ~guests
const filterGuests = function(element) {
  return filterTemplate(element, guestNumbers, 'guests');
};
// ~features!
const filterFeatures = function(element) {
  const checkedFeatures = houseFeatures.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every(function(item) {
    return element.offer.features.includes(item.value);
  });
};


// All filters go
const filterHouseTypes = function (houseElements) {
  mapFilters.addEventListener('change', _.debounce(() => {
    const sameType = houseElements
      .filter(filterHouse)
      .filter(filterPrice)
      .filter(filterRooms)
      .filter(filterGuests)
      .filter(filterFeatures);
    removeMarkers();
    addOtherPins(sameType);
  }, INTERVAL));
};


export {
  filterHouseTypes
};
