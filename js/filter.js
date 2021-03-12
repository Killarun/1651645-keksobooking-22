'use strict';

import {removeMarkers} from './map.js';
import {addOtherPins} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const houseTypes = mapFilters.querySelector('#housing-type');

// Template filter
const filterTemplate = function(element){
  if (houseTypes.value === 'any') {
    return true;
  }
  return element.offer.type === houseTypes.value;
};

// House filter
const filterHouseTypes = function(houseElements){
  mapFilters.addEventListener('change', () => {
    const sameTypeHouse = houseElements.filter(filterTemplate);
    removeMarkers();
    addOtherPins(sameTypeHouse);
  });
};


export {filterHouseTypes};
