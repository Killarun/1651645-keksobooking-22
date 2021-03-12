'use strict';
//import L from 'leaflet';
/* global _:readonly */

import {removeMarkers} from './map.js';
import {addOtherPins} from './map.js';

const INTERVAL = 500;

const mapFilters = document.querySelector('.map__filters');
const houseTypes = mapFilters.querySelector('#housing-type');
const housePrice = mapFilters.querySelector('#housing-price');
const roomNumbers = mapFilters.querySelector('#housing-rooms');
const guestNumbers = mapFilters.querySelector('#housing-guests');
const adsFeatures = mapFilters.querySelector('#housing-features');

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


const filterTemplate = function(element, property, meaning){
  if (property.value === 'any') {
    return true;
  }
  return element.offer[meaning].toString() === property.value;
};

const filterHouseTypes = function(element) {
  return filterTemplate(element, houseTypes, 'type');
};

const filterHousePrice = function(element) {
  const filterPriceValue = priceFilter[housePrice.value.toUpperCase()];
  if(housePrice.value === 'any'){
    return true;
  }
  return element.offer.price >= filterPriceValue.MIN && element.offer.price <= filterPriceValue.MAX;
}

const filterHouseRooms = function(element) {
  return filterTemplate(element, roomNumbers, 'rooms');
}

const filterGuests = function(element) {
  return filterTemplate(element, guestNumbers, 'guests');
}

const filterAdsFeatures = function(element) {
  const checkedFeatures = adsFeatures.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every(function(item) {
    return element.offer.features.includes(item.value);
  });
};

const filterAds = (housingElements) => {
  mapFilters.addEventListener('change', _.debounce(() => {
    const sameTypeHousing = housingElements.filter(filterHouseTypes)
      .filter(filterHousePrice)
      .filter(filterHouseRooms)
      .filter(filterGuests)
      .filter(filterAdsFeatures);
    removeMarkers();
    addOtherPins(sameTypeHousing);
  }, INTERVAL));
};


export {filterAds};
